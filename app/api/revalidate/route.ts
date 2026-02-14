import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const ALLOWED_TAG_PATTERN = /^[a-zA-Z0-9_-]+$/;
const MAX_TAGS = 20;

export async function POST(request: NextRequest) {
  // CORS check
  const origin = request.headers.get("origin");
  const allowedOrigin = process.env.CORS_URL;
  if (allowedOrigin && origin && origin !== allowedOrigin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Secret check
  const secret = request.headers.get("x-revalidate-secret");
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  // Parse and validate body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const tags: string[] = (body as { tags?: string[] }).tags || [];

  if (!Array.isArray(tags) || tags.length === 0 || tags.length > MAX_TAGS) {
    return NextResponse.json(
      { error: `tags must be an array of 1-${MAX_TAGS} items` },
      { status: 400 },
    );
  }

  const invalidTags = tags.filter(
    (t) => typeof t !== "string" || !ALLOWED_TAG_PATTERN.test(t),
  );
  if (invalidTags.length > 0) {
    return NextResponse.json(
      { error: "Tags must be alphanumeric with hyphens/underscores only" },
      { status: 400 },
    );
  }

  for (const tag of tags) {
    revalidateTag(tag, "default");
  }

  const response = NextResponse.json({ revalidated: tags, now: Date.now() });

  // Set CORS headers if origin is allowed
  if (allowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", allowedOrigin);
  }

  return response;
}
