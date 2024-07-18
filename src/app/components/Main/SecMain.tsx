import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function SecView() {
  const imageData = [
    {
      src: "/image/sample1.jpg",
      description: "렌즈 디스플레이",
    },
    {
      src: "/image/sample2.jpg",
      description: "파트너 확장",
    },
    {
      src: "/image/sample3.jpg",
      description: "유전자 편집 임상실험",
    },
    {
      src: "/image/sample4.jpg",
      description: "로봇 대량생산 자동화",
    },
  ];

  return (
    <>
      <div className="flex w-full bg-gray-900 py-8">
        <span className="text-pretendard ml-[5vw] font-medium text-3xl sm:text-2xl sm:text-3xl text-white">
          주요 사업내용
        </span>
      </div>
      <div className="flex flex-wrap justify-evenly items-center min-h-[50vw] overflow-hidden w-full p-2">
        {imageData.map((image, index) => (
          <div
            key={index}
            className="flex flex-col my-1 justify-center items-center"
          >
            <div className="relative w-[180px] h-[180px] lg:w-[280px] lg:h-[280px] sm:w-[230px] sm:h-[230px] my-2">
              <Image
                className="object-cover hover:scale-110 hover:duration-700 rounded-lg w-full h-full shadow-lg"
                src={image.src}
                width={1000}
                height={1000}
                alt={`image${index}`}
              />
            </div>
            <p className="flex text-center text-md sm:text-lg font-semibold text-gray-700 my-2">
              {image.description.length > 20
                ? `${image.description.slice(0, 20)}...`
                : image.description}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default SecView;
