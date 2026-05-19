export default async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({
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
    });
  }

  if (req.method === 'POST') {
    try {
      const body = req.body || {};
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

      return res.status(200).json({
        jsonrpc: "2.0",
        id: body.id,
        result: result
      });
    } catch (error) {
      return res.status(400).json({ 
        jsonrpc: "2.0",
        id: null,
        error: { code: -32700, message: "Parse error" } 
      });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
