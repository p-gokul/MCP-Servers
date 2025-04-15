# AI Sticky Notes

A Model Context Protocol (MCP) server that provides tools for managing notes.

## Features

- **MCP Tools**:

  - `write-notes`: Save notes to a file
  - `read-notes`: Retrieve all saved notes from a file

- **MCP Resources**:

  - `latest-notes`: Access the most recent note

- **MCP Prompts**:
  - `summarize-note`: Generate a summary of all notes

# Usage with Claude Desktop

### Docker

###### Build

```bash
docker build -t ai-sticky-notes .
```

###### Add this to claude_desktop_config.json

```bash
{
  "mcpServers": {
    "Sticky Notes Server": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "ai-sticky-notes"]
    }
  }
}
```

##### NPX

1. Install the libraries

```bash
npm run install
```

2. Build the server

```bash
npm run build
```

3. Add this to claude_desktop_config.json<br>
   Note: For Windows use path : `absolute_path\\dist\\index.js`

```bash
{
  "mcpServers": {
    "Sticky Notes Server": {
      "command": "node",
      "args": [
        "absolute_path/dist/index.js"
      ]
    }
  }
}
```

Or Inspect Locally

```bash
npm run inspect
```
