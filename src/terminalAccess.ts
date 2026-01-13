import * as vscode from 'vscode';

export class TerminalManager {
    private terminal: vscode.Terminal | undefined;

    constructor() { }

    private getTerminal(): vscode.Terminal {
        if (!this.terminal || this.terminal.exitStatus !== undefined) {
            this.terminal = vscode.window.createTerminal("Byte AI Terminal");
        }
        return this.terminal;
    }

    public async processAndExecute(text: string): Promise<boolean> {
        const regex = /\$\$ EXEC: (.*?) \$\$/g;
        let match;
        let executed = false;

        // Using a while loop to handle multiple commands if present (though prompt asks for one likely)
        while ((match = regex.exec(text)) !== null) {
            const command = match[1].trim();
            if (command) {
                await this.askAndExecute(command);
                executed = true;
            }
        }
        return executed;
    }

    private async askAndExecute(command: string) {
        const selection = await vscode.window.showInformationMessage(
            `Byte AI wants to execute: "${command}"`,
            "Allow",
            "Deny"
        );

        if (selection === "Allow") {
            const terminal = this.getTerminal();
            terminal.show();
            terminal.sendText(command);
        } else {
            vscode.window.showWarningMessage(`Command "${command}" blocked by user.`);
        }
    }
}
