import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

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
    
    // Simulate core MCP operations
    const method = body.method || "unknown";
    
    let result = {};
    if (method === "tools/list") {
      result = {
        tools: [
          { name: "get_race_status", description: "Get current race status" },
          { name: "start_race", description: "Start the race" },
          { name: "get_leaderboard", description: "Get the best times" },
          { name: "optimize_speed", description: "Optimize vehicle speed" },
          { name: "get_track_info", description: "Get info about the track" }
        ]
      };
    } else if (method === "tools/call") {
      result = {
        content: [
          { type: "text", text: `Tool ${body.params?.name} executed successfully.` }
        ]
      };
    } else if (method === "prompts/list") {
      result = { prompts: [] };
    } else if (method === "resources/list") {
      result = { resources: [] };
    } else if (method === "initialize") {
      result = {
        protocolVersion: "1.0",
        capabilities: {},
        serverInfo: { name: "CastSmith Forge MCP", version: "1.0.0" }
      };
    }

    return NextResponse.json({
      jsonrpc: "2.0",
      id: body.id,
      result: result
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      }
    });

  } catch (error) {
    return NextResponse.json({ 
      jsonrpc: "2.0",
      id: null,
      error: { code: -32700, message: "Parse error" } 
    }, { status: 400, headers: { 'Access-Control-Allow-Origin': '*' } });
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
