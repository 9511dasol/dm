import React from 'react';
import styled from 'styled-components';
import ChatListItem from './ChatListItem';

const ListContainer = styled.div`
  width: 250px;
  border-right: 1px solid #dbdbdb;
  overflow-y: auto;
`;

const ChatList = ({ chats, selectChat }) => {
  return (
    <ListContainer>
      {chats.map(chat => (
        <ChatListItem key={chat.id} chat={chat} selectChat={selectChat} />
      ))}
    </ListContainer>
  );
};

export default ChatList;
