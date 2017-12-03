import Server from "./server";

/** 全局配置 */
export const config = require("json-loader!yaml-loader!../../config.yaml");

/** 服务器协议 */
export const server = new Server(config.apiUrl, config.apiKey);
