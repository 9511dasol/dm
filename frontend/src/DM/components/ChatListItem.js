import styled from "styled-components";
import React from "react";

const ListItem = styled.div`
  padding: 15px;
  border-bottom: 1px solid #dbdbdb;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  &:hover {
    background-color: #f0f0f0;
  }
`;

// @media (max-width: 600px) {
//   background-color: lightblue;
// }
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

const Info = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1px
  align-items: center;
@media (max-width: 899px) {
  span{
  display:none;
  }
}
`;

const ChatListItem = ({ chat, selectChat }) => {
  return (
      <ListItem onClick={() => selectChat(chat.id)}>
        <Avatar />
        <Info>
          <span>{chat.name}</span>
          <span>Last Messages ㅇ 5d</span>
        </Info>
      </ListItem>
  );
};

export default ChatListItem;
