module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/Dictionary-Interacting/" : "/",

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

  publicPath:
    process.env.NODE_ENV === "production" ? "/Dictionary-Interacting/" : "/",
};
