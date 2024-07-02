import React from "react";
import styled from "styled-components";
import ChatListItem from "./ChatListItem";

const ListContainer = styled.div`
  width: 230px;
  border-right: 1px solid #dbdbdb;
  overflow-y: auto;
  
  @media (max-width: 899px) {
    position: relative;
    width: max-content;
    align-items: center;
  }
`;

const ChatList = ({ chats, selectChat }) => {
  return (
    <ListContainer>
      {chats.map((chat) => (
        <ChatListItem key={chat.id} chat={chat} selectChat={selectChat} />
      ))}
    </ListContainer>
  );
};

export default ChatList;
