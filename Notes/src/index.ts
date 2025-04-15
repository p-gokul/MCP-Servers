import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the file exists
const ensure_file = () => {
  if (!fs.existsSync(NOTES_FILE)) {
    fs.writeFileSync(NOTES_FILE, "");
  }
};

// MCP server instance
const server = new McpServer({
  name: "AI Sticky Notes",
  version: "1.0.0",
});

const NOTES_FILE = path.join(__dirname, "notes.txt");

// Write Notes
server.tool(
  "write-notes",
  "MCP tool to write notes to a file",
  {
    message: z.string(),
  },
  async ({ message }) => {
    ensure_file();
    fs.appendFileSync(NOTES_FILE, message + "\n");
    return {
      content: [
        {
          type: "text",
          text: "Notes Saved.",
        },
      ],
    };
  }
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
