import * as vscode from 'vscode';
import GenerateCucumberStepDefinitions from '../../create-cucumber-step-definitions';
import * as chai from 'chai';
import * as assert from "assert";
import { TextDocument, ConfigurationTarget } from 'vscode';
chai.should();
import sinonChai from 'sinon-chai';
import sinon from 'sinon';

suite( 'Extension Test Suite', () => {
	var clipboard = vscode.env.clipboard;
	const generateCucumberFunctions = new GenerateCucumberStepDefinitions();

	test( 'the extension can create a function for a valid given step', async () => {
		// Given
		const stepText = "Given The user navigates to the page 'CheckboxesPage'";

		await sinon.stub( generateCucumberFunctions, 'getLineKeyword' ).resolves( Promise.resolve( 'Given' ) );
		await sinon.stub( generateCucumberFunctions, 'getSelectedTextRows' ).resolves( Promise.resolve( [stepText] ) );
		const workbenchConfig = vscode.workspace.getConfiguration( 'generate-cucumber-steps' );
		await workbenchConfig.update( 'stepFunctionType', 'arrow function', ConfigurationTarget.Global );

		// When
		await generateCucumberFunctions.generateCucumberStepDefinitions();

		// Then
		const clipboardContent = await clipboard.readText();
		const expectedClipboardContent = `
Given(/^The user navigates to the page '(.*)'$/, ( param0: string ) =>{
		return 'pending';
} );
`;
		assert.deepStrictEqual( clipboardContent, expectedClipboardContent );
		sinon.restore();
	} );

	test( 'the extension can create a function for a valid when step', async () => {
		// Given
		const stepText = "When The user types 'blouse' in the searchTextbox of the 'CheckboxesPage'";

		await sinon.stub( generateCucumberFunctions, 'getLineKeyword' ).resolves( Promise.resolve( 'When' ) );
		await sinon.stub( generateCucumberFunctions, 'getSelectedTextRows' ).resolves( Promise.resolve( [stepText] ) );
		const workbenchConfig = vscode.workspace.getConfiguration( 'generate-cucumber-steps' );
		await workbenchConfig.update( 'stepFunctionType', 'arrow function', ConfigurationTarget.Global );

		// When
		await generateCucumberFunctions.generateCucumberStepDefinitions();

		// Then
		const clipboardContent = await clipboard.readText();
		const expectedClipboardContent = `
When(/^The user types '(.*)' in the searchTextbox of the '(.*)'$/, ( param0: string, param1: string ) =>{
		return 'pending';
} );
`;
		assert.deepStrictEqual( clipboardContent, expectedClipboardContent );
		sinon.restore();
	} );

	test( 'the extension can create a function for a valid then step', async () => {
		// Given
		const stepText = "Then The application displays the title 'SEARCH BLOUSE' in the search results";

		await sinon.stub( generateCucumberFunctions, 'getLineKeyword' ).resolves( Promise.resolve( 'Then' ) );
		await sinon.stub( generateCucumberFunctions, 'getSelectedTextRows' ).resolves( Promise.resolve( [stepText] ) );
		const workbenchConfig = vscode.workspace.getConfiguration( 'generate-cucumber-steps' );
		await workbenchConfig.update( 'stepFunctionType', 'function expression', ConfigurationTarget.Global );

		// When
		await generateCucumberFunctions.generateCucumberStepDefinitions();

		// Then
		const clipboardContent = await clipboard.readText();
		const expectedClipboardContent = `
Then('The application displays the title { string } in the search results', function( param0: string ) {
		return 'pending';
} );
`;
		assert.deepStrictEqual( clipboardContent, expectedClipboardContent );
		sinon.restore();
	} );

	test( 'the extension can create a function for a valid and step', async () => {
		// Given
		const stepText = "And The user clicks on the 'magnifier glass' button";

		await sinon.stub( generateCucumberFunctions, 'getLineKeyword' ).resolves( Promise.resolve( 'When' ) );
		await sinon.stub( generateCucumberFunctions, 'getSelectedTextRows' ).resolves( Promise.resolve( [stepText] ) );
		const workbenchConfig = vscode.workspace.getConfiguration( 'generate-cucumber-steps' );

		await workbenchConfig.update( 'stepFunctionType', 'function expression', ConfigurationTarget.Global );

		// When
		await generateCucumberFunctions.generateCucumberStepDefinitions();

		// Then
		const clipboardContent = await clipboard.readText();
		const expectedClipboardContent = `
When('The user clicks on the { string } button', function( param0: string ) {
		return 'pending';
} );
`;
		assert.deepStrictEqual( clipboardContent, expectedClipboardContent );
		sinon.restore();
	} );

	test( 'the extension does not create a function for an invalid step', async () => {
		// Given
		const stepText = `iven The user navigates to the page 'CheckboxesPage'
		iven The user navigates to the page 'CheckboxesPage'
		`;

		await sinon.stub( generateCucumberFunctions, 'getLineKeyword' ).resolves( Promise.resolve( '' ) );
		await sinon.stub( generateCucumberFunctions, 'getSelectedTextRows' ).resolves( Promise.resolve( [stepText] ) );
		const workbenchConfig = vscode.workspace.getConfiguration( 'generate-cucumber-steps' );

		await workbenchConfig.update( 'stepFunctionType', 'function expression', ConfigurationTarget.Global );

		// When
		await generateCucumberFunctions.generateCucumberStepDefinitions();

		// Then
		const clipboardContent = await clipboard.readText();
		const expectedClipboardContent = '';
		assert.deepStrictEqual( clipboardContent, expectedClipboardContent );
		sinon.restore();
	} );
	test( 'the extension does not create repeated steps', async () => {
		// Given
		const stepText = [ "Given The user navigates to the page 'CheckboxesPage'", "Given The user navigates to the page 'CheckboxesPage'"];

		await sinon.stub( generateCucumberFunctions, 'getLineKeyword' ).resolves( Promise.resolve( 'Given' ) );
		await sinon.stub( generateCucumberFunctions, 'getSelectedTextRows' ).resolves( Promise.resolve( stepText ) );
		const workbenchConfig = vscode.workspace.getConfiguration( 'generate-cucumber-steps' );

		await workbenchConfig.update( 'stepFunctionType', 'arrow function', ConfigurationTarget.Global );

		// When
		await generateCucumberFunctions.generateCucumberStepDefinitions();

		// Then
		const clipboardContent = await clipboard.readText();
		const expectedClipboardContent = `
Given(/^The user navigates to the page '(.*)'$/, ( param0: string ) =>{
		return 'pending';
} );
`;
		assert.deepStrictEqual( clipboardContent, expectedClipboardContent );
		sinon.restore();
	} );
} );
