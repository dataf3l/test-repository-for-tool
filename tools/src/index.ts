#!/usr/bin/env node

import * as path from 'path';
import { 
  get_last_modification_date_of_file,
  getFileInfo,
  isFile,
  isDirectory 
} from './filesystem-viewer';

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
    const isFileResult = await isFile(targetPath);
    const isDirResult = await isDirectory(targetPath);
    
    if (!isFileResult && !isDirResult) {
      console.error(`Error: Path "${targetPath}" does not exist.`);
      process.exit(1);
    }

    // Get file/directory information
    const info = await getFileInfo(targetPath);
    
    console.log(`Name: ${info.name}`);
    console.log(`Path: ${info.path}`);
    console.log(`Type: ${info.isFile ? 'File' : 'Directory'}`);
    console.log(`Size: ${info.size} bytes`);
    console.log(`Last Modified: ${info.lastModified.toISOString()}`);
    console.log(`Last Modified (Local): ${info.lastModified.toLocaleString()}`);
    
    // Demonstrate the main function
    const modDate = await get_last_modification_date_of_file(targetPath);
    console.log(`\n=== get_last_modification_date_of_file Result ===`);
    console.log(`Modification Date: ${modDate.toISOString()}`);
    console.log(`Modification Date (Local): ${modDate.toLocaleString()}`);
    
  } catch (error) {
    console.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    process.exit(1);
  }
}

// Export the main functions for use as a library
export {
  get_last_modification_date_of_file,
  get_last_modification_date_of_file_sync,
  isFile,
  isDirectory,
  getFileInfo,
  FileInfo
} from './filesystem-viewer';

// Run main function if this file is executed directly
if (require.main === module) {
  main().catch(console.error);
}