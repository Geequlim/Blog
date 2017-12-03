/** 数据模型类型 */
export enum ModelType {
    User = "user",
    Post = "post",
    Comment = "comment",
}

/**
 * 服务器错误响应结构
 *
 * @export
 * @interface ErrorResponse
 */
export interface ErrorResponse {
    code: number,
    error: string,
    url: string
}

/**
 * 格式化请求返回的数据对象
 * @param obj 网络请求返回的数据对象
 */
export function modelize<T extends Community.Model>(obj:any):T {
    if (obj && 'updated_at' in obj && 'created_at' in obj && 'object_id' in obj) {
        obj.updated_at = new Date(obj.updated_at);
        obj.created_at = new Date(obj.created_at);
        // Parse Array<string>
        for (const key in obj) {
            let value = obj[key];
            if(typeof(value) == "string" && value.startsWith('[') && value.endsWith(']')) {
                obj[key] = JSON.parse(value);
            }
        }
    }
    let model:T = obj;
    return model;
}
