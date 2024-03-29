#!/usr/bin/env node

import { Command } from "commander";
import ASCII from "./utils/paypal_ascii";

const program = new Command();

const helpCommand = require("./commands/help");
const loginCommand = require("./commands/login");
const payoutCommand = require("./commands/payout");

program
    .name("ppl")
    .version("0.0.1")
    .description("An application that interacts with the PayPal REST API");

program.addHelpText("before", `\n ${ASCII()}`);

program.addCommand(helpCommand);
program.addCommand(loginCommand);
program.addCommand(payoutCommand);

program.parse(process.argv);
