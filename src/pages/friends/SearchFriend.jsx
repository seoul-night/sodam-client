import React, { useEffect, useState } from "react";
import SearchHeader from "../../components/layout/SearchHeader";
import styled from "styled-components";
import homeback from "../../assets/homeback.png";
import { useNavigate } from "react-router-dom";
import { addFriend, findFriend } from "../../services/friendsApi";
import { useRecoilValue } from "recoil";
import { userIdState } from "../../atoms";

const HomeWrapper = styled.div`
  min-height: 100vh;
  background-color: #ffffff;
  overflow: auto;
  position: relative;
  padding: 20px;
  box-sizing: border-box;
`;

const SearchedPerson = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 250px;
  gap: 10px;
`;

const PersonImg = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const PersonName = styled.h4`
  font-size: 16px;
`;

const AddBtn = styled.button`
  width: 116px;
  height: 44px;
  border: none;
  background-color: #27c384;
  border-radius: 10px;
  color: #f6f8fa;
  font-size: 18px;
  cursor: pointer;
`;

const SearchFriend = () => {
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState("");
  const [response, setResponse] = useState(null);
  const userId = useRecoilValue(userIdState);

  const handleInputChange = (event) => {
    setTypedText(event.target.value);
    console.log(typedText);
  };

  const handleClick = async () => {
    addFriend(userId, response.familyId);
    navigate("/friends");
  };

  useEffect(() => {
    if (response) {
      console.log("Fetched friend data:", response);
    }
  }, [response]);

  const handleFormSubmit = async () => {
    try {
      const result = await findFriend(typedText);
      setResponse(result);
    } catch (error) {
      console.error("Error fetching friend data:", error);
    }
  };

  return (
    <HomeWrapper className="All">
      <SearchHeader
        inputPH={"친구의 카카오 이메일 입력"}
        handleInputChange={handleInputChange}
        handleFormSubmit={handleFormSubmit}
      />

      {response && (
        <SearchedPerson>
          <PersonImg src={response.profile} />
          <PersonName>{response.nickName}</PersonName>
          <AddBtn
            onClick={() => {
              addFriend(userId, response.userId);
              navigate("/friends");
            }}
          >
            추가하기
          </AddBtn>
        </SearchedPerson>
      )}
    </HomeWrapper>
  );
};

export default SearchFriend;
