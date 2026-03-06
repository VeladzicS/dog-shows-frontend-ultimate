"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

interface DogImageSlideshowProps {
  images: { url: string; caption?: string }[];
  name: string;
}

export default function DogImageSlideshow({
  images,
  name,
}: DogImageSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 25000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative overflow-hidden" style={{ width: 300 }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <Image
            src={images[currentIndex].url}
            alt={name}
            width={300}
            height={0}
            sizes="300px"
            className="h-auto w-[300px]"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
