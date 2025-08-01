/**
 * Get the last modification date of a file
 * @param filePath - The path to the file
 * @returns Promise<Date> - The last modification date
 * @throws Error if file doesn't exist or cannot be accessed
 */
export declare function get_last_modification_date_of_file(filePath: string): Promise<Date>;
/**
 * Get the last modification date of a file (synchronous version)
 * @param filePath - The path to the file
 * @returns Date - The last modification date
 * @throws Error if file doesn't exist or cannot be accessed
 */
export declare function get_last_modification_date_of_file_sync(filePath: string): Date;
/**
 * Check if a path exists and is a file
 * @param filePath - The path to check
 * @returns Promise<boolean> - True if path exists and is a file
 */
export declare function isFile(filePath: string): Promise<boolean>;
/**
 * Check if a path exists and is a directory
 * @param dirPath - The path to check
 * @returns Promise<boolean> - True if path exists and is a directory
 */
export declare function isDirectory(dirPath: string): Promise<boolean>;
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
export declare function getFileInfo(filePath: string): Promise<FileInfo>;
//# sourceMappingURL=filesystem-viewer.d.ts.map