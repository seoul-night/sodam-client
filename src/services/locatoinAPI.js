import { createRequest } from "../utils/api-utils";
import axios from "axios";

const BASE_URL = "https://sodamsodam.site/api";
const token = localStorage.getItem("token");
// const BASE_URL = "http://ddubam.site:8080/api";

const APP_KEY = process.env.REACT_APP_APP_KEY;

//위치 데이터 저장
export const addLocation = async (userId, latitude, longitude) => {
  const data = {
    userId,
    latitude,
    longitude,
  };
  try {
    await axios.post(`${BASE_URL}/family/locations`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("위치 데이터 저장 에러 : ", error);
  }
};

//위치 데이터 조회
export const getLocation = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/family/locations/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
