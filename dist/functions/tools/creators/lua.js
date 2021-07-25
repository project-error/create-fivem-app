"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFiles = void 0;
const fs_1 = __importDefault(require("fs"));
const createFiles = (resourcePath, uiFramework) => {
    fs_1.default.writeFileSync(`${resourcePath}/client/client.lua`, '-- Start coding!');
    fs_1.default.writeFileSync(`${resourcePath}/server/server.lua`, '-- Start coding!');
};
exports.createFiles = createFiles;
//# sourceMappingURL=lua.js.map