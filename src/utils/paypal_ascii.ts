import chalk from "chalk";

const pay = chalk.hex("#012169");
const pal = chalk.hex("#009cde");

export default function ASCII() {
    console.log(pay(",------.                  ") + pal(",------.         ,--.") + "     ,-----.,--.   ,--.");
    console.log(pay("|  .--. ' ,--,--.,--. ,--.") + pal("|  .--. ' ,--,--.|  |") + "    '  .--./|  |   |  |");
    console.log(pay("|  '--' |' ,-.  | \\  '  / ") + pal("|  '--' |' ,-.  ||  |") + "    |  |    |  |   |  |");
    console.log(pay("|  | --' \\ '-'  |  \\   '  ") + pal("|  | --' \\ '-'  ||  |") + "    '  '--'\\|  '--.|  |");
    console.log(pay("`--'      `--`--'.-'  /   ") + pal("`--'      `--`--'`--'") + "     `-----'`-----'`--'");
    console.log(pay("                 `---'                                                 "));
    
}   