import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Timeline from "./timeline/Timeline"; // 새롭게 추가할 컴포넌트
import DirectMessages from "./DM/DirectMessages"
import "./App.css";

// import { BrowserRouter, Routes, Route } from 'react-router-dom';
const App = () => {
  // 로그인 하면 myid 받기
  const currentUserid = 6
  // setCurrentUserId(6);
  // const [chats, setChats] = useState([]);

  // useEffect(() => {
  //   fetchChats();  // 컴포넌트가 처음 마운트될 때 채팅 목록을 가져오는 함수 호출
  // }, [currentUserid]);  // currentUserid가 변경될 때마다 useEffect 호출

  useEffect(() => {
    const chatSocket = new WebSocket(`ws://${window.location.host}/ws/chat/${selectedChatId}/`);

    chatSocket.onmessage = function (e) {
      const data = JSON.parse(e.data);
      const { sender, receiver, message } = data;

      // 새로운 메시지를 상태에 추가
      const newMessage = {
        text: message.text,
        send: false,
        sent_at: message.timestamp,
      };
      setChats(prevMessages => [...prevMessages, newMessage]);

      // 메시지를 수신하면 해당 메시지를 서버에 저장하고, 채팅 목록을 다시 가져오는 예시
      axios.get("http://127.0.0.1:8000/dm.do", {
        params: {
          select: 3,
          dm: message.text,
          me: receiver,
          you: sender,
        },
      }).then((response) => {
        console.log('Message saved successfully:', response.data);
        fetchChats(); 
        // 필요하다면 추가적인 로직 수행
      }).catch(error => {
        console.error('Error saving message:', error);
      });
    };

    // 컴포넌트 언마운트 시 소켓 연결 해제
    return () => {
      chatSocket.close();
    };
  }, []);


  // const addMessage = (message) => {
  //   setChats(chats.map(chat => {
  //     if (chat.id === selectedChatId) {
  //       return { ...chat, messages: [...chat.messages, message] };
  //     }
  //     return chat;
  //   }));
  // };

  const fetchChats = () => {
    axios.get('http://127.0.0.1:8000/dm.do', {
      params: {
        curId: currentUserid,
        select: 1,
      }
    }).then(response => {
      const sortedChats = response.data.sort((a, b) => new Date(b.createdat) - new Date(a.createdat));
      setChats(sortedChats);
    }).catch(error => {
      console.error('Error fetching chats:', error);
    });
  };
  const [chats, setChats] = useState([
    { id: 1, name: 'John Doe', messages: []},
    { id: 2, name: 'Jane Smith', messages: []},
    { id: 3, name: 'John', messages: []},
    { id: 4, name: 'Minji', messages: [] },
  ]);



  const [selectedChatId, setSelectedChatId] = useState(null);

  const addMessage = (message) => {
    setChats(chats.map(chat => {
      if (chat.id === selectedChatId) {
        return { ...chat, messages: [...chat.messages, message] };
      }
      return chat;
    }));
  };

  // const addMessage = (message) => {
  //   // 메시지를 보내는 함수 (예: handleSend 함수 내부와 동일)
  //   axios.get("http://127.0.0.1:8000", {
  //     params: {
  //       select: 2,
  //       dm: message.text,
  //       me: currentUserid,
  //       you: selectedChatId,
  //     },
  //   }).then((response) => {
  //     // 메시지 전송 후 채팅 목록을 다시 가져옴
  //     fetchChats();
  //   }).catch(error => {
  //     console.error('Error sending message:', error);
  //   });
  // };

  const selectChat = (id) => { //  'id': partner_id,
    setSelectedChatId(id);
  };



  const selectedChat = chats.find(chat => chat.id === selectedChatId);

  return (
    <AppContainer>
      <AppBox>
        <ChatList chats={chats} selectChat={selectChat} />
        <ChatSection>
          {selectedChat && (
            <>
              <ChatWindow messages={selectedChat.messages} selectedChatId={selectedChatId} />
              <MessageInput sendMessage={addMessage}
                curUserid={currentUserid}
                receiv_id={selectedChatId} />
            </>
          )}
        </ChatSection>
      </AppBox>
    </AppContainer>
  );
};

export default App;
