'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "timed-themes" is now active!');

    let tt = new TimedThemes();
    tt.start();

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('timed-themes.switch-theme', () => {
        // The code you place here will be executed every time your command is executed

        tt.switch();
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

interface ITimes {
    dark: Array<Array<number>>;
    light: Array<Array<number>>;
}

class TimedThemes {
    start(): void {
        setTimeout(() => {
            this.switch();
            this.start();
        }, 60000);
    }

    switch() {
        let enabled = vscode.workspace.getConfiguration().get("timed-themes.enabled") as boolean;
        if (enabled) {
            let current = this.currentTheme();
            let proposed = this.proposedTheme();
            if (proposed !== undefined) {
                if (proposed !== current) {
                    this.setTheme(proposed);
                }
            }
        }
    }

    setTheme(name: string) {
        vscode.workspace.getConfiguration().update("workbench.colorTheme", name, true).then(() => {
            vscode.window.showInformationMessage('Changed theme to ' + vscode.workspace.getConfiguration().get("workbench.colorTheme"));
        });
    }

    currentTheme(): string {
        return vscode.workspace.getConfiguration().get("workbench.colorTheme", "Solarized Dark");
    }

    proposedTheme(): string | undefined {
        let darkTheme = vscode.workspace.getConfiguration().get("timed-themes.dark") as string;
        let lightTheme = vscode.workspace.getConfiguration().get("timed-themes.light") as string;
        let times = vscode.workspace.getConfiguration().get("timed-themes.times") as ITimes;
        let darkTimes = times['dark'];
        let lightTimes = times['light'];

        let now = new Date();
        let timeNum = now.getHours() * 100 + now.getMinutes();

        // console.log('Light ' + lightTheme + ' Dark ' + darkTheme);
        // console.log('Light ' + lightTimes + ' Dark ' + darkTimes);
        // console.log('Current time num ' + timeNum);

        for (let r of darkTimes) {
            if (this.inRange(r, timeNum)) {
                console.log(timeNum + ' in range of ' + r + '. Set the dark theme.');
                return darkTheme;
            }
        }

        for (let r of lightTimes) {
            if (this.inRange(r, timeNum)) {
                console.log(timeNum + ' in range of ' + r + '. Set the light theme.');
                return lightTheme;
            }
        }

        return undefined;
    }

    inRange(arr: number[], val: number): boolean {
        //open closed range
        if (val > arr[0] && val <= arr[1]) {
            return true;
        }
        return false;
    }

}