module.exports = function(babel) {
  babel.cache(true);

  return {
    presets: ["@babel/preset-env"],
    comments: false,
    plugins: ["@babel/plugin-proposal-object-rest-spread"]
  };
};
