import React, { useEffect, useState } from "react";
import SearchHeader from "../../components/layout/SearchHeader";
import styled from "styled-components";
import homeback from "../../assets/homeback.png";
import DeleteModal from "../../components/common/DeleteModal";
import { keywordSearch } from "../../services/api";

const HomeWrapper = styled.div`
  min-height: 100vh;
  background-color: #ffffff;
  overflow: auto;
  position: relative;
  padding: 20px;
  box-sizing: border-box;
`;

const SearchedPerson = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 250px;
  gap: 10px;
`;

const PersonImg = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const PersonName = styled.h4`
  font-size: 16px;
`;

const AddBtn = styled.button`
  width: 116px;
  height: 44px;
  border: none;
  background-color: #27c384;
  border-radius: 10px;
  color: #f6f8fa;
  font-size: 18px;
  cursor: pointer;
`;

const KeywordUl = styled.ul``;

const KeywordLi = styled.li`
  font-size: 14px;
  color: #f6f8fa;
  background-color: #f6f8fa;
  margin-bottom: 8px;
  box-sizing: border-box;
  width: 100%;
  border-radius: 8px;
  /* border: 1px solid #5a5a76; */
  color: #1c1e1f;
  padding: 16px 12px;
`;

const KeywordCount = styled.div`
  height: 21px;
  margin-bottom: 10px;
  display: flex;
  gap: 8px;
`;

const TextWrap = styled.div`
  height: 21px;
  margin-bottom: 3px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const GrayText = styled.span`
  color: #91919c;
  font-size: 14px;
`;

const Nothing = styled.div`
  flex-direction: column;
  gap: 10px;
  display: flex;
  width: 100%;
  height: 40%;
  justify-content: center;
  align-items: center;
`;

const WhiteText = styled.span`
  color: #1c1e1f;
  font-size: 14px;
`;

const SearchPlace = () => {
  const [typedText, setTypedText] = useState("");
  const [keywordList, setKeywordList] = useState([]);

  const placeClick = (name) => {
    setTypedText(name);
  };

  const handleInputChange = (event) => {
    setTypedText(event.target.value);
  };

  /*
  1. 인풋에 장소 입력
  2. 입력한 텍스트를 typedText로 설정
  3. 타이핑 끝나면 검색
  */
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const fetchKeywordList = async () => {
        if (typedText) {
          try {
            const response = await keywordSearch(typedText);
            console.log("API respone:", response);
            setKeywordList(response || []);
          } catch (error) {
            console.log(error);
          }
        }
      };

      fetchKeywordList();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [typedText]);

  return (
    <HomeWrapper className="All">
      <SearchHeader
        inputPH={"등록하고 싶은 장소 검색"}
        handleInputChange={handleInputChange}
        inputValue={typedText}
        navigateTo={"checkLocation"}
      />

      {typedText !== "" ? (
        keywordList.length > 0 ? (
          <KeywordUl>
            <KeywordCount>
              <GrayText>검색 결과</GrayText>
              <WhiteText>{keywordList.length}</WhiteText>
            </KeywordCount>
            {keywordList.map((place, index) => (
              <KeywordLi
                key={index}
                onClick={() => placeClick(place.place_name)}
              >
                {place.place_name}
              </KeywordLi>
            ))}
          </KeywordUl>
        ) : (
          <Nothing>
            <WhiteText style={{ fontSize: "16px" }}>
              검색 결과가 없습니다
            </WhiteText>
            <GrayText style={{ fontSize: "16px", color: "#797982" }}>
              다른 키워드로 검색해보세요
            </GrayText>
          </Nothing>
        )
      ) : null}
    </HomeWrapper>
  );
};

export default SearchPlace;
