import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

// 메시지 컨테이너 스타일 정의
const MessageContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
   flex-direction: column;
`;

// 메시지 아이템 스타일 정의
const MessageItem = styled.div`
  background-color: #efefef;
  margin: 5px 0;
  padding: 10px;
  border-radius: 10px;
  align-self: ${props => (props.$isUser ? 'flex-end' : 'flex-start')};
  background-color: ${props => (props.$isUser ? '#dcf8c6' : '#fff')};
  border: 1px solid #dbdbdb;
`;

// 메시지 리스트 컴포넌트
const MessageList = ({ messages = [] }) => {
  const messagesEndRef = useRef(null);
  // messages 배열이 업데이트 될 때마다 스크롤을 최하단으로 이동
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <MessageContainer>
      {messages.map((message, index) => (
        <MessageItem key={index} $isUser={message.send}>
          {message.text}
        </MessageItem>
      ))}
      <div ref={messagesEndRef} />
    </MessageContainer>
  );
};

export default MessageList;
