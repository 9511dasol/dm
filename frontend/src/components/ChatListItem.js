import styled from 'styled-components';
import React from 'react';

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

// const Readed = styled.div`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   background-color: #bbb;
//   margin-right: 10px;
// `;

const ChatListItem = ({ chat, selectChat }) => {
  return (
    <a>
      <ListItem onClick={() => selectChat(chat.id)}>
        <Avatar />
        {chat.name}
        {/* <Readed/> */}
      </ListItem>
    </a>

  );
};

export default ChatListItem;
