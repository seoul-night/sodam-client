/* global Kakao */
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Onboarding from "./pages/Onboarding.jsx";
import MyPage from "./pages/MyPage.jsx";
import { useEffect } from "react";
import NearbyPath from "./pages/NearbyPath.jsx";
import FinishedPath from "./pages/FinishedPath.jsx";
import LikedPath from "./pages/LikedPath.jsx";
import PopularPath from "./pages/PopularPath.jsx";
import NotFound from "./pages/NotFound.jsx";
import PathDetail from "./pages/PathDetail.jsx";
import Walking from "./pages/Walking.jsx";
import Loading from "./pages/Loading.jsx";
import Navigation from "./pages/Navigation.jsx";
// import Searching from "./pages/Searching.jsx";
import Search from "./pages/Search.jsx";
import PrivateRoute from "./auth/PrivateRoute.jsx";
import NavigateToPopular from "./pages/NavigateToPopular.jsx";
import SavedPlaces from "./pages/places/SavedPlaces.jsx";
import ChatBot from "./pages/ChatBot.jsx";
import RegisteredFriends from "./pages/friends/RegisteredFriends.jsx";
import RegisteredPlaces from "./pages/places/RegisteredPlaces.jsx";
import SearchFriends from "./pages/friends/SearchFriend.jsx";
import DeleteFriend from "./pages/friends/DeleteFriend.jsx";

function App() {
  // APp.js 렌더링시 뷰포트 높이 계산 함수
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  useEffect(() => {
    setScreenSize();
    if (window.Kakao) {
      // console.log("Kakao 객체 확인됨");
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.REACT_APP_KAKAO_SDK_APPKEY);
        // console.log(
        //   "kakao js sdk 초기화 상태 : ",
        //   window.Kakao.isInitialized()
        // );
      } else {
        console.log("Kakao js sdk 이미 초기화됨");
      }
    } else {
      console.error("Kakao 객체를 찾을 수 없습니다.");
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/loading" element={<Loading />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/mypage"
          element={
            <PrivateRoute>
              <MyPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/nearby"
          element={
            <PrivateRoute>
              <NearbyPath />
            </PrivateRoute>
          }
        />
        <Route
          path="/search"
          element={
            <PrivateRoute>
              <Search />
            </PrivateRoute>
          }
        />
        <Route
          path="/finished"
          element={
            <PrivateRoute>
              <FinishedPath />
            </PrivateRoute>
          }
        />
        <Route
          path="/liked"
          element={
            <PrivateRoute>
              <LikedPath />
            </PrivateRoute>
          }
        />
        <Route
          path="/popular"
          element={
            <PrivateRoute>
              <PopularPath />
            </PrivateRoute>
          }
        />
        <Route
          path="/navigation"
          element={
            <PrivateRoute>
              <Navigation />
            </PrivateRoute>
          }
        />
        <Route
          path="/pathdetail/:id"
          element={
            <PrivateRoute>
              <PathDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/walking/:trailId"
          element={
            <PrivateRoute>
              <Walking />
            </PrivateRoute>
          }
        />
        {/* <Route path="*" element={<NotFound />} /> */}
        <Route
          path="/navigatePopular/:id"
          element={
            <PrivateRoute>
              <NavigateToPopular />
            </PrivateRoute>
          }
        ></Route>
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/friends" element={<RegisteredFriends />}></Route>
        <Route path="/searchFriends" element={<SearchFriends />} />
        <Route path="/savedplaces" element={<RegisteredPlaces />} />
        <Route path="/deleteFriend" element={<DeleteFriend />} />
      </Routes>
    </div>
  );
}

export default App;
