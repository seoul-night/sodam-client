import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Head = styled.div`
  padding: 20px;
  padding-left: 0px;
  padding-right: 0px;
  display: flex;
  align-items: center;
  padding-top: 20px;
  margin-top: -20px;
  position: sticky;
  background-color: #ffffff;
  gap: 3px;
  /* border-bottom: 1px solid black; */
`;

const Text = styled.span`
  color: #1c1e1f;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
`;

const SearchForm = styled.form`
  display: flex;
  flex-grow: 1; /* 부모 컨테이너에서 가능한 너비를 차지하도록 설정 */
  justify-content: space-between;
`;

const SearchInput = styled.input`
  border-radius: 4px;
  flex: 1;
  box-sizing: border-box;
  font-size: 14px;
  background-color: #ebeef1;
  color: #1c1e1f; /* 입력한 텍스트의 색상 */
  padding: 10px 8px;

  ::placeholder {
    color: #91919c; /* placeholder 텍스트의 색상 */
  }
`;

const SubmitBtn = styled.button`
  color: #007d4b;
  background: none;
  border: none;
  padding: 10px;
  font-size: 18px;
  padding-right: 0px;
  cursor: pointer;
`;

const SearchHeader = ({
  headerText,
  icon,
  inputPH,
  handleInputChange,
  inputValue,
  navigateTo,
}) => {
  const navigate = useNavigate();
  return (
    <Head>
      <Link style={{ height: "24px", display: "flex", alignItems: "center" }}>
        <FontAwesomeIcon
          icon={faChevronLeft}
          style={{ color: "#1c1e1f", paddingRight: "15px" }}
          onClick={() => {
            navigate(-1);
          }}
        />
      </Link>
      <Text>{headerText}</Text>
      <SearchForm
        onSubmit={(event) => {
          event.preventDefault();
          navigate(`/${navigateTo}`);
        }}
      >
        <SearchInput
          placeholder={inputPH}
          onChange={handleInputChange}
          value={inputValue}
        />
        <SubmitBtn type="submit">검색</SubmitBtn>
      </SearchForm>
    </Head>
  );
};

export default SearchHeader;
