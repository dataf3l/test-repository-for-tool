import * as fs from 'fs';
import * as path from 'path';
import {
  get_last_modification_date_of_file,
  get_last_modification_date_of_file_sync,
  isFile,
  isDirectory,
  getFileInfo,
  FileInfo
} from './filesystem-viewer';

describe('Filesystem Viewer Utility', () => {
  const testDir = path.join(__dirname, 'tmp_rovodev_test');
  const testFile = path.join(testDir, 'test-file.txt');
  const testContent = 'This is a test file for filesystem viewer utility';

  beforeAll(async () => {
    // Create test directory and file
    await fs.promises.mkdir(testDir, { recursive: true });
    await fs.promises.writeFile(testFile, testContent);
  });

  afterAll(async () => {
    // Clean up test files
    try {
      await fs.promises.unlink(testFile);
      await fs.promises.rmdir(testDir);
    } catch (error) {
      // Ignore cleanup errors
    }
  });

  describe('get_last_modification_date_of_file', () => {
    it('should return the last modification date for an existing file', async () => {
      const modDate = await get_last_modification_date_of_file(testFile);
      
      expect(modDate).toBeInstanceOf(Date);
      expect(modDate.getTime()).toBeGreaterThan(0);
      
      // The modification date should be recent (within the last minute)
      const now = new Date();
      const timeDiff = now.getTime() - modDate.getTime();
      expect(timeDiff).toBeLessThan(60000); // Less than 1 minute
    });

    it('should throw an error for non-existent file', async () => {
      const nonExistentFile = path.join(testDir, 'non-existent-file.txt');
      
      await expect(get_last_modification_date_of_file(nonExistentFile))
        .rejects
        .toThrow(/Failed to get modification date/);
    });

    it('should work with absolute paths', async () => {
      const absolutePath = path.resolve(testFile);
      const modDate = await get_last_modification_date_of_file(absolutePath);
      
      expect(modDate).toBeInstanceOf(Date);
    });
  });

  describe('get_last_modification_date_of_file_sync', () => {
    it('should return the last modification date for an existing file (sync)', () => {
      const modDate = get_last_modification_date_of_file_sync(testFile);
      
      expect(modDate).toBeInstanceOf(Date);
      expect(modDate.getTime()).toBeGreaterThan(0);
    });

    it('should throw an error for non-existent file (sync)', () => {
      const nonExistentFile = path.join(testDir, 'non-existent-file-sync.txt');
      
      expect(() => get_last_modification_date_of_file_sync(nonExistentFile))
        .toThrow(/Failed to get modification date/);
    });
  });

  describe('isFile', () => {
    it('should return true for existing files', async () => {
      const result = await isFile(testFile);
      expect(result).toBe(true);
    });

    it('should return false for directories', async () => {
      const result = await isFile(testDir);
      expect(result).toBe(false);
    });

    it('should return false for non-existent paths', async () => {
      const result = await isFile(path.join(testDir, 'non-existent.txt'));
      expect(result).toBe(false);
    });
  });

  describe('isDirectory', () => {
    it('should return true for existing directories', async () => {
      const result = await isDirectory(testDir);
      expect(result).toBe(true);
    });

    it('should return false for files', async () => {
      const result = await isDirectory(testFile);
      expect(result).toBe(false);
    });

    it('should return false for non-existent paths', async () => {
      const result = await isDirectory(path.join(testDir, 'non-existent-dir'));
      expect(result).toBe(false);
    });
  });

  describe('getFileInfo', () => {
    it('should return complete file information', async () => {
      const fileInfo: FileInfo = await getFileInfo(testFile);
      
      expect(fileInfo.path).toBe(testFile);
      expect(fileInfo.name).toBe('test-file.txt');
      expect(fileInfo.size).toBe(testContent.length);
      expect(fileInfo.lastModified).toBeInstanceOf(Date);
      expect(fileInfo.isFile).toBe(true);
      expect(fileInfo.isDirectory).toBe(false);
    });

    it('should return directory information', async () => {
      const dirInfo: FileInfo = await getFileInfo(testDir);
      
      expect(dirInfo.path).toBe(testDir);
      expect(dirInfo.name).toBe('tmp_rovodev_test');
      expect(dirInfo.isFile).toBe(false);
      expect(dirInfo.isDirectory).toBe(true);
    });

    it('should throw an error for non-existent paths', async () => {
      const nonExistentPath = path.join(testDir, 'non-existent');
      
      await expect(getFileInfo(nonExistentPath))
        .rejects
        .toThrow(/Failed to get file info/);
    });
  });

  describe('Integration tests', () => {
    it('should handle the current file being tested', async () => {
      const currentFile = __filename;
      
      const modDate = await get_last_modification_date_of_file(currentFile);
      const fileInfo = await getFileInfo(currentFile);
      
      expect(modDate).toBeInstanceOf(Date);
      expect(fileInfo.isFile).toBe(true);
      expect(fileInfo.name).toBe(path.basename(currentFile));
    });
  });
});