import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../convex/_generated/api";
import { NextResponse } from "next/server";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// Cache the count for 60 seconds
let cachedCount: number | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 60 * 1000; // 60 seconds

export async function GET() {
  const now = Date.now();

  // Return cached value if still valid
  if (cachedCount !== null && now - cacheTimestamp < CACHE_TTL) {
    return NextResponse.json({ count: cachedCount, cached: true });
  }

  try {
    const count = await convex.query(api.waitlist.count);
    cachedCount = count;
    cacheTimestamp = now;
    return NextResponse.json({ count, cached: false });
  } catch (error) {
    // Return cached value on error, or 0 if no cache
    console.error("Failed to fetch waitlist count:", error);
    return NextResponse.json({ count: cachedCount ?? 0, cached: true, error: true });
  }
}
