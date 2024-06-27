import styled from "styled-components";
import React from "react";

const ListItem = styled.div`
  padding: 15px;
  border-bottom: 1px solid #dbdbdb;
  display: flex;

  align-items: center;

  &:hover {
    background-color: #f0f0f0;
  }


`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #bbb;
  margin-right: 10px;
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1px;
  @media (max-width: 899px) {
    display: none;
  }
`;
const ChatListItem = ({ chat, selectChat }) => {
  return (
    <ListItem onClick={() => selectChat(chat.id)}>
      <Avatar />
      <Box>
        <span>{chat.name}</span>
        <span>Last Message ㅇ 3d</span>
      </Box>
    </ListItem>
  );
};

export default ChatListItem;
