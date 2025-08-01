import * as fs from 'fs';
import * as path from 'path';

/**
 * Get the last modification date of a file
 * @param filePath - The path to the file
 * @returns Promise<Date> - The last modification date
 * @throws Error if file doesn't exist or cannot be accessed
 */
export async function get_last_modification_date_of_file(filePath: string): Promise<Date> {
  try {
    const stats = await fs.promises.stat(filePath);
    return stats.mtime;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get modification date for file "${filePath}": ${error.message}`);
    }
    throw new Error(`Failed to get modification date for file "${filePath}": Unknown error`);
  }
}

/**
 * Get the last modification date of a file (synchronous version)
 * @param filePath - The path to the file
 * @returns Date - The last modification date
 * @throws Error if file doesn't exist or cannot be accessed
 */
export function get_last_modification_date_of_file_sync(filePath: string): Date {
  try {
    const stats = fs.statSync(filePath);
    return stats.mtime;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get modification date for file "${filePath}": ${error.message}`);
    }
    throw new Error(`Failed to get modification date for file "${filePath}": Unknown error`);
  }
}

/**
 * Check if a path exists and is a file
 * @param filePath - The path to check
 * @returns Promise<boolean> - True if path exists and is a file
 */
export async function isFile(filePath: string): Promise<boolean> {
  try {
    const stats = await fs.promises.stat(filePath);
    return stats.isFile();
  } catch {
    return false;
  }
}

/**
 * Check if a path exists and is a directory
 * @param dirPath - The path to check
 * @returns Promise<boolean> - True if path exists and is a directory
 */
export async function isDirectory(dirPath: string): Promise<boolean> {
  try {
    const stats = await fs.promises.stat(dirPath);
    return stats.isDirectory();
  } catch {
    return false;
  }
}

/**
 * Get basic file information including modification date
 * @param filePath - The path to the file
 * @returns Promise<FileInfo> - Object containing file information
 */
export interface FileInfo {
  path: string;
  name: string;
  size: number;
  lastModified: Date;
  isFile: boolean;
  isDirectory: boolean;
}

export async function getFileInfo(filePath: string): Promise<FileInfo> {
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
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get file info for "${filePath}": ${error.message}`);
    }
    throw new Error(`Failed to get file info for "${filePath}": Unknown error`);
  }
}