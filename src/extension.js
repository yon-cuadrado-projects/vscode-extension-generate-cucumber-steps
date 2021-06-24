"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require("vscode");
var create_cucumber_step_definitions_1 = require("./create-cucumber-step-definitions");
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
function activate(context) {
    var _this = this;
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "generate-cucumber-steps" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    var disposable = vscode.commands.registerCommand('generate-cucumber-steps.generate-and-copy-to-clipboard', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
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
                return [4 /*yield*/, create_cucumber_step_definitions_1.generateCucumberStepDefinitions()];
                case 1:
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
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
