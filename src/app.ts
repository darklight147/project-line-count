#!/usr/bin/env node
import fs from 'fs';

let currentDirectory = (process.argv[2] && `${process.argv[2]}`) || __dirname;

const tobeIgnored = [...process.argv].slice(3, process.argv.length);
tobeIgnored.length &&
	console.log(
		'\n\n\nIgnoring the directories that include the keywords: ' +
			tobeIgnored.join(', ') +
			'\n\n\n\n'
	);

const readDirectory = (path: string) => {
	return fs.readdirSync(path).length ? fs.readdirSync(path) : [];
};

let sum = -1;

let linesSum = 0;

try {
	const countSubFolders = (path: string) => {
		const init = readDirectory(path);
		// console.log(init);
		init.forEach((fileorFolder) => {
			const currentPath = `${path}/${fileorFolder}`;
			const isDirec =
				fs.existsSync(currentPath) && fs.lstatSync(currentPath).isDirectory();
			if (
				!tobeIgnored ||
				!tobeIgnored.some((tb) => fileorFolder.includes(tb))
			) {
				if (isDirec) {
					countSubFolders(currentPath);
				} else {
					const tmpp = fs.readFileSync(currentPath).toString().split('\n')
						.length;
					console.log(currentPath, tmpp);
					linesSum += tmpp;
				}
			}
			sum++;
		});
		return sum;
	};

	countSubFolders(currentDirectory);
	console.log('\n\nTotal lines found ' + linesSum);
} catch (error) {
	console.log(error);
}
