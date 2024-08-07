"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Modal from "../Modal";
import { LuMenu } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header className={`bg-gray-900 text-white w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
        <div className="container mx-auto flex items-center justify-between py-5 px-6">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-lg font-semibold hover:text-gray-400"
            >
              Brand
            </Link>
            <nav className="hidden md:flex space-x-4">
              <Link href="/introduce" className="hover:text-gray-400">
                회사소개
              </Link>
              <Link href="/business" className="hover:text-gray-400">
                제품소개
              </Link>
              <Link href="/support" className="hover:text-gray-400">
                고객센터
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/search" className="hover:text-gray-400">
              <IoSearch className="w-6 h-6" />
            </Link>
            <button
              onClick={toggleModal}
              className="flex md:hidden sm:flex hover:text-gray-400"
            >
              <LuMenu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <div className="h-16"></div> {/* Spacer to prevent content from being hidden under the fixed header */}

      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <h2 className="text-2xl mb-4">Modal Title</h2>
        <p className="mb-4">This is the modal content.</p>
        <button
          onClick={toggleModal}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Close
        </button>
      </Modal>
    </>
  );
};

export default Header;