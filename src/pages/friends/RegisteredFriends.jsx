import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/Header";
import friends from "../../assets/sodam/ic/friends.png";
import homeback from "../../assets/homeback.png";
import { useRecoilValue } from "recoil";
import { userIdState } from "../../atoms";
import { useQuery } from "react-query";
import { getFriends } from "../../services/friendsApi";

const HomeWrapper = styled.div`
  height: 100vh;
  background-color: #ffffff;
  overflow: hidden;
  position: relative;
  padding: 20px;
  /* padding-top: 0px; */
  box-sizing: border-box;
`;

const SearchBar = styled.div`
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  color: #91919c;
  box-sizing: border-box;
  padding: 8px 10px 8px 10px;
  background-color: #ebeef1;
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
  margin-top: 30px;
  margin-bottom: 10px;
`;

const FriendsUl = styled.ul``;

const FreindsLi = styled.li`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  background-color: #f6f8fa;
  color: #1c1e1f;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 12px 16px;
  cursor: pointer;

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

const RegisteredFriends = () => {
  const userId = useRecoilValue(userIdState);
  const navigate = useNavigate();
  const { data, error, isLoading } = useQuery(
    ["savedFriends", userId],
    () => getFriends(userId),
    {
      onSuccess: (data) => {
        console.log("Fetched friends data:", data);
      },
    }
  );

  return (
    <HomeWrapper className="All">
      <Header headerText={"등록한 친구"} icon={friends} />
      <BlackText>친구 등록하기</BlackText>
      <SearchBar onClick={() => navigate("/searchFriends")}>
        <FontAwesomeIcon icon={faSearch} style={{ marginRight: "8px" }} />
        친구의 카카오 이메일 입력
      </SearchBar>
      <Wrapper>
        <div>
          <BlackText style={{ display: "inline" }}>친구 목록</BlackText>
          <GreenText>n</GreenText>
        </div>
        <GrayText onClick={() => navigate("/deleteFriend")}>편집</GrayText>
      </Wrapper>
      <FriendsUl>
        {/* {data &&
          data.map((friend, i) => (
            <FreindsLi key={i}>
              <img src={friend.profile} />
              {friend.nickname}
            </FreindsLi>
          ))} */}
        <FreindsLi>
          <img src={homeback} />
          김옥순
        </FreindsLi>
      </FriendsUl>
    </HomeWrapper>
  );
};

export default RegisteredFriends;
// "sktks11@naver.com"
