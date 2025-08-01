#!/usr/bin/env node
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
const path = __importStar(require("path"));
const filesystem_viewer_1 = require("./filesystem-viewer");
/**
 * Main CLI entry point for the filesystem viewer
 */
async function main() {
    const args = process.argv.slice(2);
    if (args.length === 0) {
        console.log('Usage: npm run dev <file-or-directory-path>');
        console.log('Example: npm run dev ./package.json');
        process.exit(1);
    }
    const targetPath = path.resolve(args[0]);
    try {
        console.log(`\n=== Filesystem Viewer ===`);
        console.log(`Analyzing: ${targetPath}\n`);
        // Check if path exists
        const isFileResult = await (0, filesystem_viewer_1.isFile)(targetPath);
        const isDirResult = await (0, filesystem_viewer_1.isDirectory)(targetPath);
        if (!isFileResult && !isDirResult) {
            console.error(`Error: Path "${targetPath}" does not exist.`);
            process.exit(1);
        }
        // Get file/directory information
        const info = await (0, filesystem_viewer_1.getFileInfo)(targetPath);
        console.log(`Name: ${info.name}`);
        console.log(`Path: ${info.path}`);
        console.log(`Type: ${info.isFile ? 'File' : 'Directory'}`);
        console.log(`Size: ${info.size} bytes`);
        console.log(`Last Modified: ${info.lastModified.toISOString()}`);
        console.log(`Last Modified (Local): ${info.lastModified.toLocaleString()}`);
        // Demonstrate the main function
        const modDate = await (0, filesystem_viewer_1.get_last_modification_date_of_file)(targetPath);
        console.log(`\n=== get_last_modification_date_of_file Result ===`);
        console.log(`Modification Date: ${modDate.toISOString()}`);
        console.log(`Modification Date (Local): ${modDate.toLocaleString()}`);
    }
    catch (error) {
        console.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        process.exit(1);
    }
}
// Export the main functions for use as a library
var filesystem_viewer_2 = require("./filesystem-viewer");
Object.defineProperty(exports, "get_last_modification_date_of_file", { enumerable: true, get: function () { return filesystem_viewer_2.get_last_modification_date_of_file; } });
Object.defineProperty(exports, "get_last_modification_date_of_file_sync", { enumerable: true, get: function () { return filesystem_viewer_2.get_last_modification_date_of_file_sync; } });
Object.defineProperty(exports, "isFile", { enumerable: true, get: function () { return filesystem_viewer_2.isFile; } });
Object.defineProperty(exports, "isDirectory", { enumerable: true, get: function () { return filesystem_viewer_2.isDirectory; } });
Object.defineProperty(exports, "getFileInfo", { enumerable: true, get: function () { return filesystem_viewer_2.getFileInfo; } });
// Run main function if this file is executed directly
if (require.main === module) {
    main().catch(console.error);
}
//# sourceMappingURL=index.js.map