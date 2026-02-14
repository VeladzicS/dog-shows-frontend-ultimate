import { notFound } from "next/navigation";
import { getDog, getDogResults, getDogs } from "@/lib/data/dogs";
import DogProfile from "@/components/dogs/dog-profile";
import DogResults from "@/components/dogs/dog-results";
import PageHeader from "@/components/ui/page-header";
import type { Metadata } from "next";

interface DogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const res = await getDogs({ per_page: 100 });
    return res.data.map((dog) => ({ slug: dog.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: DogPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { data: dog } = await getDog(slug);
    return {
      title: `${dog.name} | Dog Show Results`,
      description: dog.biography
        ? dog.biography.slice(0, 160)
        : `${dog.name} — ${dog.breed} show dog profile and results.`,
    };
  } catch {
    return { title: "Dog | Dog Show Results" };
  }
}

export default async function DogPage({ params }: DogPageProps) {
  const { slug } = await params;

  let dog;
  let results;
  try {
    const [dogRes, resultsRes] = await Promise.all([
      getDog(slug),
      getDogResults(slug, { per_page: 20 }),
    ]);
    dog = dogRes.data;
    results = resultsRes;
  } catch {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="container-screen px-4 py-10">
        <PageHeader
          breadcrumbs={[
            { label: "Dogs", href: "/dogs" },
            { label: dog.name },
          ]}
        />
        <DogProfile dog={dog} />
        <DogResults
          results={results.data}
          meta={results.meta ?? { current_page: 1, last_page: 1, per_page: 20, total: 0 }}
          slug={slug}
        />
      </div>
    </div>
  );
}
