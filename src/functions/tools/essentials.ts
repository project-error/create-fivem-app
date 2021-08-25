import fs from 'fs';
import ora from 'ora';
import { sprintf } from 'sprintf-js';
import { supportedLanguage } from '../../types/index';

export const createEssentials = async (
	resourcePath: string,
	resourceName: string,
	language: supportedLanguage,
	uiFramework: string,
) => {
	const spinner = ora('Loading universe!').start();
	try {
		spinner.text = `Creating ${resourceName} resource!`;
		// Creating the folder
		fs.mkdirSync(resourcePath);
		spinner.succeed('Successfully created resource path!');
	} catch (error) {
		spinner.fail('Failed to create resource path!');
		return;
	}

	spinner.text = 'Creating fxmanifest!';
	try {
		if (uiFramework !== 'none') {
			const { fxmanifest } = await import(`../../stubs/${language}/fxmanifest_react.stub`);
			fs.writeFileSync(`${resourcePath}/fxmanifest.lua`, sprintf(fxmanifest, resourceName));
		} else {
			const { fxmanifest } = await import(`../../stubs/${language}/fxmanifest.stub`);
			fs.writeFileSync(`${resourcePath}/fxmanifest.lua`, sprintf(fxmanifest, resourceName));
		}

		// .gitignore
		const { gitignore } = await import('../../stubs/misc/git');
		fs.writeFileSync(`${resourcePath}/.gitignore`, gitignore)

		spinner.succeed('Successfully created fxmanifest.lua');
	} catch (error) {
		spinner.fail('Failed to create fxmanifest!');
		return;
	}

	spinner.text = 'Creating client and server files!';
	try {
		if (uiFramework !== 'none' && language !== 'Lua') {
			fs.mkdirSync(`${resourcePath}/resources`);

			fs.mkdirSync(`${resourcePath}/resources/client`);
			fs.mkdirSync(`${resourcePath}/resources/server`);
		} else {
			fs.mkdirSync(`${resourcePath}/client`);
			fs.mkdirSync(`${resourcePath}/server`);
		}

		if (uiFramework !== 'none') fs.mkdirSync(`${resourcePath}/ui`);

		const { createFiles } = await import(`./creators/${language}`);

		createFiles(resourcePath, uiFramework);

		spinner.succeed('Successfully created essential files!');
	} catch (error) {
		spinner.fail('Failed to create essential files!');
		return;
	}
};
