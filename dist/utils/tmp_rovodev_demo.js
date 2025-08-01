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
// Demo script to test the get_file_size utility
const get_file_size_1 = require("./get_file_size");
const path = __importStar(require("path"));
async function demo() {
    console.log('🔍 File Size Utility Demo\n');
    try {
        // Test with package.json
        const packageJsonPath = path.join(process.cwd(), 'package.json');
        const packageSize = await (0, get_file_size_1.getFileSize)(packageJsonPath);
        const packageFormattedSize = await (0, get_file_size_1.getFormattedFileSize)(packageJsonPath);
        console.log(`📄 package.json:`);
        console.log(`   Raw size: ${packageSize} bytes`);
        console.log(`   Formatted: ${packageFormattedSize}\n`);
        // Test with tsconfig.json
        const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
        const tsconfigSize = await (0, get_file_size_1.getFileSize)(tsconfigPath);
        const tsconfigFormattedSize = await (0, get_file_size_1.getFormattedFileSize)(tsconfigPath);
        console.log(`⚙️  tsconfig.json:`);
        console.log(`   Raw size: ${tsconfigSize} bytes`);
        console.log(`   Formatted: ${tsconfigFormattedSize}\n`);
        // Test formatFileSize with different values
        console.log('📊 Format Examples:');
        console.log(`   ${(0, get_file_size_1.formatFileSize)(0)} (0 bytes)`);
        console.log(`   ${(0, get_file_size_1.formatFileSize)(512)} (512 bytes)`);
        console.log(`   ${(0, get_file_size_1.formatFileSize)(1024)} (1 KB)`);
        console.log(`   ${(0, get_file_size_1.formatFileSize)(1536)} (1.5 KB)`);
        console.log(`   ${(0, get_file_size_1.formatFileSize)(1024 * 1024)} (1 MB)`);
        console.log(`   ${(0, get_file_size_1.formatFileSize)(1024 * 1024 * 1024)} (1 GB)`);
    }
    catch (error) {
        console.error('❌ Error:', error);
    }
}
demo();
