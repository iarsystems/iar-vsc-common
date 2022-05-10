import * as Vscode from "vscode";

/**
 * Logs messages to a VS Code output channel.
 * Before the instance has been initialized (see {@link IarLogger.init}),
 * logging calls are no-ops.
 */
export class IarLogger {
    private channel: Vscode.OutputChannel | undefined;

    /**
     * Readies this logger to receive messages.
     * @param name The name of the channel to show in the VS Code 'Output' panel
     */
    init(name: string) {
        if (!this.channel) {
            this.channel = Vscode.window.createOutputChannel(name);
        }
    }

    /**
     * Logs a debug message
     */
    debug(msg: string) {
        this.write("[Debug] " + msg);
    }
    /**
     * Logs a warning message
     */
    warn(msg: string) {
        this.write("[Warn] " + msg);
    }
    /**
     * Logs an error message
     */
    error(msg: string) {
        this.write("[Error] " + msg);
    }

    private write(msg: string) {
        const dateString = new Date().toLocaleString();
        msg = `[${dateString}]` + msg;
        this.channel?.appendLine(msg);
        if (process.env["log-to-console"]) {
            console.log(msg);
        }
    }
}

/**
 * The global logger instance.
 */
export const logger = new IarLogger();
