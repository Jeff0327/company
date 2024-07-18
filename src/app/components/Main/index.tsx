"use client";
import { useEffect, useState, useMemo } from "react";
import SecView from "./SecMain";
import ThirdView from "./ThirdView";
import ParallaxView from "./ParallaxView";
import FourthView from "./FourthView";
import LastView from "./LastView";

interface MainText {
  firstText: string;
  secText: string;
  tirText: string;
  fouText: string;
}

function MainPage() {
  const mainText = useMemo<MainText>(
    () => ({
      firstText: "창조하세요.",
      secText: "도전하세요.",
      tirText: "발전하세요.",
      fouText: "미래를 열어가세요.",
    }),
    []
  );

  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const texts = [
      mainText.firstText,
      mainText.secText,
      mainText.tirText,
      mainText.fouText,
    ];

    let timeoutId: NodeJS.Timeout;

    const typeText = (text: string, index: number = 0) => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        timeoutId = setTimeout(() => typeText(text, index + 1), 100);
      } else {
        timeoutId = setTimeout(() => {
          eraseText(text);
        }, 1000);
      }
    };

    const eraseText = (text: string, index: number = text.length) => {
      if (index >= 0) {
        setDisplayText(text.slice(0, index));
        timeoutId = setTimeout(() => eraseText(text, index - 1), 50);
      } else {
        setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }
    };

    typeText(texts[textIndex]);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [textIndex, mainText]);

  return (
    <div className="relative flex flex-col min-h-screen">
      {/* Video and text overlay container */}
      <div className="relative w-full h-[60vh]">
        <video
          className="w-full h-full object-cover"
          src={"/video/sampleVideo.mp4"}
          loop
          muted
          autoPlay
          playsInline
        />
        <span className="absolute inset-0 flex flex-col items-center justify-center text-white text-2xl sm:text-4xl font-bold text-center">
          <p>브랜드는 기술을 향해갑니다.</p>
          <p>브랜드와 함께 {`${displayText}`}</p>
        </span>
      </div>
      <SecView />
      <ParallaxView imageUrl="/image/sample7.jpg">
        <ThirdView />
      </ParallaxView>
      <ParallaxView imageUrl="/image/sample8.jpg">
        <FourthView />
      </ParallaxView>
      <LastView />
    </div>
  );
}

export default MainPage;
