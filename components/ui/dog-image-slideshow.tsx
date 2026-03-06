"use client";

import { useState, useEffect, useCallback } from "react";
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
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setHeight((prev) => Math.max(prev ?? 0, img.naturalHeight * (300 / img.naturalWidth)));
  }, []);

  return (
    <div
      className="relative overflow-hidden"
      style={{ width: 300, minHeight: height }}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src={images[currentIndex].url}
            alt={name}
            width={300}
            height={0}
            sizes="300px"
            className="h-auto w-[300px]"
            onLoad={onImageLoad}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
