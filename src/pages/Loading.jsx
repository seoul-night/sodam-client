import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // 여기서 jwtDecode로 수정합니다.
import { useRecoilState } from "recoil";
import { userDataState } from "../atoms";
import { fetchUserData } from "../services/api";

const Loading = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useRecoilState(userDataState);

  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (token) {
        try {
          // JWT 토큰을 디코드하여 사용자 정보를 추출
          const decoded = jwtDecode(token);
          console.log("decoded:", decoded);
          const ddubamUserData = await fetchUserData(decoded.id);
          console.log("뚜밤유저데이터", ddubamUserData);

          setUserData(ddubamUserData);

          // 사용자 정보를 로컬 스토리지에 저장
          localStorage.setItem("token", token);

          // navigate("/home");
        } catch (error) {
          console.error("Failed to decode JWT token:", error);
          navigate("/error");
        }
      } else {
        // 토큰이 없으면 에러 페이지로 리다이렉트
        navigate("/error");
      }
    };
    fetchData();
  }, [navigate]);

  return <div>Loading...</div>;
};

export default Loading;
