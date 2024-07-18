import Link from "next/link";
import React from "react";
import "swiper/css/pagination";
const Footer: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white p-6">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left side: Company info */}
        <div className="text-left">
          <h4 className="font-bold">(주)브랜드</h4>
          <p>
            주소:서울시 강남구 삼성로 123
            <br />
            강남빌딩 102
            <br />
            대표: 홍길동
          </p>
        </div>

        {/* Center side: Links */}
        <div className="text-center">
          <Link href="/terms" className="block underline underline-offset-4">
            서비스 약관
          </Link>
          <Link
            href="/privacy-policy"
            className="block underline underline-offset-4"
          >
            개인정보 처리방침
          </Link>
          <p>사업자번호:123-45-12345</p>
        </div>

        {/* Right side: Contact info */}
        <div className="text-right">
          <p>대표번호: 123-456-7890</p>
          <Link href="/support" className="underline underline-offset-4">
            고객센터
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
