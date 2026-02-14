import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidate-secret");
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  const body = await request.json();
  const tags: string[] = body.tags || [];

  for (const tag of tags) {
    revalidateTag(tag, "default");
  }

  return NextResponse.json({ revalidated: tags, now: Date.now() });
}
