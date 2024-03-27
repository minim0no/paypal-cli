import { Command } from "commander";
import ASCII from "../utils/paypal_ascii";

const help = new Command("help").action(() => {
    console.log("\n");
    ASCII(); // DISPLAY PAYPAL ASCII

    console.log("\nusage: ppl [-V | --version] [-h | --help] <command>\n");

    console.log(
        "\nThese are common Ppl commands used to interact with PayPal: \n"
    );

    console.log("To get started, please login");
    console.log("\tlogin\tlogs into PayPal");
    console.log("get help:");
    console.log("\thelp\tdisplays a list of common commands and usage.");
});

module.exports = help;
