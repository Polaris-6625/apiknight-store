const {devConfig} = require("./dev.config.js");
const { prodConfig } = require("./prod.config.js");
const { vueDevConfig } = require("./vue.dev.config.js");

module.exports = (env,argv) => {
    if (argv.mode === "development") {
        return devConfig;
    }
    else if (argv.mode === "production") {
        return prodConfig;
    }
    else if (argv.mode === "development-vue3") {
        console.log("vue3 dev mode",vueDevConfig);
        return vueDevConfig
    }
};