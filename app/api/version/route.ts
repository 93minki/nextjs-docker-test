import { NextResponse } from "next/server";

export async function GET() {
  const gist_url = process.env.GIST_URL;

  const token = process.env.GIST_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "GitHub token not configured" },
      { status: 500 }
    );
  }
  if (!gist_url) {
    return NextResponse.json(
      { error: "Github Gist URL not configured" },
      { status: 500 }
    );
  }

  const response = await fetch(gist_url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3.raw",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch gist" },
      { status: response.status }
    );
  }

  const data = await response.json();

  return NextResponse.json(data);
}
