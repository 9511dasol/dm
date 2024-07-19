import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ChatWindow from "./components//ChatWindow";
import MessageInput from "./components/MessageInput";
import ChatList from "./components/ChatList";
import axios from "axios";

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fafafa;
`;

const AppBox = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid #dbdbdb;
  border-radius: 10px;
  background-color: black;
  display: flex;
  flex-direction: row;
`;

const ChatSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
`;

const DirectMessages = () => {
  const currentUserid = 6;
  // const [chats, setChats] = useState([]);
  const [chats, setChats] = useState([
    { id: 1, name: 'John Doe', messages: [] },
    { id: 2, name: 'Jane Smith', messages: [] },
    { id: 3, name: 'John', messages: [] },
    { id: 4, name: 'Minji', messages: [] },
  ]);
  const [selectedChatId, setSelectedChatId] = useState(null);

  useEffect(() => {
    fetchChats(); // 컴포넌트가 처음 마운트될 때 채팅 목록을 가져오는 함수 호출
  }, [currentUserid]); // currentUserid가 변경될 때마다 useEffect 호출

  // useEffect(() => {
  //   const chatSocket = new WebSocket(
  //     `ws://${window.location.host}/ws/chat/${selectedChatId}/`
  //   );

  //   chatSocket.onmessage = function (e) {
  //     const data = JSON.parse(e.data);
  //     const { sender, receiver, message } = data;

  //     // 새로운 메시지를 상태에 추가
  //     const newMessage = {
  //       text: message.text,
  //       send: false,
  //       sent_at: message.timestamp,
  //     };
  //     setChats((prevMessages) => [...prevMessages, newMessage]);

  //     // 메시지를 수신하면 해당 메시지를 서버에 저장하고, 채팅 목록을 다시 가져오는 예시
  //     axios
  //       .get("http://127.0.0.1:8000/dm.do", {
  //         params: {
  //           select: 3,
  //           dm: message.text,
  //           me: receiver,
  //           you: sender,
  //         },
  //       })
  //       .then((response) => {
  //         console.log("Message saved successfully:", response.data);
  //         fetchChats();
  //         // 필요하다면 추가적인 로직 수행
  //       })
  //       .catch((error) => {
  //         console.error("Error saving message:", error);
  //       });
  //   };
  //   // 컴포넌트 언마운트 시 소켓 연결 해제
  //   return () => {
  //     chatSocket.close();
  //   };
  // }, []);

  const fetchChats = () => {
    axios
      .get("http://127.0.0.1:8000/dm.do", {
        params: {
          curId: currentUserid,
          select: 1,
        },
      })
      .then((response) => {
        const sortedChats = response.data.sort(
          (a, b) => new Date(b.createdat) - new Date(a.createdat)
        );
        setChats(sortedChats);
      })
      .catch((error) => {
        console.error("Error fetching chats:", error);
      });
  };

  const sendMessage = (message) => {
    // 메시지를 보내는 함수 (예: handleSend 함수 내부와 동일)
    axios
      .get("http://127.0.0.1:8000/dm.do", {
        params: {
          select: 2,
          dm: message.text,
          me: currentUserid,
          you: selectedChatId,
        },
      })
      .then((response) => {
        // 메시지 전송 후 채팅 목록을 다시 가져옴
        fetchChats();
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  // const receiveMessage = () => {
  //   const chatSocket = new WebSocket(`ws://${window.location.host}/ws/chat/${selectedChatId}/`);

  //   chatSocket.onmessage = function (e) {
  //     const data = JSON.parse(e.data);
  //     // 받은 메시지 처리 로직 (예시: 채팅 목록을 다시 가져오는 것처럼)
  //     const { sender, receiver, message } = data;
  //     axios.get("http://127.0.0.1:8000/dm.do", {
  //       params: {
  //         select: 3,
  //         dm: message.text,
  //         me: receiver,
  //         you: sender,
  //       },
  //     }).then((response) => {
  //       // 메시지 전송 후 채팅 목록을 다시 가져옴
  //       fetchChats();
  //     }).catch(error => {
  //       console.error('Error sending message:', error);
  //     });
  //   };

  //   chatSocket.onclose = function (e) {
  //     console.error('Chat socket closed unexpectedly');
  //   };

  //   return () => {
  //     chatSocket.close();
  //   };

  // };

  const selectChat = (id) => {
    //  'id': partner_id,
    setSelectedChatId(id);
  };

  const selectedChat = chats.find((chat) => chat.id === selectedChatId);

  return (
    <AppContainer>
      <AppBox>
        <ChatList chats={chats} selectChat={selectChat} />
        <ChatSection>
          {selectedChat && (
            <>
              <ChatWindow
                messages={selectedChat.messages}
                selectedChatId={selectedChatId}
              />
              <MessageInput
                sendMessage={sendMessage}
                curUserid={currentUserid}
                receiv_id={selectedChatId}
              />
            </>
          )}
        </ChatSection>
      </AppBox>
    </AppContainer>
  );
};

export default DirectMessages;
