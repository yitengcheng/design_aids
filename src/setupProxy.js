const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/designerApi",
    createProxyMiddleware({
      target: "http://localhost:3000", // 后台服务地址以及端口号
      changeOrigin: true, // 是否开启代理
      pathRewrite: {
        "/designerApi": "/designerApi", // 代理名称
      },
    })
  );
};
