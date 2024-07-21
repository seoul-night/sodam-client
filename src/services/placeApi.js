import { createRequest } from "../utils/api-utils";
import axios from "axios";

const BASE_URL = "https://sodamsodam.site/api";
const token = localStorage.getItem("token");
// const BASE_URL = "http://ddubam.site:8080/api";

const APP_KEY = process.env.REACT_APP_APP_KEY;

//등록 장소 데이터 조회
export const getSavedPlaces = async (userId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/members/locations/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("등록 장소 데이터 : ", response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//장소 등록
export const postPlace = async (userId, latitude, longitude, name, address) => {
  const data = {
    userId,
    latitude,
    longitude,
    name,
    address,
  };
  try {
    const response = await axios.post(`${BASE_URL}/members/locations`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("장소 등록 : ", response);
    return response.json();
  } catch (error) {
    console.log("장소 등록 에러 : ", error);
    throw error;
  }
};

//등록 장소 삭제
export const deletePlace = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/members/locations/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("장소 삭제 요청 전송됨");
  } catch (error) {
    console.log("등록 장소 삭제 에러 : ", error);
    throw error;
  }
};

//위치 데이터 저장, response 없음
const saveLocation = async ({ userId, latitude, longitude }) => {
  try {
    const data = {
      userId,
      latitude,
      longitude,
    };
    const response = await axios.post(`${BASE_URL}/family/locations`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("위치 저장 에러 : ", error);
    console.log(error);
  }
};

//위치 데이터 조회
const getLocationData = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/family/lcations/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("위치 데이터 조회 결과 : ", response);
    return response.data();
  } catch (error) {
    console.log("위치 데이터 조회 에러 : ", error);
    throw error;
  }
};
