import React from "react";
import NavigationMap from "../../components/NavigationMap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const HomeWrapper = styled.div`
  min-height: 100vh;
  background-color: #ffffff;
  overflow: auto;
  position: relative;
  /* padding: 20px; */
  /* padding-top: 20px; */
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
  padding: 5px;
`;

const MapContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #1c1c26;
  touch-action: pan-x pan-y;
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
  border: 3px solid #27c384;
`;

const GreenText = styled.h4`
  font-size: 12px;
  color: #007d4b;
  font-weight: 500;
  line-height: 18px;
`;

const LocationText = styled.h1`
  font-size: 14px;
  color: #1c1e1f;
  font-weight: 600;
  margin-right: 6px;
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
    background-color: #1c9263;
  }
`;

const CheckLocation = () => {
  const navigate = useNavigate();
  return (
    <HomeWrapper className="All">
      <Header>
        <FontAwesomeIcon
          icon={faChevronLeft}
          style={{ color: "#1c1e1f", padding: "15px", cursor: "pointer" }}
          onClick={() => {
            navigate(-1);
          }}
        />
      </Header>
      <MapContainer>
        <NavigationMap lat={37.545} lng={127.0684} />
      </MapContainer>

      <Wrap>
        <Info>
          <GreenText>부모님 위치</GreenText>
          <div
            style={{ display: "flex", marginTop: "7px", marginBottom: "7px" }}
          >
            {/* <Distance>{fetchedData.distance} km</Distance> */}
            <LocationText>서울 어딘가</LocationText>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            {/* {fetchedData.safetyLatitudeList && (
              <CCTVnumber>
                <img src={ic_cctv} style={{ marginRight: "6px" }} />
                CCTV {fetchedData.safetyLatitudeList.length}대
              </CCTVnumber>
            )} */}
          </div>
        </Info>
        <Button
          onClick={() => {
            navigate("/setPlaceName");
          }}
        >
          이 위치 선택하기
        </Button>
      </Wrap>
    </HomeWrapper>
  );
};

export default CheckLocation;
