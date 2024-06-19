import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ChatWindow from './components//ChatWindow';
import MessageInput from './components/MessageInput';
import ChatList from './components/ChatList';
import axios from "axios";
const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fafafa;
`;

const AppBox = styled.div`
  width: 900px;
  height: 600px;
  border: 1px solid #dbdbdb;
  border-radius: 10px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
`;

const ChatSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
`;

const BackButton = styled.button`
  align-self: flex-start;
  margin-top: 10px;
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
`;
// function a(myId) {

//   axios
//     .get("http://127.0.0.1:8000", {
//       params: {
//         select: 1,
//         myid: myId,
//       },
//     })
//     .then((response) => {
//       return response.data;
//     }).catch(error => {
//       console.error('Error fetching chats:', error);
//     });
// }
const App = () => {
  // 로그인 하면 myid 받기
  const currentUserid = 6
  // setCurrentUserId(6);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    fetchChats();  // 컴포넌트가 처음 마운트될 때 채팅 목록을 가져오는 함수 호출
  }, [currentUserid]);  // currentUserid가 변경될 때마다 useEffect 호출

  const fetchChats = () => {
    axios.get('http://127.0.0.1:8000/', {
      params: {
        curId: currentUserid,
        select: 1,
      }
    }).then(response => {
      const sortedChats = response.data.sort((a, b) => new Date(b.createdat) - new Date(a.createdat));
      setChats(sortedChats);
    }).catch(error => {
      console.error('Error fetching chats:', error);
    });
  };
  // const [chats, setChats] = useState([
  //   { id: 1, name: 'John Doe', messages: [], "createdat":createdat },
  //   { id: 2, name: 'Jane Smith', messages: [], "createdat":createdat },
  //   { id: 3, name: 'John', messages: [], "createdat":createdat },
  //   { id: 4, name: 'Minji', messages: [], "createdat":createdat },
  // ]);



  const [selectedChatId, setSelectedChatId] = useState(null);

  // const addMessage = (message) => {
  //   setChats(chats.map(chat => {
  //     if (chat.id === selectedChatId) {
  //       return { ...chat, messages: [...chat.messages, message] };
  //     }
  //     return chat;
  //   }));
  // };

  const addMessage = (message) => {
    // 메시지를 보내는 함수 (예: handleSend 함수 내부와 동일)
    axios.get("http://127.0.0.1:8000", {
      params: {
        select: 2,
        dm: message.text,
        me: currentUserid,
        you: selectedChatId,
      },
    }).then((response) => {
      // 메시지 전송 후 채팅 목록을 다시 가져옴
      fetchChats();
    }).catch(error => {
      console.error('Error sending message:', error);
    });
  };

  const selectChat = (id) => { //  'id': partner_id,
    setSelectedChatId(id);
  };

  const handleBackButtonClick = () => {
    setSelectedChatId(null); // 선택된 채팅 초기화
  };

  const selectedChat = chats.find(chat => chat.id === selectedChatId);

  return (
    <AppContainer>
      <BackButton onClick={handleBackButtonClick}>←</BackButton>
      <AppBox>
        <ChatList chats={chats} selectChat={selectChat} />
        <ChatSection>
          {selectedChat && (
            <>
              <ChatWindow messages={selectedChat.messages} />
              <MessageInput addMessage={addMessage}
                curUserid={currentUserid}
                receiv_id={selectedChatId} />
            </>
          )}
        </ChatSection>
      </AppBox>
    </AppContainer>
  );
};

export default App;
