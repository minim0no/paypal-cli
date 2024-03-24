#!/usr/bin/env node

import { Command } from "commander";

const program = new Command();

const helpCommand = require("./commands/help");

program
    .name("ppl")
    .version("0.0.1")
    .description("An application that interacts with the PayPal REST API");

program.addCommand(helpCommand);

program.parse(process.argv);
