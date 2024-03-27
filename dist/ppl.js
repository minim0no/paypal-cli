#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const program = new commander_1.Command();
const helpCommand = require("./commands/help");
const loginCommand = require("./commands/login");
program
    .name("ppl")
    .version("0.0.1")
    .description("An application that interacts with the PayPal REST API");
program.addCommand(helpCommand);
program.addCommand(loginCommand);
program.parse(process.argv);
//# sourceMappingURL=ppl.js.map