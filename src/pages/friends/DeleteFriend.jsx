import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import homeback from "../../assets/homeback.png";
import Header from "../../components/Header";
import vector from "../../assets/sodam/ic/Vector.png";
import CloseModal from "../../components/CloseModal";
import DeleteModal from "../../components/common/DeleteModal";

const HomeWrapper = styled.div`
  height: 100vh;
  background-color: #ffffff;
  overflow: hidden;
  position: relative;
  padding: 20px;
  box-sizing: border-box;
`;

const BlackText = styled.h1`
  font-size: 16px;
  line-height: 150%;
  margin-bottom: 10px;
`;

const GreenText = styled(BlackText)`
  color: #27c384;
  margin-left: 4px;
  display: inline;
`;

const GrayText = styled(BlackText)`
  color: #91919c;
  font-weight: 400;
  display: inline;
  cursor: pointer;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const FriendsUl = styled.ul``;

const FreindsLi = styled.li`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f6f8fa;
  color: #1c1e1f;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 12px 16px;
  cursor: pointer;
`;

const FriendInfo = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    margin-right: 8px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
`;

const DeleteFriend = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <HomeWrapper className="All">
      {isModalOpen && (
        <DeleteModal
          modalFn={""}
          ModalText={"친구를 정말 삭제할까요?"}
          navigateTo={"/friends"}
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
      <Header></Header>
      <Wrapper>
        <div>
          <BlackText style={{ display: "inline" }}>친구 목록</BlackText>
          <GreenText>n</GreenText>
        </div>
        <GrayText onClick={() => navigate("/deleteFriend")}>편집</GrayText>
      </Wrapper>
      <FriendsUl>
        <FreindsLi>
          <FriendInfo>
            <img src={homeback} />
            김옥순
          </FriendInfo>
          <img
            src={vector}
            style={{ width: "24px", height: "24px" }}
            onClick={() => {
              setIsModalOpen(true);
            }}
          />
        </FreindsLi>
      </FriendsUl>
    </HomeWrapper>
  );
};

export default DeleteFriend;
