import { createRequest } from "../utils/api-utils";
import axios from "axios";

const BASE_URL = "https://sodamsodam.site/api";
const token = localStorage.getItem("token");
// const BASE_URL = "http://ddubam.site:8080/api";

const APP_KEY = process.env.REACT_APP_APP_KEY;

export const addFriend = async (userId, friendId) => {
  try {
    const data = { friendId: friendId };
    const response = await axios.post(
      `${BASE_URL}/members/friend/${userId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("친구 추가 : ", response);
    return response.data;
  } catch (error) {
    console.log("친구 추가 에러 ", error);
    // throw error;
  }
};

//내 친구 정보 조회
export const getFriends = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/members/friend/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("친구 목록 : ", response);
    return response.data;
  } catch (error) {
    console.log("친구 정보 조회 에러 ", error);
  }
};

//친구 삭제
export const deleteFriend = async (userId, targetUserId) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/members/friend/${userId}/${targetUserId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log("친구 삭제 에러 : ", error);
  }
};

//친구 검색
export const findFriend = async (targetUserEmail) => {
  try {
    console.log(targetUserEmail);
    const response = await axios.get(
      `${BASE_URL}/members/friend/search/${targetUserEmail}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log("친구 검색 에러 : ", error);
  }
};
