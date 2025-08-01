import * as fs from 'fs';
import * as path from 'path';
import { 
  getFileSize, 
  getFileSizeSync, 
  formatFileSize, 
  getFormattedFileSize, 
  getFormattedFileSizeSync 
} from './get_file_size';

// Test helper to create temporary test files
const createTestFile = async (fileName: string, content: string): Promise<string> => {
  const filePath = path.join(__dirname, fileName);
  await fs.promises.writeFile(filePath, content);
  return filePath;
};

const deleteTestFile = async (filePath: string): Promise<void> => {
  try {
    await fs.promises.unlink(filePath);
  } catch (error) {
    // Ignore if file doesn't exist
  }
};

describe('getFileSize', () => {
  let testFilePath: string;

  afterEach(async () => {
    if (testFilePath) {
      await deleteTestFile(testFilePath);
    }
  });

  test('should return correct file size for existing file', async () => {
    const content = 'Hello, World!';
    testFilePath = await createTestFile('tmp_rovodev_test1.txt', content);
    
    const size = await getFileSize(testFilePath);
    expect(size).toBe(Buffer.byteLength(content, 'utf8'));
  });

  test('should throw error for non-existent file', async () => {
    const nonExistentPath = path.join(__dirname, 'tmp_rovodev_nonexistent.txt');
    
    await expect(getFileSize(nonExistentPath)).rejects.toThrow('does not exist');
  });

  test('should throw error for directory path', async () => {
    await expect(getFileSize(__dirname)).rejects.toThrow(`Path '${__dirname}' is not a file`);
  });

  test('should handle empty file', async () => {
    testFilePath = await createTestFile('tmp_rovodev_empty.txt', '');
    
    const size = await getFileSize(testFilePath);
    expect(size).toBe(0);
  });

  test('should handle large content', async () => {
    const largeContent = 'A'.repeat(10000);
    testFilePath = await createTestFile('tmp_rovodev_large.txt', largeContent);
    
    const size = await getFileSize(testFilePath);
    expect(size).toBe(10000);
  });
});

describe('getFileSizeSync', () => {
  let testFilePath: string;

  afterEach(async () => {
    if (testFilePath) {
      await deleteTestFile(testFilePath);
    }
  });

  test('should return correct file size for existing file', async () => {
    const content = 'Sync test content';
    testFilePath = await createTestFile('tmp_rovodev_sync_test.txt', content);
    
    const size = getFileSizeSync(testFilePath);
    expect(size).toBe(Buffer.byteLength(content, 'utf8'));
  });

  test('should throw error for non-existent file', () => {
    const nonExistentPath = path.join(__dirname, 'tmp_rovodev_sync_nonexistent.txt');
    
    expect(() => getFileSizeSync(nonExistentPath)).toThrow('does not exist');
  });

  test('should throw error for directory path', () => {
    expect(() => getFileSizeSync(__dirname)).toThrow(`Path '${__dirname}' is not a file`);
  });
});

describe('formatFileSize', () => {
  test('should format bytes correctly', () => {
    expect(formatFileSize(0)).toBe('0 B');
    expect(formatFileSize(1)).toBe('1 B');
    expect(formatFileSize(1023)).toBe('1023 B');
  });

  test('should format kilobytes correctly', () => {
    expect(formatFileSize(1024)).toBe('1 KB');
    expect(formatFileSize(1536)).toBe('1.5 KB');
    expect(formatFileSize(2048)).toBe('2 KB');
  });

  test('should format megabytes correctly', () => {
    expect(formatFileSize(1024 * 1024)).toBe('1 MB');
    expect(formatFileSize(1024 * 1024 * 1.5)).toBe('1.5 MB');
  });

  test('should format gigabytes correctly', () => {
    expect(formatFileSize(1024 * 1024 * 1024)).toBe('1 GB');
    expect(formatFileSize(1024 * 1024 * 1024 * 2.5)).toBe('2.5 GB');
  });

  test('should format terabytes correctly', () => {
    expect(formatFileSize(1024 * 1024 * 1024 * 1024)).toBe('1 TB');
  });
});

describe('getFormattedFileSize', () => {
  let testFilePath: string;

  afterEach(async () => {
    if (testFilePath) {
      await deleteTestFile(testFilePath);
    }
  });

  test('should return formatted file size', async () => {
    const content = 'A'.repeat(1536); // 1.5 KB
    testFilePath = await createTestFile('tmp_rovodev_formatted_test.txt', content);
    
    const formattedSize = await getFormattedFileSize(testFilePath);
    expect(formattedSize).toBe('1.5 KB');
  });
});

describe('getFormattedFileSizeSync', () => {
  let testFilePath: string;

  afterEach(async () => {
    if (testFilePath) {
      await deleteTestFile(testFilePath);
    }
  });

  test('should return formatted file size synchronously', async () => {
    const content = 'B'.repeat(2048); // 2 KB
    testFilePath = await createTestFile('tmp_rovodev_formatted_sync_test.txt', content);
    
    const formattedSize = getFormattedFileSizeSync(testFilePath);
    expect(formattedSize).toBe('2 KB');
  });
});

// Integration test with actual project files
describe('Integration tests with project files', () => {
  test('should get size of package.json', async () => {
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    
    const size = await getFileSize(packageJsonPath);
    expect(size).toBeGreaterThan(0);
    
    const formattedSize = await getFormattedFileSize(packageJsonPath);
    expect(formattedSize).toMatch(/^\d+(\.\d+)?\s(B|KB|MB)$/);
  });

  test('should get size of tsconfig.json', async () => {
    const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
    
    const size = getFileSizeSync(tsconfigPath);
    expect(size).toBeGreaterThan(0);
    
    const formattedSize = getFormattedFileSizeSync(tsconfigPath);
    expect(formattedSize).toMatch(/^\d+(\.\d+)?\s(B|KB|MB)$/);
  });
});