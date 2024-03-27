import chalk from "chalk";

const pay = chalk.hex("#012169");
const pal = chalk.hex("#009cde");

export default function ASCII() {
    let asciiArt = "";
    asciiArt += pay(",------.                  ") + pal(",------.         ,--.") + "     ,-----.,--.   ,--.\n";
    asciiArt += pay("|  .--. ' ,--,--.,--. ,--.") + pal("|  .--. ' ,--,--.|  |") + "    '  .--./|  |   |  |\n";
    asciiArt += pay("|  '--' |' ,-.  | \\  '  / ") + pal("|  '--' |' ,-.  ||  |") + "    |  |    |  |   |  |\n";
    asciiArt += pay("|  | --' \\ '-'  |  \\   '  ") + pal("|  | --' \\ '-'  ||  |") + "    '  '--'\\|  '--.|  |\n";
    asciiArt += pay("`--'      `--`--'.-'  /   ") + pal("`--'      `--`--'`--'") + "     `-----'`-----'`--'\n";
    asciiArt += pay("                 `---'                                                 ");
    
    return asciiArt;
}
