# Filesystem Viewer Utility

A simple filesystem viewer utility written in TypeScript that provides functions to get file modification dates and other file system information.

## Features

- **`get_last_modification_date_of_file(filePath: string)`**: Asynchronously gets the last modification date of a file
- **`get_last_modification_date_of_file_sync(filePath: string)`**: Synchronously gets the last modification date of a file
- **`isFile(filePath: string)`**: Checks if a path is a file
- **`isDirectory(dirPath: string)`**: Checks if a path is a directory
- **`getFileInfo(filePath: string)`**: Gets comprehensive file information including size, type, and modification date

## Installation

```bash
npm install
```

## Usage

### Command Line Interface

```bash
# Analyze a file
npm run dev package.json

# Analyze a directory
npm run dev .

# Analyze any file or directory
npm run dev /path/to/file-or-directory
```

### As a Library

```typescript
import { 
  get_last_modification_date_of_file,
  getFileInfo 
} from './src/filesystem-viewer';

// Get modification date
const modDate = await get_last_modification_date_of_file('./package.json');
console.log('Last modified:', modDate.toISOString());

// Get complete file info
const fileInfo = await getFileInfo('./package.json');
console.log('File info:', fileInfo);
```

## Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run test` - Run automated tests
- `npm run dev <path>` - Run the CLI tool with ts-node
- `npm start <path>` - Run the compiled CLI tool

## Testing

The utility includes comprehensive automated tests that verify:

- ✅ Correct modification date retrieval for existing files
- ✅ Error handling for non-existent files
- ✅ File vs directory detection
- ✅ Complete file information retrieval
- ✅ Both synchronous and asynchronous operations

Run tests with:

```bash
npm test
```

## Example Output

```
=== Filesystem Viewer ===
Analyzing: /path/to/package.json

Name: package.json
Path: /path/to/package.json
Type: File
Size: 453 bytes
Last Modified: 2025-08-01T00:01:15.617Z
Last Modified (Local): 7/31/2025, 7:01:15 PM

=== get_last_modification_date_of_file Result ===
Modification Date: 2025-08-01T00:01:15.617Z
Modification Date (Local): 7/31/2025, 7:01:15 PM
```

## API Reference

### `get_last_modification_date_of_file(filePath: string): Promise<Date>`

Returns the last modification date of a file as a Promise that resolves to a Date object.

**Parameters:**
- `filePath` (string): Path to the file

**Returns:** Promise<Date> - The last modification date

**Throws:** Error if file doesn't exist or cannot be accessed

### `FileInfo` Interface

```typescript
interface FileInfo {
  path: string;        // Full path to the file/directory
  name: string;        // Base name of the file/directory
  size: number;        // Size in bytes
  lastModified: Date;  // Last modification date
  isFile: boolean;     // True if it's a file
  isDirectory: boolean; // True if it's a directory
}
```

## Error Handling

All functions provide descriptive error messages when files cannot be accessed or don't exist:

```typescript
try {
  const modDate = await get_last_modification_date_of_file('non-existent.txt');
} catch (error) {
  console.error(error.message); // "Failed to get modification date for file..."
}
```