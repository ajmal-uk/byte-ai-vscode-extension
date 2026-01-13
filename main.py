import asyncio
import websockets
import json
import uuid
import ssl
import sys
from rich.console import Console
from rich.panel import Panel
from rich.prompt import Prompt
from rich.markdown import Markdown
from rich.padding import Padding
from rich.live import Live
from rich.style import Style

class ByteAIClient:
    def __init__(self):
        self.console = Console()
        self.chat_id = str(uuid.uuid4())
        self.ws_url = "wss://backend.buildpicoapps.com/api/chatbot/chat"
        self.app_id = "plan-organization"
        self.system_prompt = """You are Byte AI, an advanced, efficient, and helpful AI assistant created by Ajmal U K.

CORE IDENTITY:
- Name: Byte AI
- Developer: uthalkkan
- CEO: Ajmal U K
- Founder: Ajmal UK (from India, Kerala, Kannur).
- Personality: Professional, intelligent, concise, and friendly.
- Tone: Natural, conversational, and direct.

Ask the user's name first, then address them by name."""
        
        self.ssl_context = ssl.create_default_context()
        self.ssl_context.check_hostname = False
        self.ssl_context.verify_mode = ssl.CERT_NONE
        
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Origin": "null" 
        }

    def print_welcome(self):
        self.console.clear()
        self.console.print(Panel.fit(
            "[bold cyan]Byte AI[/bold cyan]\n[italic]Advanced Assistant by Ajmal U K[/italic]", 
            border_style="cyan"
        ))
        self.console.print(Padding(
            Panel(
                "Hello! I am Byte AI. May I know your name so I can address you properly?", 
                title="[bold cyan]Byte AI[/bold cyan]", 
                border_style="cyan", 
                expand=False
            ), (1, 0)
        ))

    async def stream_response(self, user_input):
        payload = {
            "chatId": self.chat_id,
            "appId": self.app_id,
            "systemPrompt": self.system_prompt,
            "message": user_input
        }

        try:
            async with websockets.connect(self.ws_url, ssl=self.ssl_context, additional_headers=self.headers) as websocket:
                await websocket.send(json.dumps(payload))
                
                full_response = ""
                async for message in websocket:
                    full_response += message
                    yield full_response
                    
        except websockets.exceptions.ConnectionClosed:
            raise ConnectionError("Connection closed by server")
        except Exception as e:
            raise e

    async def run(self):
        self.print_welcome()

        while True:
            try:
                user_input = Prompt.ask("[bold white]You[/bold white]")
                
                if user_input.lower() in ('quit', 'exit'):
                    self.console.print("\n[bold cyan]Goodbye![/bold cyan]")
                    break
                
                if not user_input.strip():
                    continue

                # Streaming Response UI
                with Live(
                    Padding(Panel("", title="[bold cyan]Byte AI[/bold cyan]", border_style="cyan", expand=False), (1, 0)),
                    console=self.console,
                    refresh_per_second=10
                ) as live:
                    response_content = ""
                    try:
                        async for chunk in self.stream_response(user_input):
                            response_content = chunk
                            live.update(
                                Padding(
                                    Panel(
                                        Markdown(response_content), 
                                        title="[bold cyan]Byte AI[/bold cyan]", 
                                        border_style="cyan", 
                                        expand=False
                                    ), (1, 0)
                                )
                            )
                    except ConnectionError:
                        self.console.print("[bold red]Connection lost. Retrying...[/bold red]")
                        # Logic to retry could go here, for now just notify
                    except Exception as e:
                        live.stop()
                        self.console.print(f"[bold red]An error occurred:[/bold red] {e}")

            except KeyboardInterrupt:
                self.console.print("\n[bold cyan]Goodbye![/bold cyan]")
                break
            except Exception as e:
                self.console.print(f"[bold red]Unexpected error:[/bold red] {e}")

if __name__ == "__main__":
    client = ByteAIClient()
    try:
        asyncio.run(client.run())
    except KeyboardInterrupt:
        print("\nGoodbye!")
