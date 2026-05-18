import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    name: "CastSmith Forge Orchestrator",
    status: "active",
    wallet: "0x29536D0bc1004ab274c4F0F59734Ad74D4559b7B",
    platform: "CastSmith Forge",
    version: "1.0.0"
  }, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    return NextResponse.json({
      status: "success",
      message: "Agent instruction received",
      receivedAt: new Date().toISOString(),
      instruction: body
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
