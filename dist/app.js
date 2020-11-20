#!/usr/bin/env node
"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var currentDirectory = (process.argv[2] && "" + process.argv[2]) || __dirname;
var tobeIgnored = __spreadArrays(process.argv).slice(3, process.argv.length);
tobeIgnored.length &&
    console.log('\n\n\nIgnoring the directories that include the keywords: ' +
        tobeIgnored.join(', ') +
        '\n\n\n\n');
var readDirectory = function (path) {
    return fs_1.default.readdirSync(path).length ? fs_1.default.readdirSync(path) : [];
};
var sum = 0;
var files = 0;
var linesSum = 0;
var eachLine = [];
try {
    var countSubFolders_1 = function (path) {
        var init = readDirectory(path);
        // console.log(init);
        init.forEach(function (fileorFolder) {
            var currentPath = path.endsWith('/')
                ? "" + path + fileorFolder
                : path + "/" + fileorFolder;
            var isDirec = fs_1.default.existsSync(currentPath) && fs_1.default.lstatSync(currentPath).isDirectory();
            if (!tobeIgnored ||
                !tobeIgnored.some(function (tb) { return fileorFolder.includes(tb); })) {
                if (isDirec) {
                    countSubFolders_1(currentPath);
                    sum++;
                }
                else {
                    // const tmpp = fs.readFileSync(currentPath).toString().split('\n')
                    // 	.length;
                    // console.log(currentPath, tmpp);
                    // eachLine.push(tmpp);
                    // linesSum += tmpp;
                    console.log(currentPath);
                    files++;
                }
            }
        });
        return sum;
    };
    countSubFolders_1(currentDirectory);
    console.log("\n\n\n" + sum + " Folders, " + files + " Files");
    console.log('\n\nTotal lines found ' + linesSum);
    console.log('\n\nMost lines found in one file ' + Math.max.apply(Math, eachLine));
}
catch (error) {
    console.log(error);
}
