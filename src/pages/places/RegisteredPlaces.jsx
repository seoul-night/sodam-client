import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import place from "../../assets/sodam/ic/place.png";
import { faChevronRight, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import homeback from "../../assets/homeback.png";
import { useQuery } from "react-query";
import Spinner from "../../components/Spinner";
import { getSavedPlaces } from "../../services/placeApi";
import { useRecoilValue } from "recoil";
import { userIdState } from "../../atoms";

const HomeWrapper = styled.div`
  height: 100vh;
  background-color: #ffffff;
  overflow: hidden;
  position: relative;
  padding: 20px;
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

const RegisteredPlaces = () => {
  const navigate = useNavigate();
  const [savedPlaces, setSavedPlaces] = useState([]);
  const userId = useRecoilValue(userIdState);
  const { data, error, isLoading } = useQuery(["savedPlaces", userId], () =>
    getSavedPlaces(userId)
  );

  // if (error) return <div>Error</div>;

  return (
    <HomeWrapper className="All">
      <Header headerText={"등록한 장소"} icon={place} />
      <BlackText>장소 등록하기</BlackText>
      <SearchBar onClick={() => navigate("/searchPlace")}>
        <FontAwesomeIcon icon={faSearch} style={{ marginRight: "8px" }} />
        등록하고 싶은 장소 검색
      </SearchBar>
      <Wrapper>
        <div>
          <BlackText style={{ display: "inline" }}>장소 목록</BlackText>
          <GreenText>{data ? data.length : 0}</GreenText>
        </div>
        <GrayText onClick={() => navigate("/deletePlaces")}>편집</GrayText>
      </Wrapper>
      {isLoading && <Spinner />}
      <PlacesUl>
        {/* <PlacesLi>
          <div>
            <PlaceName>부모님 집</PlaceName>
            <PlaceLocation>경기도 부천시 ~~</PlaceLocation>
          </div>
          <FontAwesomeIcon
            icon={faChevronRight}
            style={{ marginRight: "8px", color: "#91919C" }}
          />
        </PlacesLi> */}
        {data.map((place, i) => {
          return (
            <PlacesLi>
              <div>
                <PlaceName>{place.name}</PlaceName>
                <PlaceLocation>{place.address}</PlaceLocation>
              </div>
              <FontAwesomeIcon
                icon={faChevronRight}
                style={{ marginRight: "8px", color: "#91919C" }}
              />
            </PlacesLi>
          );
        })}
      </PlacesUl>
    </HomeWrapper>
  );
};

export default RegisteredPlaces;
