# Community Wiki Tool

## Description
The Community Wiki Tool is an innovative system designed to transform diverse community-generated content into a structured, explorable knowledge base. This tool processes data from various sources, uses AutoGraph to generate a comprehensive knowledge graph, and provides multiple ways for community members to interact with and benefit from the collective knowledge.

![System Overview](overview.png)

## View Graph Locally
1. Install Obsidian from the [official website](https://obsidian.md/).
2. Clone this repository locally using:
   ```sh
   git clone <repository-url>
   ```
3. Open the `./documents` folder in Obsidian.
4. [Optional] Make a pull request with your desired changes.

## Installation
```
git submodule init
git submodule update
cd quartz
bun i
```

## Usage
```
bun cli help
bun cli generate
bun cli serve
bun cli publish
```

## Key Components

### Input Sources
- Community Event Transcriptions
- Community Telegram Chat
- Social Layer Calendar Data

### Processing Pipeline
1. **Content Uploader/Processor**: Aggregates and preprocesses data from all input sources.
2. **AutoGraph**: Employs TinyCloud's [AutoGraph](https://gbafa.com/posts/autograph/) to create a structured knowledge graph from the processed content.
3. **Community Knowledge Graph**: The central repository of organized, interconnected community knowledge.

### Output Interfaces
- **Community Wiki/Explorer**: An interactive interface for exploring the knowledge graph.
- **Community Recurring Digest**: Regular summaries (daily/weekly/etc.) of new and important information.

## Key Features
- Processes diverse types of community-generated content
- Uses AutoGraph to infer structures and connections between concepts
- Organizes information into an explorable knowledge graph
- Provides multiple ways to access and benefit from collective knowledge
- Generates regular digests to keep community members informed
- Gating content is possible

## Technologies Used
- AutoGraph: An AI-powered knowledge graph generator that uses an LLM (Large Language Model) pipeline for data sorting and structuring

## How It Works
1. **Input**: The tool ingests data from community event transcriptions, Telegram chats, and social calendar events.
2. **Processing**: The Content Uploader/Processor aggregates and prepares the data for analysis.
3. **AutoGraph Knowledge Graph Generation**: AutoGraph creates a structured representation of the community's collective knowledge.
4. **Output**: The system provides:
   - A comprehensive Community Knowledge Graph
   - An interactive Wiki/Explorer interface for navigation
   - Regular digests summarizing key information