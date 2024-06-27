import React, { useEffect, useState } from 'react';
import axios from "axios";
import styled from 'styled-components';
import MessageList from './MessageList';

const WindowContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
`;

const ChatWindow = ({messages, selectedChatId}) => {
  const [chats, setChats] = useState(messages);

  useEffect(() => {
    const chatSocket = new WebSocket(`ws://${window.location.host}/ws/chat/${selectedChatId}/`);

    chatSocket.onmessage = function (e) {
      const data = JSON.parse(e.data);
      const { sender, receiver, message } = data;

      // 새로운 메시지를 상태에 추가
      const newMessage = {
        text: message.text,
        send: false,
        sent_at: message.timestamp,
      };
      setChats(prevMessages => [...prevMessages, newMessage]);

      // 메시지를 수신하면 해당 메시지를 서버에 저장하고, 채팅 목록을 다시 가져오는 예시
      axios.get("http://127.0.0.1:8000/dm.do", {
        params: {
          select: 3,
          dm: message.text,
          me: receiver,
          you: sender,
        },
      }).then((response) => {
        console.log('Message saved successfully:', response.data);
        // 필요하다면 추가적인 로직 수행
      }).catch(error => {
        console.error('Error saving message:', error);
      });
    };

    // 컴포넌트 언마운트 시 소켓 연결 해제
    return () => {
      chatSocket.close();
    };
  }, []);

  return (
    <WindowContainer>
      <MessageList messages={messages} />
    </WindowContainer>
  );
};

export default ChatWindow;
