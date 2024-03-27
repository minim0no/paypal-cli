import { Command } from "commander";
import ASCII from "../utils/paypal_ascii";

const help = new Command("help").action(() => {
    console.log("\n");
    console.log(ASCII());
    console.log("\nusage: ppl [-V | --version] [-h | --help] <command>\n");

    console.log(
        "\nThese are common Ppl commands used to interact with PayPal: "
    );

    console.log("\n");
    console.log("To get started login:");
    console.log("\tlogin\tlog into PayPal");

    console.log("\n");
    console.log("For any help, execute:");
    console.log("\thelp\tdisplay a list of common commands and usage.");
});

module.exports = help;
