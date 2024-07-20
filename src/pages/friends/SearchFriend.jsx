import React from "react";
import SearchHeader from "../../components/layout/SearchHeader";
import styled from "styled-components";
import homeback from "../../assets/homeback.png";
import DeleteModal from "../../components/common/DeleteModal";

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
  return (
    <HomeWrapper className="All">
      {/* <DeleteModal ModalText={"친구를 정말 삭제할까요?"} /> */}
      <SearchHeader inputPH={"친구의 카카오 이메일 입력"} />

      <SearchedPerson>
        <PersonImg src={homeback} />
        <PersonName>adsf</PersonName>
        <AddBtn>추가하기</AddBtn>
      </SearchedPerson>
    </HomeWrapper>
  );
};

export default SearchFriend;
