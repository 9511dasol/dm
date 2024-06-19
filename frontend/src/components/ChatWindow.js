import React from 'react';
import styled from 'styled-components';
import MessageList from './MessageList';

const WindowContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
`;

const ChatWindow = ({ messages, tf }) => {
  return (
    <WindowContainer>
      <MessageList messages={messages} tf={tf} />
    </WindowContainer>
  );
};

export default ChatWindow;