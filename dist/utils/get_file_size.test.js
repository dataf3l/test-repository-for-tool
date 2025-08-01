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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const get_file_size_1 = require("./get_file_size");
// Test helper to create temporary test files
const createTestFile = async (fileName, content) => {
    const filePath = path.join(__dirname, fileName);
    await fs.promises.writeFile(filePath, content);
    return filePath;
};
const deleteTestFile = async (filePath) => {
    try {
        await fs.promises.unlink(filePath);
    }
    catch (error) {
        // Ignore if file doesn't exist
    }
};
describe('getFileSize', () => {
    let testFilePath;
    afterEach(async () => {
        if (testFilePath) {
            await deleteTestFile(testFilePath);
        }
    });
    test('should return correct file size for existing file', async () => {
        const content = 'Hello, World!';
        testFilePath = await createTestFile('tmp_rovodev_test1.txt', content);
        const size = await (0, get_file_size_1.getFileSize)(testFilePath);
        expect(size).toBe(Buffer.byteLength(content, 'utf8'));
    });
    test('should throw error for non-existent file', async () => {
        const nonExistentPath = path.join(__dirname, 'tmp_rovodev_nonexistent.txt');
        await expect((0, get_file_size_1.getFileSize)(nonExistentPath)).rejects.toThrow('File \'tmp_rovodev_nonexistent.txt\' does not exist');
    });
    test('should throw error for directory path', async () => {
        await expect((0, get_file_size_1.getFileSize)(__dirname)).rejects.toThrow(`Path '${__dirname}' is not a file`);
    });
    test('should handle empty file', async () => {
        testFilePath = await createTestFile('tmp_rovodev_empty.txt', '');
        const size = await (0, get_file_size_1.getFileSize)(testFilePath);
        expect(size).toBe(0);
    });
    test('should handle large content', async () => {
        const largeContent = 'A'.repeat(10000);
        testFilePath = await createTestFile('tmp_rovodev_large.txt', largeContent);
        const size = await (0, get_file_size_1.getFileSize)(testFilePath);
        expect(size).toBe(10000);
    });
});
describe('getFileSizeSync', () => {
    let testFilePath;
    afterEach(async () => {
        if (testFilePath) {
            await deleteTestFile(testFilePath);
        }
    });
    test('should return correct file size for existing file', async () => {
        const content = 'Sync test content';
        testFilePath = await createTestFile('tmp_rovodev_sync_test.txt', content);
        const size = (0, get_file_size_1.getFileSizeSync)(testFilePath);
        expect(size).toBe(Buffer.byteLength(content, 'utf8'));
    });
    test('should throw error for non-existent file', () => {
        const nonExistentPath = path.join(__dirname, 'tmp_rovodev_sync_nonexistent.txt');
        expect(() => (0, get_file_size_1.getFileSizeSync)(nonExistentPath)).toThrow('File \'tmp_rovodev_sync_nonexistent.txt\' does not exist');
    });
    test('should throw error for directory path', () => {
        expect(() => (0, get_file_size_1.getFileSizeSync)(__dirname)).toThrow(`Path '${__dirname}' is not a file`);
    });
});
describe('formatFileSize', () => {
    test('should format bytes correctly', () => {
        expect((0, get_file_size_1.formatFileSize)(0)).toBe('0 B');
        expect((0, get_file_size_1.formatFileSize)(1)).toBe('1 B');
        expect((0, get_file_size_1.formatFileSize)(1023)).toBe('1023 B');
    });
    test('should format kilobytes correctly', () => {
        expect((0, get_file_size_1.formatFileSize)(1024)).toBe('1 KB');
        expect((0, get_file_size_1.formatFileSize)(1536)).toBe('1.5 KB');
        expect((0, get_file_size_1.formatFileSize)(2048)).toBe('2 KB');
    });
    test('should format megabytes correctly', () => {
        expect((0, get_file_size_1.formatFileSize)(1024 * 1024)).toBe('1 MB');
        expect((0, get_file_size_1.formatFileSize)(1024 * 1024 * 1.5)).toBe('1.5 MB');
    });
    test('should format gigabytes correctly', () => {
        expect((0, get_file_size_1.formatFileSize)(1024 * 1024 * 1024)).toBe('1 GB');
        expect((0, get_file_size_1.formatFileSize)(1024 * 1024 * 1024 * 2.5)).toBe('2.5 GB');
    });
    test('should format terabytes correctly', () => {
        expect((0, get_file_size_1.formatFileSize)(1024 * 1024 * 1024 * 1024)).toBe('1 TB');
    });
});
describe('getFormattedFileSize', () => {
    let testFilePath;
    afterEach(async () => {
        if (testFilePath) {
            await deleteTestFile(testFilePath);
        }
    });
    test('should return formatted file size', async () => {
        const content = 'A'.repeat(1536); // 1.5 KB
        testFilePath = await createTestFile('tmp_rovodev_formatted_test.txt', content);
        const formattedSize = await (0, get_file_size_1.getFormattedFileSize)(testFilePath);
        expect(formattedSize).toBe('1.5 KB');
    });
});
describe('getFormattedFileSizeSync', () => {
    let testFilePath;
    afterEach(async () => {
        if (testFilePath) {
            await deleteTestFile(testFilePath);
        }
    });
    test('should return formatted file size synchronously', async () => {
        const content = 'B'.repeat(2048); // 2 KB
        testFilePath = await createTestFile('tmp_rovodev_formatted_sync_test.txt', content);
        const formattedSize = (0, get_file_size_1.getFormattedFileSizeSync)(testFilePath);
        expect(formattedSize).toBe('2 KB');
    });
});
// Integration test with actual project files
describe('Integration tests with project files', () => {
    test('should get size of package.json', async () => {
        const packageJsonPath = path.join(process.cwd(), 'package.json');
        const size = await (0, get_file_size_1.getFileSize)(packageJsonPath);
        expect(size).toBeGreaterThan(0);
        const formattedSize = await (0, get_file_size_1.getFormattedFileSize)(packageJsonPath);
        expect(formattedSize).toMatch(/^\d+(\.\d+)?\s(B|KB|MB)$/);
    });
    test('should get size of tsconfig.json', async () => {
        const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
        const size = (0, get_file_size_1.getFileSizeSync)(tsconfigPath);
        expect(size).toBeGreaterThan(0);
        const formattedSize = (0, get_file_size_1.getFormattedFileSizeSync)(tsconfigPath);
        expect(formattedSize).toMatch(/^\d+(\.\d+)?\s(B|KB|MB)$/);
    });
});
