import React, { useEffect, useState } from "react";
import styled from "styled-components";

import BlackWrapper from "../components/BlackWrapper";
import CourseHeader from "../components/CourseHeader";
import Notice from "../components/Notice";
import PathLi from "../components/PathLi";

const HomeWrapper = styled.div`
  height: 100vh;
  background-color: #1c1c26;
  overflow: hidden;
  position: relative;
  padding: 20px;
  box-sizing: border-box;
`;

const Paths = styled.ul``;

const NearbyPath = () => {
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    fetch("http://13.124.30.111:8080/walks/near/32.123/122.123")
      .then((response) => response.json())
      .then((data) => {
        console.log("현 위치 기반 :", data);
        setFetchedData(data);
      });
  }, []);

  return (
    <HomeWrapper className="NearbyPath">
      <CourseHeader headerText={"현 위치 기반"} location={"서울 송파구"} />
      <Notice />
      <Paths>
        {fetchedData.map((data) => {
          return (
            <PathLi
              key={data.id}
              id={data.id}
              image={data.image}
              title={data.title}
              detail={data.detail}
              time={data.time}
              distance={data.distance}
              region={data.region}
            />
          );
        })}
      </Paths>
    </HomeWrapper>
  );
};

export default NearbyPath;
