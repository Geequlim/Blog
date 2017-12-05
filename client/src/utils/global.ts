import Server from "./server";
import * as types from './server/typedef';

/** 全局配置 */
export const config = require("json-loader!yaml-loader!../../config.yaml");

/** 服务器协议 */
export const server = new Server(config.server.apiUrl, config.server.apiKey);

/** 服务器数据类型 */
export const CoreTypes = types;

export const queryString = require('query-string');
