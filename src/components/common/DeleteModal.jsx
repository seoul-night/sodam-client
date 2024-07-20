import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const CloseModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 4;
  background: rgba(0, 0, 0, 0.6); // Optional: background shading
`;

const CloseWrap = styled.div`
  position: fixed;
  top: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 280px;
  height: 129px;
  background-color: #ffffff;
  padding: 24px 20px 16px 20px;
  border-radius: 16px;
  justify-content: space-around;
  top: 50%; /* 중앙 정렬을 위해 50% */
  left: 50%; /* 중앙 정렬을 위해 50% */
  transform: translate(-50%, -50%); /* 중앙 정확히 배치 */
`;

const ModalBtn = styled.button`
  color: #f6f8fa;
  font-size: 14px;
  padding: 12px 24px 12px 24px;
  border-radius: 8px;
  width: 50%;
  border: none;
  cursor: pointer;
`;

const BtnWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 8px;
`;
const Text = styled.h4`
  color: #f6f8fa;
  font-size: 20px;
  line-height: 32px;
  /* margin-bottom: 5px; */
`;

const DeleteModal = ({ onClose, ModalText, modalFn, navigateTo }) => {
  const navigate = useNavigate();
  return (
    <CloseModalContainer
      onClick={() => {
        onClose();
      }}
    >
      <CloseWrap onClick={(e) => e.stopPropagation()}>
        <div style={{ textAlign: "center" }}>
          <Text style={{ color: "#1C1E1F", fontSize: "16px" }}>
            {ModalText}
          </Text>
        </div>
        <BtnWrap>
          <ModalBtn
            style={{ backgroundColor: "#DFDFF1" }}
            onClick={() => {
              onClose();
            }}
          >
            닫기
          </ModalBtn>
          <ModalBtn
            style={{ backgroundColor: "#FF6C6C" }}
            onClick={() => {
              navigate(navigateTo);
            }}
          >
            종료할게요
          </ModalBtn>
        </BtnWrap>
      </CloseWrap>
    </CloseModalContainer>
  );
};

export default DeleteModal;
