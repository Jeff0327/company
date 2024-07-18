"use client";
import React, { useState, useEffect } from "react";
import ThreeSection from "./ThreeSec";
import Image from "next/image";

interface Data {
  image: string;
  model: string;
}

function BusinessSection() {
  const [data, setData] = useState<Data[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("/data/threeModel.json")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  const handleChangeModel = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  if (data.length === 0) return <div>Loading...</div>;

  // Calculate the next index safely
  const nextIndex = (currentIndex + 1) % data.length;

  return (
    <div className="flex flex-col w-full h-screen bg-white overflow-x-hidden overflow-y-hidden">
      <ThreeSection modelURL={data[currentIndex].model} />
      <button
        className="absolute bottom-0 right-0 sm:bottom-10 sm:right-10 w-[100px] h-[100px] border-4 border-gray-900"
        onClick={handleChangeModel}
      >
        <Image
          src={data[nextIndex].image}
          alt={`sampleImg${nextIndex + 1}`}
          className="w-full h-full"
          width={500}
          height={500}
          priority
        />
      </button>
    </div>
  );
}

export default BusinessSection;
