import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import KakaoMap from "../components/KakaoMap";
import {
  coord2address,
  fetchNavigationData,
  fetchPathDetail,
} from "../services/api";
import NavigationMap from "../components/NavigationMap";
import ic_cctv from "../assets/sodam/ic/ic_cctv.png";
import something from "../assets/sodam/img/something.png";
import close from "../assets/close.png";
import map_marker from "../assets/sodam/map_marker.png";
import CloseModal from "../components/CloseModal";
import ReviewModal from "../components/ReviewModal";
import Spinner from "../components/Spinner";

const HomeWrapper = styled.div`
  height: 100vh;
  background-color: #ffffff;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
`;

const Header = styled.div`
  z-index: 3;
  position: absolute;
  top: 0;
  display: flex;
  width: 100%;
  box-sizing: border-box;
  background-color: #ffffff;
  padding: 20px;
`;

const Location = styled.div`
  background-color: #ebeef1;
  padding: 0px 10px;
  height: 37px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  color: #1c1e1f;
  font-size: 14px;
`;

const Wrap = styled.div`
  z-index: 3;
  position: absolute;
  box-sizing: border-box;
  bottom: 0;
  width: 100%;
  padding: 20px;
`;

const Info = styled.div`
  box-sizing: border-box;
  width: 100%;
  background-color: #ffffff;
  padding: 12px 16px;
  border-radius: 10px;
  border: 2px solid #27c384;
`;

const PurpleText = styled.h4`
  font-size: 12px;
  color: #007d4b;
  font-weight: 500;
  line-height: 18px;
`;

const Time = styled.h4`
  font-size: 24px;
  color: #1c1e1f;
  font-weight: 500;
  margin-right: 6px;
`;

const CCTVnumber = styled.h4`
  font-size: 12px;
  line-height: 18px;
  color: #1c1e1f;
`;

const Distance = styled.h4`
  font-size: 12px;
  line-height: 18px;
  color: #1c1e1f;
  font-weight: 500;
  margin-top: auto;
`;

const Button = styled.button`
  margin-top: 16px;
  width: 100%;
  height: 56px;
  background-color: #27c384;
  color: #f6f8fa;
  font-size: 16px;
  border-radius: 10px;
  border: none;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #007d4b;
  }
`;

const MapContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #ffffff;
  touch-action: pan-x pan-y;
`;

const LocationWrap = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const WhiteText = styled.span`
  font-size: 16px;
  line-height: 24px;
  margin-right: 6px;
  color: #1c1e1f;
`;

const GrayText = styled.span`
  font-size: 16px;
  line-height: 24px;
  color: #797982;
