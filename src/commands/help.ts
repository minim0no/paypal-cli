import { Command } from "commander";
import ASCII from "../utils/paypal_ascii";
import chalk from "chalk";

const help = new Command("help").action(() => {
    const darkBlue = chalk.hex("#012169");
    const lightBlue = chalk.hex("#009cde");
    console.log("\n");
    console.log(ASCII());
    console.log("\nusage: ppl [-V | --version] <command> [-h | --help] \n");

    console.log(
        "\nThese are common Ppl commands used to interact with PayPal: "
    );

    console.log("\n");
    console.log(darkBlue("To get started login:"));
    console.log("\tlogin\tlog into PayPal");

    console.log("\n");
    console.log(lightBlue("For any help, execute:"));
    console.log("\thelp\tdisplay a list of common commands and usage.");
});

module.exports = help;
