import React, { useState } from 'react';
import styled from 'styled-components';
import ChatWindow from './ChatWindow';
import MessageInput from './MessageInput';
import ChatList from './ChatList';

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

const App = () => {
  const [chats, setChats] = useState([
    { id: 1, name: 'John Doe', messages: [] },
    { id: 2, name: 'Jane Smith', messages: [] },
    { id: 3, name: 'John', messages: [] },
    { id: 4, name: 'Minji', messages: [] },
  ]);
  const [selectedChatId, setSelectedChatId] = useState(null);

  const addMessage = (message) => {
    setChats(chats.map(chat => {
      if (chat.id === selectedChatId) {
        return { ...chat, messages: [...chat.messages, message] };
      }
      return chat;
    }));
  };

  const selectChat = (id) => {
    setSelectedChatId(id);
  };

  const selectedChat = chats.find(chat => chat.id === selectedChatId);

  return (
    <AppContainer>
      <AppBox>
        <ChatList chats={chats} selectChat={selectChat} />
        <ChatSection>
          {selectedChat && (
            <>
              <ChatWindow messages={selectedChat.messages} />
              <MessageInput addMessage={addMessage} />
            </>
          )}
        </ChatSection>
      </AppBox>
    </AppContainer>
  );
};

export default App;
