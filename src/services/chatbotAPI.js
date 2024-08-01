import { createRequest } from "../utils/api-utils";
import axios from "axios";

const BASE_URL = "https://sodamsodam.site/api";
const token = localStorage.getItem("token");
// const BASE_URL = "http://ddubam.site:8080/api";

const APP_KEY = process.env.REACT_APP_APP_KEY;

export const getReply = async (memberId, chat) => {
  const data = { memberId, chat };
  try {
    const response = await axios.post(`${BASE_URL}/api/chatbot`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("챗봇 답변 : ", response);
    console.log(response.data);
  } catch (error) {
    console.log("챗봇 답변 오류 : ", error);
  }
};
