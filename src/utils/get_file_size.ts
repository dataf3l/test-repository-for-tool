import * as fs from 'fs';
import * as path from 'path';

/**
 * Get the size of a file in bytes
 * @param filePath - Path to the file
 * @returns Promise<number> - File size in bytes
 * @throws Error if file doesn't exist or cannot be accessed
 */
export async function getFileSize(filePath: string): Promise<number> {
  try {
    const stats = await fs.promises.stat(filePath);
    
    if (!stats.isFile()) {
      throw new Error(`Path '${filePath}' is not a file`);
    }
    
    return stats.size;
  } catch (error) {
    if (error instanceof Error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        throw new Error(`File '${filePath}' does not exist`);
      }
      if ((error as NodeJS.ErrnoException).code === 'EACCES') {
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
export function getFileSizeSync(filePath: string): number {
  try {
    const stats = fs.statSync(filePath);
    
    if (!stats.isFile()) {
      throw new Error(`Path '${filePath}' is not a file`);
    }
    
    return stats.size;
  } catch (error) {
    if (error instanceof Error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        throw new Error(`File '${filePath}' does not exist`);
      }
      if ((error as NodeJS.ErrnoException).code === 'EACCES') {
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
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  
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
export async function getFormattedFileSize(filePath: string): Promise<string> {
  const size = await getFileSize(filePath);
  return formatFileSize(size);
}

/**
 * Get file size with human-readable formatting (synchronous version)
 * @param filePath - Path to the file
 * @returns string - Formatted file size
 */
export function getFormattedFileSizeSync(filePath: string): string {
  const size = getFileSizeSync(filePath);
  return formatFileSize(size);
}