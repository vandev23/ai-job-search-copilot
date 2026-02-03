import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Llama a tu backend FastAPI
    const res = await fetch("http://127.0.0.1:8000/compare", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error calling backend:", error);
    return NextResponse.json({ error: "Failed to call backend" }, { status: 500 });
  }
}
