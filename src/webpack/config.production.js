module.exports = [
  require("./make")({
    commonsChunk: true,
    longTermCaching: true,
    separateStylesheet: false,
    // minimize: true,
    devtool: "source-map"
  }),
  require("./make")({
    prerender: true
  })
];