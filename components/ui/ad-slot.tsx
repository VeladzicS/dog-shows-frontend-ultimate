import Image from "next/image";
import { cn } from "@/lib/utils";

type AdVariant = "leaderboard" | "sidebar" | "inline";

interface AdSlotProps {
  variant: AdVariant;
  className?: string;
}

const bannerImages = [
  { src: "/sponsors/Ellie.png", alt: "Ellie", width: 1913, height: 281 },
  { src: "/sponsors/Luna.png", alt: "Luna", width: 1913, height: 281 },
  { src: "/sponsors/Patton.png", alt: "Patton", width: 1913, height: 281 },
  { src: "/sponsors/Rikki.png", alt: "Rikki", width: 1913, height: 281 },
  { src: "/sponsors/Sky.png", alt: "Sky", width: 1913, height: 281 },
];

let shuffled: typeof bannerImages = [];
let index = 0;

function getBannerImage() {
  if (index >= shuffled.length) {
    shuffled = [...bannerImages].sort(() => Math.random() - 0.5);
    index = 0;
  }
  return shuffled[index++];
}

export default function AdSlot({ variant, className }: AdSlotProps) {
  const banner = variant === "sidebar"
    ? { src: "/sponsors/Chips.png", alt: "Chips", width: 469, height: 1875 }
    : getBannerImage();

  return (
    <div
      className={cn(
        "flex items-center justify-center",
        variant === "leaderboard" && "w-full py-4",
        variant === "sidebar" && "sticky top-[120px]",
        variant === "inline" && "w-full py-6",
        className
      )}
    >
      <Image
        src={banner.src}
        alt={banner.alt}
        width={banner.width}
        height={banner.height}
        style={{ width: "100%", maxWidth: banner.width, height: "auto" }}
        unoptimized
      />
    </div>
  );
}
