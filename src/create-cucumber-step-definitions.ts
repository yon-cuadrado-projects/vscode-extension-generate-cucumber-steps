import * as vscode from 'vscode';
import { TextEditor } from 'vscode';

export default class GenerateCucumberStepDefinitions {
    getActiveTextEditor = (): TextEditor => {
        return vscode.window.activeTextEditor;
    };

    getFunction = (lineText: string, functionType: string, lineKeyword: string): string => {
        console.log(`lineText: ${lineText}`);
        const parameters = this.getParameters(lineText);
        let functionParameters = '';
        const functiontypeParameter = functionType === 'arrow function' ? '(' : 'function(';
        parameters?.forEach((parameter: string, index: number) => {
            lineText = lineText.replace(parameter, functionType === 'arrow function' ? '\'(.*)\'' : '{ string }');
            const parameterWithType = `param${index}: string`;
            functionParameters = functionParameters ? `${functionParameters}, ${parameterWithType}` : parameterWithType;
        });
        const initialStringDelimiter = functionType === 'arrow function' ? '/^' : '\'';
        const finalStringDelimiter = functionType === 'arrow function' ? '$/' : '\'';

        return `${lineKeyword}(${initialStringDelimiter}${lineText}${finalStringDelimiter}, ${functiontypeParameter} ${functionParameters} ) {
		return 'pending';
} );\n`;
    };

    getParameters = (lineText: string): string[] | null => {
        return lineText.match(/(?<!^)'.+?'/gu);
    };

    getLineKeyword = (lineText: string): string => {
        if (lineText.match(/(Given|When|Then).*/)) {
            return lineText.replace(/^[\s]+/, '').replace('\s', '').split(' ')[0];
        }
        const lineNumber = this.getActiveTextEditor()?.selection.anchor.line;
        for (let documentLine = lineNumber - 1; documentLine <= lineNumber; documentLine--) {
            const lineText = this.getActiveTextEditor()?.document.lineAt(documentLine).text;
            if (lineText.match(/(Given|When|Then).*/)) {
                return lineText.replace(/^[\s]+/, '').replace('\s', '').split(' ')[0];
            }
        }
        return '';
    };

    getSelectedTextRows = (): string[] => {
        const selectedText = this.getActiveTextEditor()?.document.getText(this.getActiveTextEditor().selection);
        return selectedText?.split('\n');
    };

    getParsedRowText = (rowText: string): string => {
        if (rowText.match(/(Given|When|Then|And).*/)) {
            return rowText.replace(/^\s*(Given|When|Then|And)\s*/gu, '');
        }
        return '';
    };

    generateCucumberStepDefinitions = async (): Promise<void> => {
        const workbenchConfig = vscode.workspace.getConfiguration('generate-cucumber-steps');
        const functionType = workbenchConfig.get<string>('stepFunctionType');
        const selectedTextRows = await this.getSelectedTextRows();
        console.log(`selected rows: ${selectedTextRows}`);
        let stepFunctions: string = '';
        // selectedTextRows?.forEach(lineText => {
        for (let index = 0; index < selectedTextRows.length; index++){
            const lineText = selectedTextRows[index];
            const lineTextWithoutKeyword = this.getParsedRowText(lineText);
            const lineKeyword = await this.getLineKeyword(lineText);
            const functionValue = this.getFunction(lineTextWithoutKeyword, functionType!, lineKeyword);
            if (lineTextWithoutKeyword) {
                stepFunctions = `${stepFunctions}\n${functionValue}`;
            }
        };

        var clipboard = vscode.env.clipboard;
        await clipboard.writeText(stepFunctions);
        console.log(`steps: ${stepFunctions}`);
        vscode.window.showInformationMessage('Selected cucumber step functions copied to the clipboard!');
    };
}
