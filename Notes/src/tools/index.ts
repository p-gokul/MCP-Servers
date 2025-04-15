import { z } from "zod";
import { NOTES_FILE, ensure_file } from "../utils/ensure_file.js";
import fs from "fs";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
// MCP server instance
export const server = new McpServer({
  name: "AI Sticky Notes",
  version: "1.0.0",
});

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

// Read Notes
server.tool(
  "read-notes",
  "MCP tool to read notes from a file",
  {},
  async ({}) => {
    ensure_file();
    const content = fs.readFileSync(NOTES_FILE, "utf-8").trim();

    // Check if the content is empty or not
    const responseText = content || "No notes yet";

    return {
      content: [
        {
          type: "text",
          text: responseText,
        },
      ],
    };
  }
);
