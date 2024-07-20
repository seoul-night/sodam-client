import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import vector from "../../assets/sodam/ic/Vector.png";
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

const PlacesUl = styled.ul``;

const PlacesLi = styled.li`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f6f8fa;
  color: #1c1e1f;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 12px 16px;
  cursor: pointer;
`;

const PlaceName = styled.h1`
  font-size: 16px;
`;

const PlaceLocation = styled.span`
  font-size: 12px;
  color: #91919c;
`;

const DeletePlaces = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <HomeWrapper className="All">
      {isModalOpen && (
        <DeleteModal
          ModalText={"친구를 정말 삭제할까요?"}
          navigateTo={"/savedPlaces"}
          onClose={closeModal}
        />
      )}
      <Header></Header>
      <Wrapper>
        <div>
          <BlackText style={{ display: "inline" }}>장소 목록</BlackText>
          <GreenText>n</GreenText>
        </div>
      </Wrapper>
      <PlacesUl>
        <PlacesLi>
          <div>
            <PlaceName>부모님 집</PlaceName>
            <PlaceLocation>경기도 부천시 ~~</PlaceLocation>
          </div>

          <img
            src={vector}
            style={{ width: "24px", height: "24px" }}
            onClick={() => {
              setIsModalOpen(true);
            }}
          />
        </PlacesLi>
      </PlacesUl>
    </HomeWrapper>
  );
};

export default DeletePlaces;
