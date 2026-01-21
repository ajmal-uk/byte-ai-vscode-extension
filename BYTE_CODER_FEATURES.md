# Byte Coder AI Agent - Features & Working

## Overview
**Byte Coder AI Agent** is an agentic AI coding assistant for VS Code featuring a multi-agent architecture. It goes beyond simple text completion by understanding your entire codebase through specialized sub-agents. It offers a premium glassmorphism UI, smart file discovery, and AST-aware code extraction.

## Core Architecture: Multi-Agent System
The extension relies on four specialized sub-agents to process user requests effectively:

1.  **IntentAnalyzer** (`src/agents/IntentAnalyzer.ts`)
    *   **Role**: The "Brain" of the operation.
    *   **Function**: Analyzes user queries to determine intent (e.g., Fix, Explain, Refactor).
    *   **Capabilities**:
        *   Extracts keywords and code symbols.
        *   Identifies mentioned files.
        *   Determines query complexity and type.
        *   Expands keywords semantically (e.g., "login" -> "auth", "session").

2.  **FileFinderAgent** (`src/agents/FileFinderAgent.ts`)
    *   **Role**: The "Navigator".
    *   **Function**: Locates relevant files within the project based on the intent and keywords.
    *   **Capabilities**: Smart discovery of files, filtering by relevance.

3.  **CodeExtractorAgent** (`src/agents/CodeExtractorAgent.ts`)
    *   **Role**: The "Miner".
    *   **Function**: Extracts meaningful code chunks from the files found.
    *   **Capabilities**: AST-aware extraction, ensuring that complete functions/classes are retrieved rather than just random lines.

4.  **RelevanceScorerAgent** (`src/agents/RelevanceScorerAgent.ts`)
    *   **Role**: The "Judge".
    *   **Function**: Ranks the extracted code chunks and files to ensure only the most relevant context is sent to the AI.

## Key Features

### 1. Smart Chat Interface
*   **Glassmorphism UI**: A modern, visually appealing interface.
*   **Rich Interaction**: Supports Markdown rendering, code highlighting, and interactive elements.
*   **Session Management**: Save, load, rename, and delete chat sessions.
*   **File/Folder Tagging**: Clickable tags for files and folders, with support for direct navigation.

### 2. Slash Commands
Quick actions to perform common tasks:
*   `/explain`: Explain the selected code or context.
*   `/fix`: Fix bugs or errors in the code.
*   `/refactor`: Improve code structure and quality.
*   `/test`: Generate unit tests.
*   `/doc`: Generate documentation.
*   `/optimize`: Suggest performance improvements.
*   `/security`: Check for security vulnerabilities.
*   `/review`: Review code for best practices.

### 3. Context Awareness
*   **@ File Mentions**: Reference specific files in your chat to give the AI context.
*   **Active Editor Integration**: The AI is aware of the code you are currently working on.
*   **Clipboard & Insert**: Easily copy code or insert it directly into your editor.

## Extension Commands (VS Code API)
The extension registers the following commands in VS Code:
*   `byteAI.chatView.focus`: Open/Focus the chat view.
*   `byteAI.clearChat`: Clear the current chat history.
*   `byteAI.quickAsk`: Ask a question about the selected code via an input box.
*   `byteAI.explainCode`: Trigger explanation for selected code.
*   `byteAI.fixCode`: Trigger fix for selected code.
*   `byteAI.refactorCode`: Trigger refactoring for selected code.
*   `byteAI.generateTest`: Generate tests.
*   `byteAI.generateDocs`: Generate documentation.
*   `byteAI.optimizeCode`: Optimize selected code.
*   `byteAI.securityCheck`: Run security check.
*   `byteAI.reviewCode`: Review code.

## How It Works (Workflow)
1.  **User Input**: User types a query in the chat or uses a slash command/context menu action.
2.  **Intent Analysis**: `IntentAnalyzer` parses the input to understand what the user wants and identifies key terms/files.
3.  **Context Gathering**:
    *   `FileFinderAgent` searches for relevant files.
    *   `CodeExtractorAgent` reads and extracts code structures.
    *   `RelevanceScorerAgent` ranks the information.
4.  **AI Processing**: The constructed context and user query are sent to the AI model via `ByteAIClient`.
5.  **Response**: The AI's response is streamed back to the `ChatViewProvider` and displayed to the user.
6.  **Action**: User can copy code, insert it into the editor, or click file links to navigate.
