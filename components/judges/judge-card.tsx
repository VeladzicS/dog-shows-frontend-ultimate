import Link from "next/link";
import Image from "next/image";
import Card from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Judge } from "@/lib/types";

interface JudgeCardProps {
  judge: Judge;
  className?: string;
}

export default function JudgeCard({ judge, className }: JudgeCardProps) {
  return (
    <Link href={`/judges/${judge.slug}`}>
      <Card className={cn("flex items-center gap-4", className)}>
        {judge.profile_image_url ? (
          <Image
            src={judge.profile_image_url}
            alt={judge.name}
            width={64}
            height={64}
            className="h-16 w-16 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
            {judge.name.charAt(0)}
          </div>
        )}

        <div className="min-w-0">
          <h3 className="text-lg font-bold text-gray-900">{judge.name}</h3>

        </div>
      </Card>
    </Link>
  );
}
