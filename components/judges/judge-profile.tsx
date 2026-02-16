import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, Globe } from "lucide-react";
import type { Judge } from "@/lib/types";

interface JudgeProfileProps {
  judge: Judge;
}

export default function JudgeProfile({ judge }: JudgeProfileProps) {
  return (
    <div className="mb-10">
      <Link
        href="/judges"
        className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary"
      >
        <ArrowLeft size={16} />
        Back to judges
      </Link>

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex flex-col gap-6 sm:flex-row">
          {judge.profile_image_url ? (
            <Image
              src={judge.profile_image_url}
              alt={judge.name}
              width={120}
              height={120}
              className="h-30 w-30 shrink-0 rounded-xl object-cover"
            />
          ) : (
            <div className="flex h-30 w-30 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-4xl font-bold text-primary">
              {judge.name.charAt(0)}
            </div>
          )}

          <div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900">
              {judge.name}
            </h1>

            <div className="mb-4 flex flex-wrap gap-3 text-sm text-gray-500">
              {judge.email && (
                <a
                  href={`mailto:${judge.email}`}
                  className="flex items-center gap-1 hover:text-primary"
                >
                  <Mail size={14} />
                  {judge.email}
                </a>
              )}
              {judge.phone && (
                <span className="flex items-center gap-1">
                  <Phone size={14} />
                  {judge.phone}
                </span>
              )}
              {judge.website && (
                <a
                  href={judge.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-primary"
                >
                  <Globe size={14} />
                  Website
                </a>
              )}
            </div>


            {judge.biography && (
              <p className="leading-relaxed text-gray-600">
                {judge.biography}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
