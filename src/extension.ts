// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import GenerateCucumberStepDefinitions from './create-cucumber-step-definitions';

// const getFunction = ( lineText: string, functionType: string ): string => {
// 	const parameters = getParameters( lineText );
// 	let functionParameters = '';
// 	const functiontypeParameter = functionType === 'arrow function' ? '(' : 'function(';
// 	parameters?.forEach( ( parameter: string, index: number ) => {
// 		lineText = lineText.replace( parameter, functionType === 'arrow function' ? '\'(.*)\'' : '{ string }' );
// 		const parameterWithType = `param${index}: string`;
// 		functionParameters = functionParameters ? `${functionParameters}, ${parameterWithType}` : parameterWithType;
// 	} );

// 	return `\nGiven( /^${lineText}$/, function ( ${functionParameters} ) {
// 		return 'pending';
// } ); \n\r`;
// };

// const getParameters = ( lineText: string ): string[] | null => {
// 	return lineText.match( /(?<!^)'.+?'/gu );
// };

// const getLineKeyword = ( textEditor: TextEditor ): string => {
// 	const lineNumber = textEditor?.selection.anchor.line;
// 	for ( let documentLine = lineNumber - 1; documentLine <= lineNumber; documentLine-- ) {
// 		const lineText = textEditor?.document.lineAt( documentLine ).text;
// 		if ( lineText.match( /(Given|When|Then).*/ ) ) {
// 			return lineText.replace( /^[\s]+/, '' ).replace( '\s', '' ).split( ' ' )[0];
// 		}
// 	}
// 	return '';
// };

// const getSelectedTextRows = ( textEditor: TextEditor ): string[] => {
// 	const selectedText = textEditor?.document.getText( textEditor.selection );
// 	return selectedText?.split( '\n' );
// };

// const getParsedRowText = ( textEditor: TextEditor, rowText: string ): string => {
// 	if ( rowText.match( /(Given|When|Then|And).*/ ) ) {
// 		const lineKeyword = getLineKeyword( textEditor! );
// 		return rowText.replace( /[\s]+(Given|When|Then|And)/, lineKeyword );
// 	}
// 	return '';
// };

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate ( context: vscode.ExtensionContext ) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log( 'Congratulations, your extension "generate-cucumber-steps" is now active!' );

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand( 'generate-cucumber-steps.generate-and-copy-to-clipboard', async () => {
		// The code you place here will be executed every time your command is executed
		// var editor = <TextEditor>vscode.window.activeTextEditor;
		// const workbenchConfig = vscode.workspace.getConfiguration( 'generate-cucumber-steps' );
		// const functionType = workbenchConfig.get<string>( 'stepFunctionType' );
		// const selectedTextRows = getSelectedTextRows( editor );
		// let stepFunctions: string = '';
		// selectedTextRows?.forEach( lineText => {
		// 	const lineTextWithKeywordWithoutAnd = getParsedRowText( editor, lineText );
		// 	const functionValue = getFunction( lineTextWithKeywordWithoutAnd, functionType! );
		// 	if ( lineTextWithKeywordWithoutAnd ) {
		// 		stepFunctions = `${stepFunctions}\n${functionValue}`;
		// 	}
		// } );

		// var clipboard = vscode.env.clipboard;
		// await clipboard.writeText( stepFunctions );
		// vscode.window.showInformationMessage( 'Selected cucumber step functions copied to the clipboard!' );
		const generateCucumberStepDefinitions = new GenerateCucumberStepDefinitions();
		await generateCucumberStepDefinitions.generateCucumberStepDefinitions();
	} );

	context.subscriptions.push( disposable );
}

// this method is called when your extension is deactivated
export function deactivate () { }
