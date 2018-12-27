/**
 * 项目编译前初始化脚本
 */
const fs = require("fs");
const path = require("path");

const getEnvironmentValues = () => {
    const env = process.env;
    console.log("@env", env);
    return env
};

const updateConfigFileByEnvironmentValues = () => env => {
    const configFileContent = `
const config = {
    apiServer: {
        protocol: "${env.APISERVER_PROTOCOL || "http"}",
        host: "${env.APISERVER_HOST || "localhost"}",
        port: "${env.APISERVER_PORT || "7000"}",
    },
};

export default config;
    `;
    console.log(configFileContent);
    // write to file
    const configFilePath = path.join(__dirname, "./src/config.js");
    try {
        fs.writeFileSync(configFilePath, configFileContent, {encoding: "utf8"});
        console.log(`[Success] Write file content complete: ${configFilePath}`);
    } catch (error) {
        console.log(`[Error] Write file content failed: ${configFilePath}`);
    }
};

const init = () => {
    console.log("run init...");
    updateConfigFileByEnvironmentValues()(getEnvironmentValues());
};

init();