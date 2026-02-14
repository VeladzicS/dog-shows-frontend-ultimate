import { notFound } from "next/navigation";
import { getShow } from "@/lib/data/shows";
import ShowDetail from "@/components/shows/show-detail";
import PageHeader from "@/components/ui/page-header";
import type { Metadata } from "next";

interface ShowPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ShowPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const { data: show } = await getShow(id);
    return {
      title: `${show.show_name} | Dog Show Results`,
      description: `${show.show_name} — ${show.breed} ${show.show_type} judged by ${show.judge} in ${show.location}.`,
    };
  } catch {
    return { title: "Show | Dog Show Results" };
  }
}

export default async function ShowPage({ params }: ShowPageProps) {
  const { id } = await params;

  let show;
  try {
    const res = await getShow(id);
    show = res.data;
  } catch {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="container-screen px-4 py-10">
        <PageHeader
          breadcrumbs={[
            { label: "Shows" },
            { label: show.show_name },
          ]}
        />
        <ShowDetail show={show} />
      </div>
    </div>
  );
}
