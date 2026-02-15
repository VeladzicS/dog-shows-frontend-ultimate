import Link from "next/link";
import Image from "next/image";
import Card from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Dog } from "@/lib/types";

interface DogCardProps {
  dog: Dog;
  className?: string;
}

export default function DogCard({ dog, className }: DogCardProps) {
  return (
    <Link href={`/dogs/${dog.slug}`} className="block">
      <Card className={cn("flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-4", className)}>
        {dog.main_image_url ? (
          <Image
            src={dog.main_image_url}
            alt={dog.name}
            width={80}
            height={80}
            className="h-20 w-20 shrink-0 rounded-lg object-cover"
          />
        ) : (
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-2xl font-bold text-primary">
            {(dog.name.match(/[a-zA-Z]/) ?? ["?"])[0].toUpperCase()}
          </div>
        )}

        <div className="min-w-0 w-full">
          <h3 className="break-words text-base font-bold text-gray-900">
            {dog.name}
          </h3>
          {dog.call_name && (
            <p className="text-sm text-gray-500">&ldquo;{dog.call_name}&rdquo;</p>
          )}

          <div className="mt-2 flex flex-wrap justify-center sm:justify-start gap-1.5">
            <Badge variant="primary">{dog.breed}</Badge>
          </div>

          {dog.owner && (
            <p className="mt-1.5 truncate text-xs text-gray-400">
              Owner: {dog.owner}
            </p>
          )}
        </div>
      </Card>
    </Link>
  );
}
