#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const paypal_ascii_1 = __importDefault(require("./utils/paypal_ascii"));
const program = new commander_1.Command();
const helpCommand = require("./commands/help");
const loginCommand = require("./commands/login");
const payoutCommand = require("./commands/payout");
const historyCommand = require("./commands/history");
const detailsCommand = require("./commands/details");
program
    .name("ppl")
    .version("0.0.1")
    .description("An application that interacts with the PayPal REST API");
program.addHelpText("before", `\n ${(0, paypal_ascii_1.default)()}`);
program.addCommand(helpCommand);
program.addCommand(loginCommand);
program.addCommand(payoutCommand);
program.addCommand(historyCommand);
program.addCommand(detailsCommand);
program.parse(process.argv);
//# sourceMappingURL=ppl.js.map