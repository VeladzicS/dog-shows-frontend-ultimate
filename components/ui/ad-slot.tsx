import Image from "next/image";
import { cn } from "@/lib/utils";

type AdVariant = "leaderboard" | "sidebar" | "inline";

interface AdSlotProps {
  variant: AdVariant;
  className?: string;
}

const config: Record<AdVariant, { src: string; alt: string; width: number; height: number }> = {
  leaderboard: {
    src: "/ads/leaderboard.png",
    alt: "Advertisement",
    width: 728,
    height: 90,
  },
  sidebar: {
    src: "/ads/sidebar.jpg",
    alt: "Advertisement",
    width: 200,
    height: 600,
  },
  inline: {
    src: "/ads/leaderboard.png",
    alt: "Advertisement",
    width: 728,
    height: 90,
  },
};

export default function AdSlot({ variant, className }: AdSlotProps) {
  const { src, alt, width, height } = config[variant];

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
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="max-w-full h-auto"
        unoptimized
      />
    </div>
  );
}
