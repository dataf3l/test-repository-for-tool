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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const filesystem_viewer_1 = require("./filesystem-viewer");
/**
 * Simple test runner for the filesystem viewer utility
 */
class TestRunner {
    constructor() {
        this.testsPassed = 0;
        this.testsFailed = 0;
        this.testDir = path.join(__dirname, 'tmp_rovodev_test');
        this.testFile = path.join(this.testDir, 'test-file.txt');
        this.testContent = 'This is a test file for filesystem viewer utility';
    }
    async runAllTests() {
        console.log('🧪 Running Filesystem Viewer Tests...\n');
        await this.setup();
        try {
            await this.testGetLastModificationDate();
            await this.testGetLastModificationDateSync();
            await this.testIsFile();
            await this.testIsDirectory();
            await this.testGetFileInfo();
            await this.testErrorHandling();
            this.printResults();
        }
        finally {
            await this.cleanup();
        }
    }
    async setup() {
        try {
            await fs.promises.mkdir(this.testDir, { recursive: true });
            await fs.promises.writeFile(this.testFile, this.testContent);
            console.log('✅ Test setup completed');
        }
        catch (error) {
            console.error('❌ Test setup failed:', error);
            process.exit(1);
        }
    }
    async cleanup() {
        try {
            await fs.promises.unlink(this.testFile);
            await fs.promises.rmdir(this.testDir);
            console.log('✅ Test cleanup completed');
        }
        catch (error) {
            console.log('⚠️  Test cleanup warning:', error);
        }
    }
    async testGetLastModificationDate() {
        console.log('Testing get_last_modification_date_of_file...');
        try {
            const modDate = await (0, filesystem_viewer_1.get_last_modification_date_of_file)(this.testFile);
            this.assert(modDate instanceof Date, 'Should return a Date object');
            this.assert(modDate.getTime() > 0, 'Should return a valid timestamp');
            const now = new Date();
            const timeDiff = now.getTime() - modDate.getTime();
            this.assert(timeDiff < 60000, 'Should be recent (within 1 minute)');
            this.testsPassed++;
            console.log('  ✅ get_last_modification_date_of_file tests passed');
        }
        catch (error) {
            this.testsFailed++;
            console.log('  ❌ get_last_modification_date_of_file tests failed:', error);
        }
    }
    async testGetLastModificationDateSync() {
        console.log('Testing get_last_modification_date_of_file_sync...');
        try {
            const modDate = (0, filesystem_viewer_1.get_last_modification_date_of_file_sync)(this.testFile);
            this.assert(modDate instanceof Date, 'Should return a Date object');
            this.assert(modDate.getTime() > 0, 'Should return a valid timestamp');
            this.testsPassed++;
            console.log('  ✅ get_last_modification_date_of_file_sync tests passed');
        }
        catch (error) {
            this.testsFailed++;
            console.log('  ❌ get_last_modification_date_of_file_sync tests failed:', error);
        }
    }
    async testIsFile() {
        console.log('Testing isFile...');
        try {
            const fileResult = await (0, filesystem_viewer_1.isFile)(this.testFile);
            const dirResult = await (0, filesystem_viewer_1.isFile)(this.testDir);
            const nonExistentResult = await (0, filesystem_viewer_1.isFile)(path.join(this.testDir, 'non-existent.txt'));
            this.assert(fileResult === true, 'Should return true for files');
            this.assert(dirResult === false, 'Should return false for directories');
            this.assert(nonExistentResult === false, 'Should return false for non-existent paths');
            this.testsPassed++;
            console.log('  ✅ isFile tests passed');
        }
        catch (error) {
            this.testsFailed++;
            console.log('  ❌ isFile tests failed:', error);
        }
    }
    async testIsDirectory() {
        console.log('Testing isDirectory...');
        try {
            const dirResult = await (0, filesystem_viewer_1.isDirectory)(this.testDir);
            const fileResult = await (0, filesystem_viewer_1.isDirectory)(this.testFile);
            const nonExistentResult = await (0, filesystem_viewer_1.isDirectory)(path.join(this.testDir, 'non-existent-dir'));
            this.assert(dirResult === true, 'Should return true for directories');
            this.assert(fileResult === false, 'Should return false for files');
            this.assert(nonExistentResult === false, 'Should return false for non-existent paths');
            this.testsPassed++;
            console.log('  ✅ isDirectory tests passed');
        }
        catch (error) {
            this.testsFailed++;
            console.log('  ❌ isDirectory tests failed:', error);
        }
    }
    async testGetFileInfo() {
        console.log('Testing getFileInfo...');
        try {
            const fileInfo = await (0, filesystem_viewer_1.getFileInfo)(this.testFile);
            this.assert(fileInfo.path === this.testFile, 'Should return correct path');
            this.assert(fileInfo.name === 'test-file.txt', 'Should return correct name');
            this.assert(fileInfo.size === this.testContent.length, 'Should return correct size');
            this.assert(fileInfo.lastModified instanceof Date, 'Should return Date for lastModified');
            this.assert(fileInfo.isFile === true, 'Should identify as file');
            this.assert(fileInfo.isDirectory === false, 'Should not identify as directory');
            this.testsPassed++;
            console.log('  ✅ getFileInfo tests passed');
        }
        catch (error) {
            this.testsFailed++;
            console.log('  ❌ getFileInfo tests failed:', error);
        }
    }
    async testErrorHandling() {
        console.log('Testing error handling...');
        try {
            const nonExistentFile = path.join(this.testDir, 'non-existent-file.txt');
            // Test async version
            try {
                await (0, filesystem_viewer_1.get_last_modification_date_of_file)(nonExistentFile);
                this.assert(false, 'Should throw error for non-existent file');
            }
            catch (error) {
                this.assert(error instanceof Error, 'Should throw Error object');
                this.assert(error.message.includes('Failed to get modification date'), 'Should have descriptive error message');
            }
            // Test sync version
            try {
                (0, filesystem_viewer_1.get_last_modification_date_of_file_sync)(nonExistentFile);
                this.assert(false, 'Should throw error for non-existent file (sync)');
            }
            catch (error) {
                this.assert(error instanceof Error, 'Should throw Error object (sync)');
                this.assert(error.message.includes('Failed to get modification date'), 'Should have descriptive error message (sync)');
            }
            this.testsPassed++;
            console.log('  ✅ Error handling tests passed');
        }
        catch (error) {
            this.testsFailed++;
            console.log('  ❌ Error handling tests failed:', error);
        }
    }
    assert(condition, message) {
        if (!condition) {
            throw new Error(`Assertion failed: ${message}`);
        }
    }
    printResults() {
        console.log('\n📊 Test Results:');
        console.log(`✅ Passed: ${this.testsPassed}`);
        console.log(`❌ Failed: ${this.testsFailed}`);
        console.log(`📈 Total: ${this.testsPassed + this.testsFailed}`);
        if (this.testsFailed === 0) {
            console.log('\n🎉 All tests passed!');
            process.exit(0);
        }
        else {
            console.log('\n💥 Some tests failed!');
            process.exit(1);
        }
    }
}
// Run tests if this file is executed directly
if (require.main === module) {
    const runner = new TestRunner();
    runner.runAllTests().catch(console.error);
}
//# sourceMappingURL=test-runner.js.map