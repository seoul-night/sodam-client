import React, { useEffect } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import homeback from "../assets/sodam/img/homeback.png";
import homeColored from "../assets/sodam/ic/homeColored.png";
import My from "../assets/sodam/ic/My.png";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { geolocationState, userDataState, userIdState } from "../atoms";
import { useState } from "react";
import { locationState } from "../atoms";
import logo from "../assets/sodam/img/logo.png";
import location from "../assets/sodam/ic/location.png";
import homebtn1 from "../assets/sodam/img/homebtn1.png";
import homebtn2 from "../assets/sodam/img/homebtn2.png";
import KakaoLogin, { fetchAttractions, keywordSearch } from "../services/api";
import { createRequest } from "../utils/api-utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faSearch } from "@fortawesome/free-solid-svg-icons";
import chatIcon from "../assets/sodam/ic/chatIcon.png";
import map_marker from "../assets/sodam/map_marker.png";
import LottieAnimation from "../utils/LottieAnimation";
// import LottieAnimation from "../utils/lottieAnimation";
import clap from "../assets/sodam/ic/clap.png";
import { addLocation } from "../services/locatoinAPI";
import LottieAnimation2 from "../utils/LottieAnimation2";

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

const HomeWrapper = styled.div`
  z-index: 1;
  min-height: 100vh;
  padding-bottom: 90px;
  background: #ffffff;
  overflow: auto;
  position: relative;
`;
const Head = styled.div`
  position: fixed;
  background-color: #ffffff;
  top: 0px;
  display: flex;
  width: 100%;
  align-items: center;
  box-sizing: border-box;
  justify-content: space-between;
  padding: 25px;
  z-index: 3;
  h2 {
    font-size: 16px;
    font-weight: 600;
    color: #1c1e1f;
  }

  span {
    font-size: 12px;
    color: #1c1e1f;
    font-weight: 500;
  }
`;

const UserWrap = styled.div`
  height: 270px;
  padding: 30px;
  box-sizing: border-box;
  background-image: url(${homeback});
  background-size: cover;
  background-position: center;
`;

const Region = styled.i`
  color: white;
  font-size: 15px;
  margin: 2px;
  margin-right: 5px;
`;

const Pic = styled.div`
  width: 76px; /* 이미지 크기 + 테두리 두께 3px */
  height: 76px; /* 이미지 크기 + 테두리 두께 3px */
  border-radius: 50%;
  margin-top: 55px;
  margin-bottom: 25px;
  background: linear-gradient(45deg, #31d191, #3eb9fe);
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    /* border: 3px solid white; 내부 테두리 색상 */
  }
`;

const Name = styled.span`
  color: #15a36a;
  font-size: 18px;
  font-weight: 500;
`;

const GoWalk = styled.div`
  margin: 30px;
`;

const Text = styled.span`
  color: #f6f8fa;
  font-size: 18px;
  font-weight: 500;
  line-height: 150%;
`;

const Title = styled.p`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: black;
  margin-bottom: 10px;
`;

const Box = styled.div`
  height: 150px;
  background-color: #343449;
  padding: 15px;
  /* padding-bottom: 0px; */
  box-sizing: border-box;
  border-radius: 10px;
  margin-bottom: 10px;
  position: relative;
  overflow: hidden;
`;

const SubText = styled.span`
  font-size: 12px;
  line-height: 18px;
  color: #797982;
`;

const LongBox = styled(Box)`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${(props) => props.backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Desc = styled.h4`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  line-height: 21px;
  color: #f6f8fa;
`;
const SubText2 = styled.p`
  font-size: 12px;
  line-height: 18px;
  color: #f6f8fa;
`;
const Badge = styled.h4`
  border-radius: 4px;
  display: inline-block;
  color: #f6f8fa;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 4px 8px 4px 8px;
  font-size: 10px;
  align-self: flex-start;
