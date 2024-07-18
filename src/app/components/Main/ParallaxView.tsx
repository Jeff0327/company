"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface ParallaxViewProps {
  imageUrl: string;
  children: React.ReactNode;
}

function ParallaxView({ imageUrl, children }: ParallaxViewProps) {
  const [offset, setOffset] = useState(0);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollTop = window.scrollY;

        const elementTop = parallaxRef.current.offsetTop;
        const elementHeight = parallaxRef.current.offsetHeight;
        const viewportHeight = window.innerHeight;

        if (
          scrollTop > elementTop - viewportHeight &&
          scrollTop < elementTop + elementHeight
        ) {
          setOffset((scrollTop - (elementTop - viewportHeight)) * 0.5);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={parallaxRef} className="relative overflow-hidden h-[150vh]">
      <div className="absolute inset-0">
        <Image
          className="object-cover"
          src={imageUrl}
          alt="Parallax background"
          fill
          style={{
            transform: `translateY(${offset}px)`,
          }}
        />
      </div>
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

export default ParallaxView;
