#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_1 = require("./commands/create");
const figlet_1 = __importDefault(require("figlet"));
const chalk_1 = __importDefault(require("chalk"));
const inquirer_1 = __importDefault(require("inquirer"));
const ui = new inquirer_1.default.ui.BottomBar();
console.log(chalk_1.default.red(figlet_1.default.textSync('Project Error', { font: 'Standard', horizontalLayout: 'fitted' })));
// Instantly Execs create command for testing
(0, create_1.createCommand)().then(() => {
    console.log('Complete');
});
//# sourceMappingURL=index.js.map