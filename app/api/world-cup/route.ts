import { NextResponse } from "next/server"

export async function GET() {
  const apiKey = process.env.FOOTBALL_DATA_API_KEY || process.env.NEXT_PUBLIC_FOOTBALL_DATA_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: "No API key configured" }, { status: 400 })
  }

  try {
    const res = await fetch("https://api.football-data.org/v4/competitions/WC/matches", {
      headers: {
        "X-Auth-Token": apiKey
      },
      next: { revalidate: 60 }
    })
    if (!res.ok) {
      throw new Error(`API responded with status ${res.status}`)
    }
    const data = await res.json()
    return NextResponse.json(data)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
