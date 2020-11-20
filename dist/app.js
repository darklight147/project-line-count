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
var sum = -1;
var linesSum = 0;
try {
    var countSubFolders_1 = function (path) {
        var init = readDirectory(path);
        // console.log(init);
        init.forEach(function (fileorFolder) {
            var currentPath = path + "/" + fileorFolder;
            var isDirec = fs_1.default.existsSync(currentPath) && fs_1.default.lstatSync(currentPath).isDirectory();
            if (!tobeIgnored ||
                !tobeIgnored.some(function (tb) { return fileorFolder.includes(tb); })) {
                if (isDirec) {
                    // currentDirectory = currentPath;
                    // console.log(currentPath);
                    countSubFolders_1(currentPath);
                }
                else {
                    var tmpp = fs_1.default.readFileSync(currentPath).toString().split('\n')
                        .length;
                    console.log(currentPath, tmpp);
                    linesSum += tmpp;
                }
            }
            sum++;
        });
        return sum;
    };
    countSubFolders_1(currentDirectory);
    console.log('\n\nTotal lines found ' + linesSum);
}
catch (error) {
    console.log(error);
}
