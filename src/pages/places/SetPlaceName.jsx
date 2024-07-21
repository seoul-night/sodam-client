import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import { useNavigate, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userIdState } from "../../atoms";
import { postPlace } from "../../services/placeApi";
import { useMutation, useQueryClient } from "react-query";

const HomeWrapper = styled.div`
  min-height: 100vh;
  background-color: #ffffff;
  overflow: auto;
  position: relative;
  padding: 20px;
  box-sizing: border-box;
`;

const Text = styled.h1`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
  color: black;
`;

const Input = styled.input`
  padding: 8px 10px;
  margin-bottom: 8px;
  background-color: #ebeef1;
  color: black;
  box-sizing: border-box;
  margin-bottom: 16px;
  width: 100%;
  border-radius: 4px;

  ::placeholder {
    color: #91919c; /* placeholder 텍스트의 색상 */
  }
`;

const Button = styled.button`
  width: 100%;
  background-color: ${(props) => (props.disabled ? "#DFDFF1" : "#27c384")};
  border-radius: 10px;
  border: none;
  height: 56px;
  color: ${(props) => (props.disabled ? "#91919c" : "white")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  transition: all 0.3s;
`;

const SetPlaceName = () => {
  const [typedText, setTypedText] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const userId = useRecoilValue(userIdState);
  const queryClient = useQueryClient();

  const { y, x, road_address_name } = location.state || {};

  const mutation = useMutation(postPlace, {
    onSuccess: () => {
      console.log("위치 등록 성공");
      queryClient.invalidateQueries(["savedPlaces", userId]); //위치 등록 후 데이터 최신 상태로 갱신
      navigate("/savedPlaces");
    },
    onError: () => {
      console.log("등록 에러");
    },
  });

  const mutateData = {
    userId,
    latitude: parseFloat(y),
    longitude: parseFloat(x),
    name: typedText,
    address: road_address_name,
  };

  useEffect(() => {
    console.log("Location state:", location.state.road_address_name);
    console.log("UserId:", userId);
  }, [location.state, userId]);

  useEffect(() => {
    console.log(typedText);
  }, [typedText]);

  return (
    <HomeWrapper className="All">
      <Header />
      <Text>장소의 이름을 알려주세요</Text>
      <Input
        placeholder="예) 집, 학교"
        onChange={(event) => {
          setTypedText(event.target.value);
          // console.log(typedText);
        }}
      />
      <Button
        disabled={typedText === ""}
        onClick={() => {
          mutation.mutate(mutateData);
        }}
      >
        장소 등록 완료
      </Button>
    </HomeWrapper>
  );
};

export default SetPlaceName;
