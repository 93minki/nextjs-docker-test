import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "outer-version.json");
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const parsed = JSON.parse(data);
    return NextResponse.json(parsed);
  } catch (error) {
    return NextResponse.json(
      { error: `${error} Version file not found or invalid` },
      { status: 500 }
    );
  }
}
