# Filesystem Viewer - Git Branch Information

A simple TypeScript command-line tool that scans directories and displays Git branch information for each folder.

## Features

- Scans all directories in a specified path
- Shows Git branch name for each Git repository
- Identifies which folders are Git repositories
- Provides summary statistics
- Clean, formatted table output

## Installation

1. Clone or download this project
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the project:
   ```bash
   npm run build
   ```

## Usage

### Basic Usage
```bash
# Scan current directory
node dist/index.js

# Scan specific directory
node dist/index.js /path/to/your/projects

# Show help
node dist/index.js --help
```

### NPM Scripts
```bash
# Build and run on current directory
npm test

# Development mode (with ts-node)
npm run dev

# Just build
npm run build
```

## Example Output

```
Scanning directory: /path/to/projects

Filesystem Viewer - Git Branch Information

================================================================================
Folder Name    | Git Repo  | Git Branch    
-----------------------------------------------
my-app         | Yes       | main
feature-branch | Yes       | feature/new-ui
old-project    | Yes       | development
docs           | No        | N/A
temp-files     | No        | N/A

Summary:
Total directories: 5
Git repositories: 3
Non-git directories: 2
```

## How It Works

The tool:
1. Scans the target directory for subdirectories
2. Checks each subdirectory for a `.git` folder to identify Git repositories
3. Runs `git rev-parse --abbrev-ref HEAD` to get the current branch name
4. Displays results in a formatted table with summary statistics

## Requirements

- Node.js (v14 or higher)
- Git (for repositories to be detected)
- TypeScript (included as dev dependency)

## License

MIT License - feel free to use and modify as needed.