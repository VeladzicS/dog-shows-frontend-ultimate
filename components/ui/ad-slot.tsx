import Image from "next/image";
import { cn } from "@/lib/utils";

type AdVariant = "leaderboard" | "sidebar" | "inline";

interface AdSlotProps {
  variant: AdVariant;
  className?: string;
}

const bannerImages = [
  { src: "/ads/Cashin.png", alt: "Cashin", width: 728, height: 90 },
  { src: "/ads/FRISCHMANN.png", alt: "Frischmann", width: 728, height: 90 },
  { src: "/ads/Tzanis.png", alt: "Tzanis", width: 728, height: 90 },
];

function getBannerImage() {
  return bannerImages[Math.floor(Math.random() * bannerImages.length)];
}

export default function AdSlot({ variant, className }: AdSlotProps) {
  const banner = variant === "sidebar"
    ? { src: "/ads/sidebar.jpg", alt: "Sidebar", width: 200, height: 600 }
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
        className="max-w-full h-auto"
        unoptimized
      />
    </div>
  );
}
