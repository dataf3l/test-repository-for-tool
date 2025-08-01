"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileInfo = exports.isDirectory = exports.isFile = exports.get_last_modification_date_of_file_sync = exports.get_last_modification_date_of_file = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
/**
 * Get the last modification date of a file
 * @param filePath - The path to the file
 * @returns Promise<Date> - The last modification date
 * @throws Error if file doesn't exist or cannot be accessed
 */
async function get_last_modification_date_of_file(filePath) {
    try {
        const stats = await fs.promises.stat(filePath);
        return stats.mtime;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to get modification date for file "${filePath}": ${error.message}`);
        }
        throw new Error(`Failed to get modification date for file "${filePath}": Unknown error`);
    }
}
exports.get_last_modification_date_of_file = get_last_modification_date_of_file;
/**
 * Get the last modification date of a file (synchronous version)
 * @param filePath - The path to the file
 * @returns Date - The last modification date
 * @throws Error if file doesn't exist or cannot be accessed
 */
function get_last_modification_date_of_file_sync(filePath) {
    try {
        const stats = fs.statSync(filePath);
        return stats.mtime;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to get modification date for file "${filePath}": ${error.message}`);
        }
        throw new Error(`Failed to get modification date for file "${filePath}": Unknown error`);
    }
}
exports.get_last_modification_date_of_file_sync = get_last_modification_date_of_file_sync;
/**
 * Check if a path exists and is a file
 * @param filePath - The path to check
 * @returns Promise<boolean> - True if path exists and is a file
 */
async function isFile(filePath) {
    try {
        const stats = await fs.promises.stat(filePath);
        return stats.isFile();
    }
    catch {
        return false;
    }
}
exports.isFile = isFile;
/**
 * Check if a path exists and is a directory
 * @param dirPath - The path to check
 * @returns Promise<boolean> - True if path exists and is a directory
 */
async function isDirectory(dirPath) {
    try {
        const stats = await fs.promises.stat(dirPath);
        return stats.isDirectory();
    }
    catch {
        return false;
    }
}
exports.isDirectory = isDirectory;
async function getFileInfo(filePath) {
    try {
        const stats = await fs.promises.stat(filePath);
        const name = path.basename(filePath);
        return {
            path: filePath,
            name,
            size: stats.size,
            lastModified: stats.mtime,
            isFile: stats.isFile(),
            isDirectory: stats.isDirectory()
        };
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to get file info for "${filePath}": ${error.message}`);
        }
        throw new Error(`Failed to get file info for "${filePath}": Unknown error`);
    }
}
exports.getFileInfo = getFileInfo;
//# sourceMappingURL=filesystem-viewer.js.map