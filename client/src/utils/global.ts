import Server from "./server";
import * as typesdefs from './server/typedef';

/** 全局配置 */
export const config = require("json-loader!yaml-loader!../../config.yaml");

/** 服务器协议 */
export const server = new Server(config.server.apiUrl, config.server.apiKey);

/** 服务器数据类型 */
export const types = typesdefs;
