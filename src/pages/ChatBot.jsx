import React, { useState } from "react";
import styled from "styled-components";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";

const HomeWrapper = styled.div`
  height: 100vh;
  overflow: hidden;
  position: relative;
  padding: 20px;
  box-sizing: border-box;
`;

const Head = styled.div`
  padding: 20px;
  padding-left: 0px;
  padding-right: 0px;
  display: flex;
  align-items: center;
  padding-top: 20px;
  margin-top: -20px;
  position: sticky;
  background-color: #ebeef1;
  gap: 3px;
`;

const Text = styled.span`
  color: #1c1e1f;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
`;

const HeroWrap = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
  box-sizing: border-box;
  padding: 12px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow-y: auto;
`;

const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ChatMessage = styled.div`
  max-width: 60%;
  padding: 10px;
  border-radius: 10px;
  font-size: 14px;
  line-height: 1.4;
`;

const ChatBotMessage = styled(ChatMessage)`
  background-color: #e0e0e0;
  align-self: flex-start;
`;

const UserMessage = styled(ChatMessage)`
  background-color: #4caf50;
  color: white;
  align-self: flex-end;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f1f1f1;
  border-top: 1px solid #e0e0e0;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
  font-size: 14px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  color: white;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const ChatBotComponent = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, user: true }]);
      setInputValue("");
      // Simulate bot response
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "This is a response from the bot.", user: false },
        ]);
      }, 1000);
    }
  };

  return (
    <HomeWrapper className="All">
      <Head>
        <Link style={{ height: "24px", display: "flex", alignItems: "center" }}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            style={{ color: "#1c1e1f", paddingRight: "15px" }}
            onClick={() => {
              navigate(-1);
            }}
          />
        </Link>
        <Text>ChatBot</Text>
      </Head>

      <HeroWrap>
        <ChatBox>
          {messages.map((message, index) =>
            message.user ? (
              <UserMessage key={index}>{message.text}</UserMessage>
            ) : (
              <ChatBotMessage key={index}>{message.text}</ChatBotMessage>
            )
          )}
        </ChatBox>
      </HeroWrap>

      <InputWrapper>
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
        />
        <Button onClick={handleSend}>Send</Button>
      </InputWrapper>
    </HomeWrapper>
  );
};

export default ChatBotComponent;
