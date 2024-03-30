"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.killProcess = exports.createRefreshTokenProcess = exports.isRunning = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const promises_1 = require("fs/promises");
const child_process_1 = require("child_process");
const refreshToken_1 = require("./refreshToken");
/**
 * Checks if a child process is currently running.
 *
 * @param pid - The PID (Process ID) of the child process to check.
 * @returns true if the process with the given PID is currently running, false otherwise.
 */
function isRunning(pid) {
    try {
        process.kill(pid, 0);
        return true;
    }
    catch (error) {
        // EPERM -> process is running
        if (error.code === "EPERM") {
            return true;
        }
        else {
            return false;
        }
    }
}
exports.isRunning = isRunning;
/**
 * Creates a child process that refreshes access token and writes the pid to a txt file
 * @param delay - The time until the access token expires
 */
function createRefreshTokenProcess(delay) {
    const delayFilePath = path_1.default.join(__dirname, "delay.txt");
    const out = (0, fs_1.openSync)("./out.log", "a");
    const err = (0, fs_1.openSync)("./out.log", "a");
    (0, promises_1.writeFile)(delayFilePath, delay.toString()).then(() => {
        const child = (0, child_process_1.spawn)("node", ["refreshToken.js"], {
            cwd: __dirname,
            stdio: ["ignore", out, err], // ['input', 'output', 'error']
            detached: true,
        });
        const pidFilePath = path_1.default.join(__dirname, "cur-pid.txt");
        (0, promises_1.writeFile)(pidFilePath, child.pid ? child.pid.toString() : "");
        child.on("exit", () => {
            (0, refreshToken_1.refreshToken)();
        });
        child.unref();
    });
}
exports.createRefreshTokenProcess = createRefreshTokenProcess;
function killProcess(pid) {
    try {
        process.kill(pid);
        return true;
    }
    catch (error) {
        console.error("Error killing refresh token process: ", error);
        return false;
    }
}
exports.killProcess = killProcess;
//# sourceMappingURL=childProcess.js.map