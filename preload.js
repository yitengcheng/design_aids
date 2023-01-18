const { contextBridge } = require("electron");
const crypto = require("crypto");
contextBridge.exposeInMainWorld("nodeCrypto", {
  sha256sum(data) {
    const hash = crypto.createHash("sha256");
    hash.update(data);
    return hash.digest("hex");
  },
});
