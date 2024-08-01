import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import send from "../assets/sodam/ic/send.png";
import chatIcon from "../assets/sodam/ic/chatIcon.png";
import { getReply } from "../services/chatbotAPI";
import { useRecoilValue } from "recoil";
import { userIdState } from "../atoms";
import { fetchAndPlaySpeech } from "../services/chatbotAPI";

const HomeWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  position: relative;
  background-color: #ebeef1;
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  background-color: #ebeef1;
  padding: 20px;
  padding-bottom: 0px;
`;

const Text = styled.span`
  color: #1c1e1f;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
`;

const HeroWrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: auto;
  padding: 20px 0;
`;

const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0px 20px;
`;

const ChatMessage = styled.div`
  max-width: 60%;
  padding: 10px;
  border-radius: 10px;
  font-size: 14px;
  line-height: 1.4;
`;

const ChatBotMessage = styled(ChatMessage)`
  background-color: #ffffff;
  align-self: flex-start;
`;

const UserMessage = styled(ChatMessage)`
  background-color: #27c384;
  color: white;
  align-self: flex-end;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #ffffff;
  border-top: 1px solid #e0e0e0;
  width: 100%;
  position: sticky;
  bottom: 0;
  left: 0;
  padding-left: 20px;
  box-sizing: border-box;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
  font-size: 14px;
  background-color: #ebeef1;
`;

const Button = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background: url(${send}) no-repeat center center;
  background-size: contain;
  cursor: pointer;
`;

const ChatBotComponent = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const chatBoxRef = useRef(null);
  const userId = useRecoilValue(userIdState);

  useEffect(() => {
    setMessages([{ text: "AI 영웅이와 대화를 시작해 보세요", user: false }]);
  }, []);

  useEffect(() => {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (inputValue.trim()) {
      const newMessages = [...messages, { text: inputValue, user: true }];
      setMessages(newMessages);
      setInputValue("");

      const reply = await getReply(userId, inputValue);
      fetchAndPlaySpeech(reply.chat);
      const botMessage =
        reply && reply.chat
          ? reply.chat
          : "챗봇 서비스에 문제가 발생했습니다. 나중에 다시 시도해주세요.";

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botMessage, user: false },
      ]);
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
        <Text>AI 영웅이</Text>
      </Head>

      <HeroWrap ref={chatBoxRef}>
        <ChatBox>
          {messages.map((message, index) =>
            message.user ? (
              <UserMessage key={index}>{message.text}</UserMessage>
            ) : (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={chatIcon}
                  style={{ width: "32px", marginRight: "6px" }}
                />
                <ChatBotMessage>{message.text}</ChatBotMessage>
              </div>
            )
          )}
        </ChatBox>
      </HeroWrap>

      <InputWrapper>
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="메시지를 입력해주세요."
        />
        <Button onClick={handleSend} />
      </InputWrapper>
    </HomeWrapper>
  );
};

export default ChatBotComponent;
