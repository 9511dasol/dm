import React, { useState } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  padding: 10px;
  border-top: 1px solid #dbdbdb;
  display: flex;
`;

const TextInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #dbdbdb;
  border-radius: 20px;
  outline: none;
`;

const SendButton = styled.button`
  padding: 10px 20px;
  margin-left: 10px;
  background-color: #0095f6;
  border: none;
  border-radius: 20px;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #007bb5;
  }
`;

const MessageInput = ({ sendMessage, curUserid, receiv_id }) => {
  const [inputValue, setInputValue] = useState('');
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      sendMessage({ text: inputValue, send: true });

      // axios.get("http://127.0.0.1:8000", {
      //   params: {
      //     select: 2,
      //     dm: inputValue,
      //     me: curUserid,
      //     you: receiv_id,
      //   },
      // })
      // .then((response) => {
      //   setInputValue('');
      // });

      setInputValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <InputContainer>
      <TextInput
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="메시지를 입력하세요..."
      />
      <SendButton onClick={handleSend}>보내기</SendButton>
    </InputContainer>
  );
};

export default MessageInput;
