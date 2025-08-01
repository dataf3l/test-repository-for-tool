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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileSize = getFileSize;
exports.getFileSizeSync = getFileSizeSync;
exports.formatFileSize = formatFileSize;
exports.getFormattedFileSize = getFormattedFileSize;
exports.getFormattedFileSizeSync = getFormattedFileSizeSync;
const fs = __importStar(require("fs"));
/**
 * Get the size of a file in bytes
 * @param filePath - Path to the file
 * @returns Promise<number> - File size in bytes
 * @throws Error if file doesn't exist or cannot be accessed
 */
async function getFileSize(filePath) {
    try {
        const stats = await fs.promises.stat(filePath);
        if (!stats.isFile()) {
            throw new Error(`Path '${filePath}' is not a file`);
        }
        return stats.size;
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.code === 'ENOENT') {
                throw new Error(`File '${filePath}' does not exist`);
            }
            if (error.code === 'EACCES') {
                throw new Error(`Permission denied accessing file '${filePath}'`);
            }
        }
        throw error;
    }
}
/**
 * Get the size of a file in bytes (synchronous version)
 * @param filePath - Path to the file
 * @returns number - File size in bytes
 * @throws Error if file doesn't exist or cannot be accessed
 */
function getFileSizeSync(filePath) {
    try {
        const stats = fs.statSync(filePath);
        if (!stats.isFile()) {
            throw new Error(`Path '${filePath}' is not a file`);
        }
        return stats.size;
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.code === 'ENOENT') {
                throw new Error(`File '${filePath}' does not exist`);
            }
            if (error.code === 'EACCES') {
                throw new Error(`Permission denied accessing file '${filePath}'`);
            }
        }
        throw error;
    }
}
/**
 * Format file size in human-readable format
 * @param bytes - Size in bytes
 * @returns string - Formatted size (e.g., "1.5 KB", "2.3 MB")
 */
function formatFileSize(bytes) {
    if (bytes === 0)
        return '0 B';
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    const k = 1024;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${units[i]}`;
}
/**
 * Get file size with human-readable formatting
 * @param filePath - Path to the file
 * @returns Promise<string> - Formatted file size
 */
async function getFormattedFileSize(filePath) {
    const size = await getFileSize(filePath);
    return formatFileSize(size);
}
/**
 * Get file size with human-readable formatting (synchronous version)
 * @param filePath - Path to the file
 * @returns string - Formatted file size
 */
function getFormattedFileSizeSync(filePath) {
    const size = getFileSizeSync(filePath);
    return formatFileSize(size);
}
