import { notFound } from "next/navigation";
import { getJudge, getJudgeShows, getJudges } from "@/lib/data/judges";
import JudgeProfile from "@/components/judges/judge-profile";
import JudgeShows from "@/components/judges/judge-shows";
import PageHeader from "@/components/ui/page-header";
import type { Metadata } from "next";

interface JudgePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const res = await getJudges({ per_page: 100 });
    return res.data.map((judge) => ({ slug: judge.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: JudgePageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { data: judge } = await getJudge(slug);
    return {
      title: `${judge.name} | Dog Show Results`,
      description: judge.biography
        ? judge.biography.slice(0, 160)
        : `Judge profile for ${judge.name}.`,
    };
  } catch {
    return { title: "Judge | Dog Show Results" };
  }
}

export default async function JudgePage({ params }: JudgePageProps) {
  const { slug } = await params;

  let judge;
  let shows;
  try {
    const [judgeRes, showsRes] = await Promise.all([
      getJudge(slug),
      getJudgeShows(slug, { per_page: 20 }),
    ]);
    judge = judgeRes.data;
    shows = showsRes;
  } catch {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="container-screen px-4 py-10">
        <PageHeader
          breadcrumbs={[
            { label: "Judges", href: "/judges" },
            { label: judge.name },
          ]}
        />
        <JudgeProfile judge={judge} />
        <JudgeShows shows={shows.data} meta={shows.meta} slug={slug} />
      </div>
    </div>
  );
}
