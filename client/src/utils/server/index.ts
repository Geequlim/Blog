import axios from 'axios';
const hash256 = require("sha256");
import * as types from './typedef';

/**
 * 服务器协议对接
 *
 * @class Server
 */
export default class Server {

    private apiUrl : string;
    private headers : Object;
    /**
     *
     * @param {string} apiUrl 服务器api地址
     * @memberof Server
     */
    constructor(apiUrl: string, apiKey:string) {
        this.apiUrl = apiUrl;
        this.headers = {
            "Content-Type": "application/json",
            "x-api-key": hash256(apiKey),
        };
    }


    private normalizeModel(raw: object) {
        for(let key of Object.keys(raw)) {
            const value: string = raw[key];
            if(typeof(value) == 'string' && ((value.startsWith('[') && value.endsWith("]")) || (value.startsWith("{") && value.endsWith("}")))) {
                raw[key] = JSON.parse(value);
            }
        }
    }

    /**
     * 获取指定路径的json对象
     * @param api 请求的API地址,相对路径
     */
    public async fetch_json(api):Promise<any> {
        const url = `${this.apiUrl}/${api}`;
        let response = await axios.request({headers: this.headers, url});
        let contentType = response.headers["content-type"];
        if(contentType && contentType.includes("application/json")) {
            const ret = response.data;
            if (!ret || ('error' in ret && 'code' in ret)) throw ret;
            this.normalizeModel(ret);
            return ret;
        } else {
            throw {error: "Invalid content type", code: -1, url};
        }
    }

    /**
     * 获取指定的数据对象
     *
     * @param {ModelType} type      数据类型
     * @param {string} object_id    对象id
     * @returns {Promise<Model>}    获取到的对象
     * @memberof Server
     */
    public async fetch_model(type:types.ModelType, object_id: string):Promise<Community.Model> {
        const url = `${type}/${object_id}`;
        let model: Community.Model = await this.fetch_json(url);
        if (model && 'updated_at' in model && 'created_at' in model && 'object_id' in model) {
            model = types.modelize<Community.Model>(model);
        } else {
            throw {error: "Invalid object", code: -1, url};
        }
        return model;
    }

    /**
     * 查询数据模型
     *
     * @param {types.Query} query 查询器
     * @returns {Promise<types.QueryResult>} 查询结果
     * @memberof Server
     */
    public async query_model(query : types.Query) : Promise <types.QueryResult> {
        let params = "";
        for (let key of Object.keys(query)) {
            if(key === 'model') continue;
            params += params.length ? "&" : "?";
            params += `${key}=${query[key]}`;
        }
        const result : types.QueryResult = await this.fetch_json(`${query.model}${params}`);
        for(let m of result.data) {
            this.normalizeModel(m);
        }
        return result;
    }
};
