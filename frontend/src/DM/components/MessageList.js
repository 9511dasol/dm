import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { Avatar } from "@mui/material";

// 메시지 컨테이너 스타일 정의
const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

// 메시지 아이템 스타일 정의
const MessageItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 5px 0;
  ${(props) => props.$isUser && 'flex-direction: row-reverse;'}

  .message-content {
    background-color: #efefef;
    padding: 10px;
    margin-left:3px;
    border-radius: 10px;
    background: ${(props) =>
      props.$isUser
        ? 'linear-gradient(180deg, rgba(139, 47, 184, 1) 0%, rgba(103, 88, 205, 1) 51%, rgba(89, 116, 219, 1) 92% )'
        : '#262626'};
    border: 1px solid #dbdbdb;
    max-width: 80%;
  }
  }
`;
// 메시지 리스트 컴포넌트
const MessageList = ({ messages = [] }) => {
  const messagesEndRef = useRef(null);
  // messages 배열이 업데이트 될 때마다 스크롤을 최하단으로 이동
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <MessageContainer>
      {messages.map((message, index) => (
        <MessageItem key={index} $isUser={message.send}>
          {!message.send && (
            <Avatar>{message.name.charAt(1).toUpperCase()}</Avatar>
          )}
          <div className="message-content">{message.text}</div>
        </MessageItem>
      ))}
            
            <div ref={messagesEndRef} />
    </MessageContainer>
  );
};

export default MessageList;
