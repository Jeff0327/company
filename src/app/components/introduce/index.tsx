'use client'
import React, { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

interface TeamMember {
  name: string;
  position: string;
  imageUrl: string;
  info:{eng:string,kor:string};
}

const teamMembers: TeamMember[] = [
  { 
    name: "John", 
    position: "CEO", 
    imageUrl: "/image/sampleceo.jpg",
    info: {
      eng: "John has over 20 years of experience in the tech industry and is passionate about innovation.",
      kor: "John은 기술 산업에서 20년 이상의 경험을 가지고 있으며 혁신에 대한 열정이 있습니다."
    }
  },
  { 
    name: "Lisbeth", 
    position: "CTO", 
    imageUrl: "/image/samplecto.jpg",
    info: {
      eng: "Lisbeth is a tech genius with multiple patents to her name and a vision for the future of our products.",
      kor: "Lisbeth는 다수의 특허를 보유한 기술 천재이며 우리 제품의 미래에 대한 비전을 가지고 있습니다."
    }
  },
  { 
    name: "Mike", 
    position: "CFO", 
    imageUrl: "/image/samplecfo.jpg",
    info: {
      eng: "Mike's financial acumen has been instrumental in our company's growth and stability.",
      kor: "Mike의 재무 통찰력은 우리 회사의 성장과 안정에 큰 도움이 되었습니다."
    }
  },
];

const IntroduceSection: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <section className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8" data-aos="fade-down">Brand Our Company</h1>
        
        <div className="mb-12 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8" data-aos="fade-right">
            <Image 
              src="/image/samplecom.jpg" 
              alt="Company Image" 
              width={600} 
              height={400} 
              className="rounded-xl shadow-md w-auto h-auto"
            />
          </div>
          <div className="md:w-1/2" data-aos="fade-left">
            <h2 className="text-2xl font-semibold mb-4">Company Overview</h2>
            <p className="text-gray-700">
              Founded in 2010, our company has been at the forefront of innovation in the tech industry. 
              We specialize in developing cutting-edge software solutions that help businesses thrive in the digital age.
            </p>
            <p className="text-gray-700 mt-2">
              2023년에 설립된 우리 회사는 기술 산업의 혁신을 선도해 왔습니다. 
              우리는 디지털 시대에 기업이 번창할 수 있도록 돕는 최첨단 소프트웨어 솔루션 개발을 전문으로 합니다.
            </p>
          </div>
        </div>
        
        <div className="mb-12" data-aos="fade-up">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700">
            Our mission is to empower businesses with innovative technology solutions that drive growth, 
            efficiency, and success in an ever-evolving digital landscape.
          </p>
          <p className="text-gray-700 mt-2">
            우리의 사명은 끊임없이 진화하는 디지털 환경에서 성장, 효율성, 성공을 이끄는 혁신적인 기술 솔루션으로 
            기업을 지원하는 것입니다.
          </p>
        </div>
        
        <div className="mb-12" data-aos="fade-up">
          <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {["Innovation (혁신)", "Integrity (정직)", "Collaboration (협력)", "Customer-focus (고객중심)"].map((value, index) => (
              <li key={index} data-aos="fade-right" data-aos-delay={index * 100}>
                <strong>{value}:</strong>
                <p>{["We constantly push the boundaries of what is possible.", "We conduct our business with the highest ethical standards.", "We believe in the power of teamwork and partnerships.", "Our customer's success is our success."][index]}</p>
                <p>{["우리는 끊임없이 가능성의 한계를 넓혀갑니다.", "우리는 최고의 윤리 기준으로 비즈니스를 수행합니다.", "우리는 팀워크와 파트너십의 힘을 믿습니다.", "고객의 성공이 곧 우리의 성공입니다."][index]}</p>
              </li>
            ))}
          </ul>
        </div>
        
        <div data-aos="fade-up">
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md relative overflow-hidden group" 
              data-aos="flip-left" 
              data-aos-delay={index * 100}
            >
              <Image 
                src={member.imageUrl} 
                alt={member.name} 
                width={300} 
                height={300} 
                className="rounded-lg mx-auto mb-4 w-auto h-50 sm:h-60"
              />
              <h3 className="text-xl font-semibold text-center">{member.name}</h3>
              <p className="text-gray-600 text-center">{member.position}</p>
              
              {/* Hover mask with info */}
              <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-white text-center p-4">
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-sm mb-2">{member.info.eng}</p>
                  <p className="text-sm">{member.info.kor}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>
    </div>
  );
};

export default IntroduceSection;