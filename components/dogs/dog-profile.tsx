import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import Badge from "@/components/ui/badge";
import type { Dog } from "@/lib/types";

interface DogProfileProps {
  dog: Dog;
}

export default function DogProfile({ dog }: DogProfileProps) {
  return (
    <div className="mb-10">
      <Link
        href="/dogs"
        className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary"
      >
        <ArrowLeft size={16} />
        Back to dogs
      </Link>

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex flex-col gap-6 md:flex-row ">
          {dog.main_image_url && (
            <Image
              src={dog.main_image_url}
              alt={dog.name}
              width={240}
              height={240}
              className="h-60 w-60 shrink-0 rounded-xl object-cover"
            />
          )}

          <div className="w-full">
            <h1 className="mb-1 text-3xl font-bold text-gray-900">
              {dog.name}
            </h1>
            {dog.call_name && (
              <p className="mb-3 text-lg text-gray-500">
                &ldquo;{dog.call_name}&rdquo;
              </p>
            )}

            <div className="mb-4 flex flex-wrap gap-2">
              <Badge variant="primary">{dog.breed}</Badge>
            </div>

            <dl className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
              {dog.registration_number && (
                <>
                  <dt className="text-gray-400">Registration</dt>
                  <dd className="text-gray-700">{dog.registration_number}</dd>
                </>
              )}
              {dog.birth_date && (
                <>
                  <dt className="text-gray-400">Birth Date</dt>
                  <dd className="text-gray-700">{dog.birth_date}</dd>
                </>
              )}
              {dog.sire && (
                <>
                  <dt className="text-gray-400">Sire</dt>
                  <dd className="text-gray-700">{dog.sire}</dd>
                </>
              )}
              {dog.dam && (
                <>
                  <dt className="text-gray-400">Dam</dt>
                  <dd className="text-gray-700">{dog.dam}</dd>
                </>
              )}
              {dog.breeder && (
                <>
                  <dt className="text-gray-400">Breeder</dt>
                  <dd className="text-gray-700">{dog.breeder}</dd>
                </>
              )}
              {dog.owner && (
                <>
                  <dt className="text-gray-400">Owner</dt>
                  <dd className="text-gray-700">{dog.owner}</dd>
                </>
              )}
            </dl>

            {dog.biography && (
              <p className="mt-4 leading-relaxed text-gray-600">
                {dog.biography}
              </p>
            )}

            <div className="mt-8 rounded-sm border border-primary/15 bg-primary/5 px-4 py-3.5 flex items-center gap-4 justify-between sm:flex-row flex-col">
              <p className="leading-relaxed text-primary">
                Are you the owner of this dog? You can submit gallery photos, a
                bio, or request corrections to any information shown here.
              </p>
              <a
                href={`mailto:info@showsightmagazine.com?subject=Dog%20Profile%20Update%20-%20${encodeURIComponent(dog.name)}`}
                className="flex min-w-[150px] items-center justify-center gap-2 flex-nowrap rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary/90"
              >
                <Mail size={15} />
                Contact Us
              </a>
            </div>
          </div>
        </div>

        {dog.gallery && dog.gallery.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Gallery</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {dog.gallery.map((img) => (
                <div key={img.id} className="overflow-hidden rounded-lg">
                  <Image
                    src={img.url}
                    alt={img.caption || dog.name}
                    width={300}
                    height={300}
                    className="aspect-square w-full object-cover transition hover:scale-105"
                  />
                  {img.caption && (
                    <p className="mt-1 text-xs text-gray-500">{img.caption}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
