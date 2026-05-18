import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    protocol: "MCP",
    version: "1.0.0",
    name: "CastSmith Forge MCP Endpoint",
    status: "active",
    description: "Active MCP server for CastSmith Forge Orchestrator Agent",
    capabilities: ["casting-mechanics", "forging-operations", "craft-automation"],
    tools: [
      "get_race_status",
      "start_race",
      "get_leaderboard",
      "optimize_speed",
      "get_track_info"
    ],
    timestamp: new Date().toISOString()
  }, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    }
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // MCP tool logic processing
    
    return NextResponse.json({
      status: "success",
      message: "MCP command received",
      agent: "CastSmith Forge Orchestrator",
      receivedAt: new Date().toISOString(),
      payload: body
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      }
    });
  } catch (error) {
    return NextResponse.json({ error: "Invalid MCP request" }, { status: 400 });
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