`;

function decimalHoursToTime(decimalHours) {
  if (typeof decimalHours == undefined) {
    return "0분";
  }
  const hours = Math.floor(decimalHours);
  const minutes = Math.round((decimalHours - hours) * 60);
  if (hours === 0) {
    return `${minutes}분`;
  } else {
    return `${hours}시간 ${minutes}분`;
  }
}

const Navigation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fetchedData, setFetchedData] = useState({});
  const location = useLocation();
  const [isStarted, setIsStarted] = useState(false);
  const [finishModalOpen, setFinishModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState("");

  const {
    startLatitude,
    startLongitude,
    endLatitude,
    endLongitude,
    typedText,
    destinationId,
  } = location.state || {};

  useEffect(() => {
    console.log(
      "사용 데이터 : ",
      startLatitude,
      startLongitude,
      endLatitude,
      endLongitude
    );
    setFetchedData({ time: 0 });
    if (startLatitude && startLongitude && endLatitude && endLongitude) {
      const fetchData = async () => {
        setLoading(true);
        const data = await fetchNavigationData(
          startLatitude,
          startLongitude,
          endLatitude,
          endLongitude
        );
        const locationData = await coord2address(startLatitude, startLongitude);
        setCurrentLocation(locationData);
        console.log("현위치 : ", locationData);
        setFetchedData(data);
        console.log(data);
        setLoading(false);
      };
      fetchData();
    } else {
      // 필요한 데이터가 없을 경우를 처리
      console.error("Missing coordinates data.");
      setFetchedData({});
      setLoading(false);
    }
  }, [startLatitude, startLongitude, endLatitude, endLongitude]);

  const closeModal = () => {
    setFinishModalOpen(false);
  };

  const closeReviewModal = () => {
    setReviewModalOpen(false);
  };

  return (
    <>
      {finishModalOpen && <CloseModal onClose={closeModal} />}
      {reviewModalOpen && (
        <ReviewModal
          destinationId={destinationId}
          destinationName={typedText}
          onClose={closeReviewModal}
          destinationLatitude={endLatitude}
          destinationLongitude={endLongitude}
        />
      )}
      <HomeWrapper className="PathDetail">
        {!isStarted ? (
          <Header>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "10px",
              }}
            >
              <img src={something} style={{ width: "16px", height: "57px" }} />
            </div>
            <LocationWrap>
              <Location>{currentLocation}</Location>
              <Location>{typedText}</Location>
            </LocationWrap>
            <div>
              <img
                src={close}
                style={{
                  width: "20px",
                  height: "20px",
                  paddingLeft: "10px",
                  paddingTop: "9px",
                  paddingBottom: "10px",
                  cursor: "pointer",
                }}
                onClick={() => navigate(-1)}
              />
            </div>
          </Header>
        ) : (
          <Header style={{ justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={map_marker}
                style={{ width: "24px", height: "24px", marginRight: "6px" }}
              />
              <WhiteText>{typedText}</WhiteText>{" "}
              <GrayText> 가는 중...</GrayText>
            </div>

            <img
              src={close}
              style={{
                width: "24px",
                height: "24px",
                cursor: "pointer",
              }}
              onClick={() => {
                setFinishModalOpen(true);
              }}
            />
          </Header>
        )}

        <MapContainer>
          {loading ? <Spinner size="md" theme="light" /> : null}
          {!loading && fetchedData.latitudeList && fetchedData.longitudeList ? (
            <NavigationMap
              latitudeList={fetchedData.latitudeList}
              longitudeList={fetchedData.longitudeList}
              safetyLatitudeList={fetchedData.safetyLatitudeList}
              safetyLongitudeList={fetchedData.safetyLongitudeList}
              safetyTypeList={fetchedData.safetyTypeList}
            />
          ) : null}
        </MapContainer>
        {!isStarted ? (
          <Wrap>
            <Info>
              <PurpleText>안전한 거리</PurpleText>
              <div
                style={{
                  display: "flex",
                  marginTop: "7px",
                  marginBottom: "7px",
                }}
              >
                <Time>{decimalHoursToTime(fetchedData.time)} </Time>
                <Distance>{fetchedData.distance} km</Distance>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                {fetchedData.safetyLatitudeList && (
                  <CCTVnumber>
                    <img src={ic_cctv} style={{ marginRight: "6px" }} />
                    CCTV {fetchedData.safetyLatitudeList.length}대
                  </CCTVnumber>
                )}
              </div>
            </Info>
            <Button onClick={() => setIsStarted(true)}>출발하기</Button>
          </Wrap>
        ) : (
          <Wrap>
            <Button onClick={() => setReviewModalOpen(true)}>
              도착 완료하기
            </Button>
          </Wrap>
        )}
      </HomeWrapper>
    </>
  );
};

export default Navigation;

// {
//   "meta": {
//       "total_count": 1
//   },
//   "documents": [
//       {
//           "road_address": null,
//           "address": {
//               "address_name": "대전 유성구 덕명동 산 16-12",
//               "region_1depth_name": "대전",
//               "region_2depth_name": "유성구",
//               "region_3depth_name": "덕명동",
//               "mountain_yn": "Y",
//               "main_address_no": "16",
//               "sub_address_no": "12",
//               "zip_code": ""
//           }
//       }
//   ]
// }
