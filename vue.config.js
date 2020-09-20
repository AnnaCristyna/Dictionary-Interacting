module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/Interactive-Dictionary/" : "/",

  transpileDependencies: ["quasar"],
  configureWebpack: {
    devServer: {
      headers: { "Access-Control-Allow-Origin": "*" },
    },
  },
  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: false,
    },
  },
};
