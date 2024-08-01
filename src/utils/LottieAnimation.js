import React from "react";
import Lottie from "react-lottie";
// import animationData from "../assets/lottieAnimation.json"; // Replace with the correct path to your JSON file
import animationData from "../assets/lottie/homebtn01.json";

const LottieAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div
      style={{
        position: "absolute",
        bottom: "0",
        right: "0",
      }}
    >
      <Lottie options={defaultOptions} height={100} width={142} />
    </div>
  );
};

export default LottieAnimation;
