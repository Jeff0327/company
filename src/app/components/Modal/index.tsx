import Link from "next/link";
import React, { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex justify-center items-evenly bg-white p-6 w-full h-full mx-auto">
        <button
          className="absolute top-5 right-5 stroke-[#333] w-10 h-10 text-gray-900 hover:text-gray-900"
          onClick={onClose}
        >
          <svg viewBox="0 0 24 24">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        <div
          onClick={onClose}
          className="flex flex-col items-center gap-5 mt-10 w-full"
        >
          <Link
            className="text-gray-900 font-semibold w-full text-center hover:bg-gray-100 hover:text-blue-400 text-lg"
            href="/introduce"
          >
            회사소개
          </Link>
          <Link
            className="text-gray-900 font-semibold w-full text-center hover:bg-gray-100 hover:text-blue-400 text-lg"
            href="/business"
          >
            제품소개
          </Link>
          <Link
            className="text-gray-900 font-semibold w-full text-center hover:bg-gray-100 hover:text-blue-400 text-lg"
            href="/support"
          >
            고객센터
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Modal;
