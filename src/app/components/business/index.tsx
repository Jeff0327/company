"use client";
import React, { useState, useEffect } from "react";
import ThreeSection from "./ThreeSec";
import Image from "next/image";
import axios from 'axios';

interface Data {
  image: string;
  model: string;
}

interface ModelData extends Data {
  signedUrl: string;
}

function BusinessSection() {
  const [data, setData] = useState<ModelData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState<Data[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/data/threeModel.json");
      const jsonData: Data[] = await response.json();
      setImageUrl(jsonData);
      const modelDataWithSignedUrls = await Promise.all(
        jsonData.map(async (item) => {
          const signedUrlResponse = await axios.post('/api/threemodel', { filePath: item.model });
          return { ...item, signedUrl: signedUrlResponse.data.signedUrl };
        })
      );

      setData(modelDataWithSignedUrls);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading data:", error);
      setIsLoading(false);
    }
  };

  const handleChangeModel = () => {
    setIsLoading(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const nextIndex = (currentIndex + 1) % data.length;

  return (
    <div className="flex flex-col w-full h-screen bg-white overflow-x-hidden overflow-y-hidden">
      {data.length > 0 && (
        <>
          <ThreeSection 
            modelURL={data[currentIndex].signedUrl} 
            isLoading={isLoading} 
            setIsLoading={setIsLoading}
          />
          <button
            className="absolute bottom-0 right-0 sm:bottom-10 sm:right-10 w-[100px] h-[100px] border-4 border-gray-900"
            onClick={handleChangeModel}
          >
            <Image
              src={imageUrl[nextIndex].image}
              alt={`sampleImg${nextIndex + 1}`}
              className="w-full h-full"
              width={500}
              height={500}
              priority
            />
          </button>
        </>
      )}
    </div>
  );
}

export default BusinessSection;