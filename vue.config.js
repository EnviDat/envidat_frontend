process.env.VUE_APP_VERSION = require("./package.json").version;

console.log(`starting ${process.env.VUE_APP_VERSION} on ${process.env.NODE_ENV}`);

module.exports = {
  runtimeCompiler: true,
  css: {
    modules: true,
    sourceMap: true
  },
  pluginOptions: {
    storybook: {
      allowedPlugins: ["define"]
    }
  },
  devServer: {
    proxy: {
      "/api/": {
        // target: "https://www.envidat.ch/ui/proxy/ServiceProxyServlet?server=0&serverpath=",
        target: "https://www.envidat.ch/",
        changeOrigin: true,
        toProxy: true
      }
    }
  }
  // devServer: {
  //   // assetsSubDirectory: "static",
  //   // assetsPublicPath: "/",
  //   proxy: {
  //     "/api": {
  //       target: "https://www.envidat.ch/ui/proxy/ServiceProxyServlet?server=0&serverpath=",
  //       // target: 'http://www.envidat.ch',
  //       changeOrigin: true,
  //       secure: false,
  //       logLevel: "info",
  //       // pathRewrite: function(path, req) {
  //       //   const from = path;
  //       //   // path = encodeURIComponent(path);
  //       //   path = path.replace("?", "&amp;");
  //       //   path = path.replace("'", "%22");
  //       //   console.log("replaced path from " + from + " to: " + path + " with req " + req.url);
  //       //   return path;
  //       // }
  //       error: function(err, req, res) {
  //         console.log("proxy error: " + err);
  //         // res.writeHead(500, {
  //         //   'Content-Type': 'text/plain'
  //         // });

  //         // res.end('Something went wrong. And we are reporting a custom error message.');
  //       }
  //     }
  //   }
  // }
};
