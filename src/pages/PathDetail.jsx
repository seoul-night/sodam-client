import React, { useEffect, useState } from "react";
import CourseHeader from "../components/CourseHeader";
import styled from "styled-components";
import emptylike from "../assets/icons/emptylike.png";
import like from "../assets/icons/like.png";
import { useNavigate, useParams } from "react-router-dom";
import KakaoMap from "../components/KakaoMap";
import { useRecoilValue } from "recoil";
import { geolocationState, locationState, userIdState } from "../atoms";
import { fetchPathDetail, navigateToPopular } from "../services/api";
import { createRequest } from "../utils/api-utils";

const HomeWrapper = styled.div`
  height: 100vh;
  background-color: #ffffff;
  overflow: hidden;
  position: relative;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
`;

const Wrap = styled.div`
  /* background-color: gray; */
  padding-top: 26px;
  padding-bottom: 26px;
  width: 100%;
  margin-top: 28px;
  margin-bottom: 28px;
  /* border-bottom: 1px solid #91919c; */
`;
const WhiteText1 = styled.h4`
  color: black;
  margin-right: 16px;
  font-size: 20px;
  line-height: 21px;
`;
const WhiteText2 = styled.h4`
  color: black;
  margin-right: 16px;
  font-size: 16px;
  line-height: 21px;
`;
const GrayText1 = styled.h4`
  color: #91919c;
  line-height: 21px;
  font-size: 14px;
`;

const GrayText2 = styled.h4`
  color: #91919c;
  line-height: 21px;
  font-size: 16px;
`;

const DetailWrap = styled.div`
  display: flex;
  margin-bottom: 8px;
`;

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  background-color: #ffffff;
  z-index: 3;
  left: 0;
  right: 0;
  margin: 0 auto;
  max-width: var(--max-width);
  width: 100%;
  height: 104px;
  border-top: 2px solid #ebeef1;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 20px;
  justify-content: space-between;
`;

const Button = styled.button`
  width: 261px;
  height: 56px;
  background-color: #27c384;
  color: #f6f8fa;
  font-size: 16px;
  border-radius: 10px;
  border: none;
  transition: all 0.3s;

  &:hover {
    background-color: #007d4b;
  }
`;

const CenterDiv = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

const MapContainer = styled.div`
  width: calc(100% + 40px);
  height: 230px;
  background-color: whitesmoke;
  margin-left: -20px;
  margin-right: -20px;
  touch-action: pan-x pan-y;
`;

const PathDetail = () => {
  //to do : 코스id로 데이터 요청
  const { id } = useParams();
  console.log("trailId:", id);
  const navigate = useNavigate();
  const locationName = useRecoilValue(locationState);
  // console.log(trailId);

  const userLocation = useRecoilValue(geolocationState);
  const latitude = userLocation.latitude;
  const longitude = userLocation.longitude;

  const [liked, setLike] = useState(false);
  const [fetchedData, setFetchedData] = useState({});
  const [loading, setLoading] = useState(true);
  const userId = useRecoilValue(userIdState);

  useEffect(() => {
    const fetchData = async () => {
      //원래 코드
      const data = await fetchPathDetail(id, userId);
      console.log(id, userId, latitude, longitude);
      // const data = await navigateToPopular(id, userId, latitude, longitude);
      setFetchedData(data);
      setLoading(false);
      setLike(data.picked);
      console.log("산책 코스 정보 :", data);
    };
    fetchData();
  }, []);

  if (!loading) {
    // console.log("fetchedData:", fetchedData);
  }

  const sendingData = {
    userId: userId,
    trailId: parseInt(id),
  };

  const toggleLike = async () => {
    const method = liked ? "DELETE" : "POST";

    try {
      // 수정된 부분: createRequest 사용
      await createRequest(method, "/members/walks/select", sendingData);
      setLike(!liked); // 요청이 성공하면 상태 변경
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <HomeWrapper className="PathDetail">
      <CourseHeader headerText={"산책 코스 정보"} location={locationName} />
      <MapContainer>
        {fetchedData.latitudeList && fetchedData.longitudeList && (
          <KakaoMap
            latitudeList={fetchedData.latitudeList}
            longitudeList={fetchedData.longitudeList}
            safetyLatitudeList={fetchedData.safetyLatitudeList || []}
            safetyLongitudeList={fetchedData.safetyLongitudeList || []}
            startLatitudeList={fetchedData.startLatitudeList || []}
            startLongitudeList={fetchedData.startLongitudeList || []}
          />
        )}
      </MapContainer>
      <Wrap style={{ borderBottom: "1px solid #EBEEF1", gap: "4px" }}>
        <WhiteText1 style={{ fontSize: "20px", marginBottom: "10px" }}>
          {fetchedData.title}
        </WhiteText1>
        <GrayText1 style={{ fontSize: "14px" }}>{fetchedData.detail}</GrayText1>
      </Wrap>
      <Wrap>
        <DetailWrap>
          <WhiteText2>총 산책거리</WhiteText2>
          <GrayText2>{fetchedData.distance}km</GrayText2>
        </DetailWrap>
        <DetailWrap>
          <WhiteText2>소요시간</WhiteText2>
          <GrayText2>{fetchedData.time}시간</GrayText2>
        </DetailWrap>
        <DetailWrap>
          <WhiteText2>코스 레벨</WhiteText2>
          <GrayText2>{fetchedData.level}</GrayText2>
        </DetailWrap>
      </Wrap>

      <Footer>
        <CenterDiv>
          {/* 클릭시 서버 통신 로직 추후 추가 */}
          <div style={{ textAlign: "center" }}>
            <img
              src={liked ? like : emptylike}
              alt="Like"
              onClick={toggleLike}
            />
            <GrayText2>찜</GrayText2>
          </div>
        </CenterDiv>
        <Button
          style={{ marginLeft: "auto" }}
          onClick={() => {
            navigate(`/walking/${id}`);
          }}
        >
          산책 시작하기
        </Button>
      </Footer>
    </HomeWrapper>
  );
};

export default PathDetail;

// {
//   "status": 200,
//   "message": "요청이 성공했습니다.",
//   "data": {
//       "latitudeList": [55.1,33.2],
//       "longitudeList": [133.1,134.2],
//       "trailRegion": "산책로 지역1",
//       "trailImage": "산책로 사진1",
//       "trailTitle": "산책로 이름1"
//       "trailDistance": 4.3,
//       "detail": "산책로에 대한 정보1",
//       "rating": 30,
//       "time": 3,
//       "level": "초급"
//       "picked": true
//   }
// }

// {
//   "trailId": 1,
//   // 그냥 polyline
//   "startLatitudeList": [55.1,55.2],
//   "startLongitudeList": [126.01,126.02],

//   // cctv마커 표시
//   "safetyLatitudeList": [55.1,55.2],
//   "safetyLongitudeList": [126.01,126.02],

//   //기존 유지
//   "latitudeList": [55.1,33.2],
//   "longitudeList": [133.1,134.2],
//   "trailRegion": "산책로 지역1",
//   "trailImage": "산책로 사진1",
//   "trailTitle": "산책로 이름1",
//   "trailDistance": 4.3,
//   "detail": "산책로에 대한 정보1",
//   "rating": 30,
//   "time": 3,
//   "level": "초급"
//   "picked": true
// }
