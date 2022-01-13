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

let sum = 0;
let files = 0;

let linesSum = 0;

let eachLine: number[] = [];

try {
	const countSubFolders = (path: string) => {
		const init = readDirectory(path);
		// console.log(init);
		init.forEach((fileorFolder) => {
			const currentPath = path.endsWith('/')
				? `${path}${fileorFolder}`
				: `${path}/${fileorFolder}`;
			const isDirec =
				fs.existsSync(currentPath) && fs.lstatSync(currentPath).isDirectory();
			if (
				!tobeIgnored ||
				!tobeIgnored.some((tb) => fileorFolder.includes(tb))
			) {
				if (isDirec) {
					countSubFolders(currentPath);
					sum++;
				} else {
					const tmpp = fs
						.readFileSync(currentPath)
						.toString()
						.split('\n').length;
					console.log(currentPath, tmpp);
					eachLine.push(tmpp);
					linesSum += tmpp;
					files++;
				}
			}
		});
		return sum;
	};

	countSubFolders(currentDirectory);
	console.log(`\n\n\n${sum} Folders, ${files} Files`);
	console.log('\n\nTotal lines found ' + linesSum);
	console.log('\n\nMost lines found in one file ' + Math.max(...eachLine));
} catch (error) {
	console.log(error);
}
