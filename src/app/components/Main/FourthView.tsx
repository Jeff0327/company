import Image from "next/image";

const textData = [
  {
    title: "브랜드 강화",
    description: "당신의 브랜드를 새로운 높이로 끌어올립니다.",
  },
  {
    title: "브랜드 혁신",
    description: "창의적인 솔루션으로 시장을 선도합니다.",
  },
  {
    title: "브랜드 기술",
    description: "최첨단 기술로 브랜드의 미래를 그립니다.",
  },
];

function FourthView() {
  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen bg-black text-white py-20">
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {textData.map((item, index) => (
          <div key={index} className="space-y-4 mb-0">
            <h2 className="text-4xl md:text-5xl sm:text-5xl font-bold">
              <span className="text-transparent bg-clip-text bg-cover bg-[url('/image/sample3.jpg')]">
                {item.title}
              </span>
            </h2>

            {item.description && (
              <div className="transition-all duration-300">
                <div className="font-semibold text-transparent bg-clip-text bg-cover bg-[url('/image/sample3.jpg')]">
                  <p className="text-2xl sm:text-3xl">{item.description}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FourthView;
