import { createRequest } from "../utils/api-utils";
import axios from "axios";

const BASE_URL = "https://sodamsodam.site/api";
const token = localStorage.getItem("token");
// const BASE_URL = "http://ddubam.site:8080/api";

const APP_KEY = process.env.REACT_APP_APP_KEY;

export const getReply = async (memberId, chat) => {
  const data = { memberId, chat };
  try {
    const response = await axios.post(`${BASE_URL}/chatbots`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response?.data;
  } catch (error) {
    console.log("챗봇 답변 오류 : ", error);
    return {
      text: "챗봇 서비스에 문제가 발생했습니다. 나중에 다시 시도해주세요.",
    };
  }
};

export const enterChat = async (memberId, chat) => {
  const data = { memberId, chat };
  try {
    const response = await axios.post(`${BASE_URL}/chatbots/sessions`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("입장 성공");
  } catch (error) {
    console.log("챗봇 입장 에러 : ", error);
  }
};

export const TTS = async (text) => {
  const data = { text };
  try {
    const response = await axios.post(`${BASE_URL}/chatbots/speach`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("tts 에러 : ", error);
  }
};

export async function fetchAndPlaySpeech(text) {
  try {
    const response = await fetch(`${BASE_URL}/chatbots/speach`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text: text }),
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.play();
    } else {
      console.error("Failed to fetch speech:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching speech:", error);
  }
}
