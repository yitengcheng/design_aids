const { contextBridge } = require("electron");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

contextBridge.exposeInMainWorld("node", {
  sha256sum(data) {
    const hash = crypto.createHash("sha256");
    hash.update(data);
    return hash.digest("hex");
  },
  join(paths) {
    return path.join(__dirname, paths);
  },
  mkdirSync(filePath) {
    fs.mkdirSync(filePath);
  },
  existsSync(filePath) {
    return fs.existsSync(filePath);
  },
  writeFileSync(filePath, content) {
    fs.writeFileSync(filePath, content);
  },
  readFileSync(filePath) {
    return fs.readFileSync(filePath, "utf8");
  },
});
