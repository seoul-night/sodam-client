import React from "react";
import styled from "styled-components";

const HomeWrapper = styled.div`
  height: 100vh;
  background-color: #ffffff;
  overflow: hidden;
  position: relative;
  padding: 20px;
  box-sizing: border-box;
`;

const Wrapper = () => {
  return <HomeWrapper className="All"></HomeWrapper>;
};

export default Wrapper;
