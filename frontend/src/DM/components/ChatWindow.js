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

  

  return (
    <WindowContainer>
      <MessageList messages={messages} />
    </WindowContainer>
  );
};

export default ChatWindow;
