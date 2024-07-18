import styled from "styled-components";
import clap from "../assets/icons/clap.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { writeDestinationReview } from "../services/api";
import { useRecoilValue } from "recoil";
import { userIdState } from "../atoms";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  background: rgba(0, 0, 0, 0.6);
`;

const ReviewModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 320px;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  z-index: 3;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Text = styled.h4`
  color: #f6f8fa;
  font-size: 20px;
  line-height: 32px;
`;

const TextArea = styled.textarea`
  resize: none;
  background-color: #5a5a76;
  box-sizing: border-box;
  padding: 20px;
  margin-bottom: 10px;
  margin-top: 10px;
  color: #f6f8fa;
  width: 100%;
  border-radius: 10px;
  height: 113px;
`;

const ModalBtn = styled.button`
  color: #f6f8fa;
  font-size: 14px;
  padding: 12px 24px;
  border-radius: 8px;
  width: 50%;
  border: none;
  cursor: pointer;
`;

const ReviewModal = ({
  onClose,
  destinationId,
  destinationName,
  destinationLatitude,
  destinationLongitude,
}) => {
  const navigate = useNavigate();
  const [reviewText, setReviewText] = useState("");
  const userId = useRecoilValue(userIdState);

  useEffect(() => {
    console.log(destinationLatitude, destinationLongitude);
  }, [destinationLatitude, destinationLongitude]);

  return (
    <ModalBackground onClick={onClose}>
      <ReviewModalContainer onClick={(e) => e.stopPropagation()}>
        <Wrapper style={{ textAlign: "center", justifySelf: "flex-start" }}>
          <Text
            style={{
              color: "#1C1E1F",
              fontSize: "18px",
              marginBottom: "10px",
            }}
          >
            도착을 완료했어요! <img src={clap} alt="Clap" />
          </Text>
          <Text
            style={{
              fontSize: "14px",
              color: "#797982",
              lineHeight: "24px",
              marginBottom: "14px",
            }}
          >
            소담소담은 당신의 건강을 응원합니다
          </Text>
        </Wrapper>

        <ModalBtn
          onClick={() => {
            navigate("/home");
          }}
          style={{
            backgroundColor: "#27C384",
            padding: "16px",
            width: "100%",
          }}
        >
          홈으로
        </ModalBtn>
      </ReviewModalContainer>
    </ModalBackground>
  );
};

export default ReviewModal;
