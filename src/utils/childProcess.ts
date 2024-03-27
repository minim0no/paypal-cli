import path from "path";
import { openSync, write } from "fs";
import { writeFile } from "fs/promises";
import { spawn } from "child_process";
/**
 * Checks if a child process is currently running.
 *
 * @param pid - The PID (Process ID) of the child process to check.
 * @returns true if the process with the given PID is currently running, false otherwise.
 */
export function isRunning(pid: number): boolean {
    try {
        process.kill(pid, 0);
        return true;
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code === "EPERM") {
            return true;
        }
        return false;
    }
}

/**
 * Creates a child process that refreshes access token and writes the pid to a txt file
 * @param delay - The time until the access token expires
 */
export function createRefreshTokenProcess(delay: number) {
    const filePath = path.join(__dirname, "delay.txt");
    const out = openSync("./out.log", "a");
    const err = openSync("./out.log", "a");
    writeFile(filePath, delay.toString()).then(() => {
        const child = spawn("node", ["refreshToken.js"], {
            cwd: __dirname,
            stdio: ["ignore", out, err], // ['input', 'output', 'error']
            detached: true,
        });

        writeFile("cur-pid.txt", child.pid ? child.pid.toString() : "");

        child.unref();
    });
}