`;

const SearchBar = styled.div`
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: calc(100% - 60px);
  height: 37px;
  color: #91919c;
  box-sizing: border-box;
  padding: 8px 10px 8px 10px;
  margin-left: 30px;
  margin-right: 30px;
  background-color: #ebeef1;
`;

const ChatWrap = styled.div`
  background-color: #f6f8fa;
  font-size: 14px;
  height: 52px;
  width: calc(100%-60px);
  border-radius: 26px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding-right: 20px;
  cursor: pointer;
  margin-left: 30px;
  margin-right: 30px;

  h4 {
    font-size: 14px;
    color: #1c1e1f;
  }
  i {
    color: #1c1e1f;
  }
`;

const Home = () => {
  const userData1 = useRecoilValue(userDataState);
  const navigate = useNavigate();
  const locationName = useRecoilValue(locationState);
  const [userData, setUserData] = useRecoilState(userDataState);
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModal, setIsSecondModal] = useState(false);
  const { kakao } = window;
  const setLocation = useSetRecoilState(locationState);
  const geolocation = useRecoilValue(geolocationState);
  const userId = useRecoilValue(userIdState);

  const currentLat = geolocation.latitude;
  const currentLng = geolocation.longitude;

  const toAttractionDetail = async (latitude, longitude) => {
    try {
      // 수정된 부분: createRequest 사용
      const data = await createRequest(
        "get",
        `/attractions/${latitude}/${longitude}`
      );
      console.log(data);
      if (data.trailId != undefined) {
        navigate(`/pathdetail/${data.trailId}`);
      }
    } catch (error) {
      console.error("Error fetching attraction details:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const attractionData = await fetchAttractions();
      if (attractionData) {
        setAttractions(attractionData);
      } else {
        setAttractions([]);
      }
    };

    fetchData();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const geocoder = new kakao.maps.services.Geocoder();

          const callback = function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
              // console.log("Geocoder result:", result);
              const address =
                result[0].region_1depth_name +
                " " +
                result[0].region_2depth_name;
              // console.log("Resolved Address:", address);
              setLocation(address);
            } else {
              // console.log("Geocoder failed due to: " + status);
            }
          };

          geocoder.coord2RegionCode(
            position.coords.longitude,
            position.coords.latitude,
            callback
          );
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, [setUserData]);

  console.log(attractions);

  return (
    <HomeWrapper className="Home">
      {isModalOpen && (
        <CloseModalContainer onClick={() => {}}>
          <CloseWrap onClick={(e) => e.stopPropagation()}>
            <div style={{ textAlign: "center" }}>
              <Text
                style={{
                  color: "#1C1E1F",
                  fontSize: "16px",
                  fontWeight: "600",
                  marginBottom: "10px",
                }}
              >
                자식에게 내 위치를 보낼까요?
              </Text>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "6px",
                }}
              >
                <img
                  src={map_marker}
                  style={{ width: "16px", marginRight: "4px" }}
                />
                <SubText>위치정보 어딘가~~</SubText>
              </div>
            </div>
            <BtnWrap>
              <ModalBtn
                style={{ backgroundColor: "#DFDFF1" }}
                onClick={() => {
                  setIsModalOpen(false);
                }}
              >
                닫기
              </ModalBtn>
              <ModalBtn
                style={{ backgroundColor: "#27C384" }}
                onClick={() => {
                  // deletePlace();
                  // navigate();
                  addLocation(userId, currentLat, currentLng);
                  // console.log(userId, currentLat, currentLng);
                  setIsModalOpen(false);
                  setIsSecondModal(true);
                }}
              >
                위치 보내기
              </ModalBtn>
            </BtnWrap>
          </CloseWrap>
        </CloseModalContainer>
      )}

      {isSecondModal && (
        <CloseModalContainer onClick={() => {}}>
          <CloseWrap onClick={(e) => e.stopPropagation()}>
            <div
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={clap}
                style={{ width: "46px", height: "46px", marginBottom: "5px" }}
              />
              <Text
                style={{
                  color: "#1C1E1F",
                  fontSize: "16px",
                  fontWeight: "600",
                  marginBottom: "10px",
                }}
              >
                위치를 성공적으로 보냈어요
              </Text>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "6px",
                }}
              ></div>
            </div>
            <BtnWrap>
              <ModalBtn
                style={{ backgroundColor: "#27C384", width: "100%" }}
                onClick={() => setIsSecondModal(false)}
              >
                확인
              </ModalBtn>
            </BtnWrap>
          </CloseWrap>
        </CloseModalContainer>
      )}

      {/* 백그라운드 이미지 */}
      {/* <div>
        <img
          className="Home"
          src={homeback}
          style={{
            position: "fixed",
            zIndex: "-1",
            width: "100%",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            border: "none",
          }}
        />
      </div> */}
      <Head className="Home">
        <div
          style={{
            justifyContent: "space-between",
            display: "flex",
            width: "100%",
          }}
        >
          <img src={logo} style={{ height: "24px" }} />

          <div
            style={{
              position: "absolute",
              right: "0",
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
          >
            <img
              src={location}
              style={{ marginRight: "3px", height: "18px" }}
            />
            <span>{locationName}</span>
          </div>
        </div>
      </Head>
      <UserWrap style={{ backgroundImage: `${homeback}` }}>
        <div>
          <Pic>
            <img src={userData.profile} />
          </Pic>
          <div>
            <Name>{userData.nickName}</Name>
            <Text style={{ color: "black" }}>님,</Text>
          </div>
          <div>
            <Text style={{ color: "black" }}>안전하게 어디로 도착할까요?</Text>
          </div>
        </div>
      </UserWrap>
      <SearchBar onClick={() => navigate("/search")}>
        <FontAwesomeIcon icon={faSearch} style={{ marginRight: "8px" }} />
        도착하고 싶은 곳 검색
      </SearchBar>
      <GoWalk>
        <Title>부모님의 위치를 보여줘요</Title>
        <div
          style={{
            display: "flex",
            boxSizing: "border-box",
            justifyContent: "space-between",
            gap: "8px",
            boxSizing: "border-box",
          }}
        >
          <Box
            style={{
              width: "154px",
              backgroundColor: "#27C384",
              flexGrow: "1",
            }}
          >
            <SubText2>안전하게</SubText2>
            <Text>부모님 위치 확인 </Text>
            <LottieAnimation />
          </Box>
          <Box
            style={{
              width: "154px",
              backgroundColor: "#3EB9FE",
              flexGrow: "1",
            }}
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <SubText2>자식에게</SubText2>
            <Text>내 위치 보내기</Text>

            <LottieAnimation2 />
          </Box>
        </div>
      </GoWalk>
      <GoWalk>
        <Title>부모님과 함께하기 좋은 여행지</Title>
        <div
          style={{
            boxSizing: "border-box",
          }}
        >
          {attractions.map((attraction, id) => {
            return (
              <LongBox
                key={id}
                backgroundImage={attraction.attractionUrl}
                onClick={() => {
                  toAttractionDetail(
                    attraction.attractionLatitude,
                    attraction.attractionLongitude
                  );
                }}
              >
                <Badge>{attraction.attractionRegion}</Badge>
                <div>
                  <Desc>{attraction.attractionDetail}</Desc>
                  <Text>{attraction.attractionName}</Text>
                </div>
              </LongBox>
            );
          })}
        </div>
      </GoWalk>
      <ChatWrap>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <img
            src={chatIcon}
            style={{ width: "44px", marginRight: "10px", marginLeft: "2px" }}
          />
          <h4>AI 챗봇에 물어보기</h4>
        </div>
        <FontAwesomeIcon icon={faChevronRight} />
      </ChatWrap>
      <Footer
        home={homeColored}
        my={My}
        homeColor={"#27C384"}
        myColor={"#91919C"}
      />
    </HomeWrapper>
  );
};

export default Home;
