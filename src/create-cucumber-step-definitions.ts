import * as vscode from 'vscode';
import { TextEditor } from 'vscode';

export default class GenerateCucumberStepDefinitions {
    getActiveTextEditor = (): TextEditor => {
        return vscode.window.activeTextEditor;
    };

    generateStepFunction = ( lineText: string, functionType: string, lineKeyword: string ): string => {
        const parameters = this.getParameters( lineText );
        let functionParameters = '';
        const functiontypeParameter = functionType === 'arrow function' ? '(' : 'function(';
        parameters?.forEach( ( parameter: string, index: number ) => {
            lineText = lineText.replace( parameter, functionType === 'arrow function' ? '\'(.*)\'' : '{ string }' );
            const parameterWithType = `param${index}: string`;
            functionParameters = functionParameters ? `${functionParameters}, ${parameterWithType}` : parameterWithType;
        } );
        const initialStringDelimiter = functionType === 'arrow function' ? '/^' : '\'';
        const finalStringDelimiter = functionType === 'arrow function' ? '$/' : '\'';
        const arrowSymbol = functionType === 'arrow function' ? '=>' : '';

        return `${lineKeyword}(${initialStringDelimiter}${lineText}${finalStringDelimiter}, ${functiontypeParameter} ${functionParameters} ) ${arrowSymbol}{
		return 'pending';
} );\n`;
    };

    getParameters = ( lineText: string ): string[] | null => {
        return lineText.match( /(?<!^)'.+?'|''/gu );
    };

    getLineKeyword = ( lineText: string ): string => {
        if ( lineText.match( /(Given|When|Then).*/ ) ) {
            return lineText.replace( /^[\s]+/, '' ).replace( '\s', '' ).split( ' ' )[0];
        }
        const lineNumber = this.getActiveTextEditor()?.selection.anchor.line;
        for ( let documentLine = lineNumber - 1; documentLine <= lineNumber; documentLine-- ) {
            const lineText = this.getActiveTextEditor()?.document.lineAt( documentLine ).text;
            if ( lineText.match( /(Given|When|Then).*/ ) ) {
                return lineText.replace( /^[\s]+/, '' ).replace( '\s', '' ).split( ' ' )[0];
            }
        }
        return '';
    };

    getSelectedTextRows = (): string[] => {
        const selectedText = this.getActiveTextEditor()?.document.getText( this.getActiveTextEditor().selection );
        return selectedText?.split( '\n' );
    };

    getParsedRowText = ( rowText: string ): string => {
        if ( rowText.match( /(Given|When|Then|And).*/ ) ) {
            return rowText.replace( /^\s*(Given|When|Then|And)\s*/gu, '' );
        }
        return '';
    };

    generateCucumberStepDefinitions = async (): Promise<void> => {
        const workbenchConfig = vscode.workspace.getConfiguration( 'generate-cucumber-steps' );
        const functionType = workbenchConfig.get<string>( 'stepFunctionType' );
        const selectedTextRows = await this.getSelectedTextRows();
        let stepFunctions: string = '';
        for ( let index = 0; index < selectedTextRows.length; index++ ) {
            const lineText = selectedTextRows[index];
            const scenarioLineTextWithoutKeyword = this.getParsedRowText( lineText );
            const lineKeyword = await this.getLineKeyword( lineText );
            const functionValue = this.generateStepFunction( scenarioLineTextWithoutKeyword, functionType!, lineKeyword );
            if ( scenarioLineTextWithoutKeyword && !stepFunctions.includes( functionValue ) ) {
                stepFunctions = `${stepFunctions}\n${functionValue}`;
            }
        };

        var clipboard = vscode.env.clipboard;
        await clipboard.writeText( stepFunctions );
        vscode.window.showInformationMessage( 'Selected cucumber step functions copied to the clipboard!' );
    };
}
