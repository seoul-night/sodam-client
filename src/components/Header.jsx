import React from "react";
import styled from "styled-components";

import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";

//완료 코스, 찜 코스 헤더

const Head = styled.div`
  /* position: fixed; */
  padding: 20px;
  padding-left: 0px;
  padding-right: 0px;
  display: flex;
  align-items: center;
  padding-top: 20px;
  margin-top: -20px;
  position: sticky;
  background-color: #ffffff;
  /* top: 0; */
  /* background-color: gray; */
  gap: 3px;
`;
const Text = styled.span`
  color: #1c1e1f;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
`;

const Header = ({ headerText, icon, navTo }) => {
  const navigate = useNavigate();
  return (
    <Head>
      <div
        style={{
          height: "24px",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={() => {
          if (navTo) {
            navigate(navTo);
          } else {
            navigate(-1);
          }
        }}
      >
        <FontAwesomeIcon
          icon={faChevronLeft}
          style={{ color: "#1c1e1f", paddingRight: "15px" }}
        />
      </div>
      <Text>{headerText}</Text>
      <img src={icon} style={{ width: "18px" }} />
    </Head>
  );
};

export default Header;
