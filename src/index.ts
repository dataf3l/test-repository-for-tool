#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

interface FolderInfo {
  name: string;
  path: string;
  branch: string | null;
  isGitRepo: boolean;
}

class FilesystemViewer {
  private targetPath: string;

  constructor(targetPath?: string) {
    this.targetPath = targetPath || process.cwd();
  }

  /**
   * Check if a directory is a Git repository
   */
  private isGitRepository(dirPath: string): boolean {
    try {
      const gitPath = path.join(dirPath, '.git');
      return fs.existsSync(gitPath);
    } catch (error) {
      return false;
    }
  }

  /**
   * Get the current Git branch name for a directory
   */
  private getGitBranch(dirPath: string): string | null {
    try {
      const result = execSync('git rev-parse --abbrev-ref HEAD', {
        cwd: dirPath,
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'pipe']
      });
      return result.trim();
    } catch (error) {
      return null;
    }
  }

  /**
   * Get all directories in the target path
   */
  private getDirectories(): string[] {
    try {
      const items = fs.readdirSync(this.targetPath, { withFileTypes: true });
      return items
        .filter(item => item.isDirectory())
        .map(item => item.name)
        .filter(name => !name.startsWith('.')); // Skip hidden directories
    } catch (error) {
      console.error(`Error reading directory ${this.targetPath}:`, error);
      return [];
    }
  }

  /**
   * Analyze a single folder
   */
  private analyzeFolderInfo(folderName: string): FolderInfo {
    const folderPath = path.join(this.targetPath, folderName);
    const isGitRepo = this.isGitRepository(folderPath);
    const branch = isGitRepo ? this.getGitBranch(folderPath) : null;

    return {
      name: folderName,
      path: folderPath,
      branch,
      isGitRepo
    };
  }

  /**
   * Display the results in a formatted table
   */
  private displayResults(folders: FolderInfo[]): void {
    console.log('\n📁 Filesystem Viewer - Git Branch Information\n');
    console.log('=' .repeat(80));
    
    if (folders.length === 0) {
      console.log('No directories found in the current path.');
      return;
    }

    // Calculate column widths for better formatting
    const maxNameLength = Math.max(...folders.map(f => f.name.length), 'Folder Name'.length);
    const maxBranchLength = Math.max(...folders.map(f => (f.branch || 'N/A').length), 'Git Branch'.length);

    // Header
    console.log(
      'Folder Name'.padEnd(maxNameLength + 2) + 
      '| Git Repo'.padEnd(12) + 
      '| Git Branch'.padEnd(maxBranchLength + 2)
    );
    console.log('-'.repeat(maxNameLength + maxBranchLength + 20));

    // Data rows
    folders.forEach(folder => {
      const repoStatus = folder.isGitRepo ? '✅ Yes' : '❌ No';
      const branchInfo = folder.branch || (folder.isGitRepo ? '⚠️  Unknown' : 'N/A');
      
      console.log(
        folder.name.padEnd(maxNameLength + 2) + 
        `| ${repoStatus}`.padEnd(12) + 
        `| ${branchInfo}`
      );
    });

    console.log('\n📊 Summary:');
    const gitRepos = folders.filter(f => f.isGitRepo).length;
    console.log(`Total directories: ${folders.length}`);
    console.log(`Git repositories: ${gitRepos}`);
    console.log(`Non-git directories: ${folders.length - gitRepos}`);
  }

  /**
   * Main execution method
   */
  public run(): void {
    console.log(`🔍 Scanning directory: ${this.targetPath}`);
    
    const directories = this.getDirectories();
    const folderInfos = directories.map(dir => this.analyzeFolderInfo(dir));
    
    this.displayResults(folderInfos);
  }
}

// CLI execution
function main(): void {
  const args = process.argv.slice(2);
  const targetPath = args[0];

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
📁 Filesystem Viewer - Git Branch Information

Usage: fs-viewer [directory]

Arguments:
  directory    Path to scan (defaults to current directory)

Options:
  --help, -h   Show this help message

Examples:
  fs-viewer                    # Scan current directory
  fs-viewer /path/to/projects  # Scan specific directory
  fs-viewer ~/projects         # Scan projects directory
    `);
    return;
  }

  if (targetPath && !fs.existsSync(targetPath)) {
    console.error(`❌ Error: Directory '${targetPath}' does not exist.`);
    process.exit(1);
  }

  const viewer = new FilesystemViewer(targetPath);
  viewer.run();
}

if (require.main === module) {
  main();
}

export { FilesystemViewer };