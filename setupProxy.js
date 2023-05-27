const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/productsupd",
    createProxyMiddleware({
      target: "https://kb-server-devsobuj910.vercel.app",
      changeOrigin: true
    })
  );
};
