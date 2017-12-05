/** 数据模型类型 */
export enum ModelType {
    User = "user",
    Post = "post",
    Comment = "comment",
}

/** 条件查询类型 */
export enum QueryType {
    User = "users",
    Post = "posts",
    Comment = "comments",
}

/** 查询类型 */
export type Query = PostQuery | UserQuery | CommentQuery;
/** 模型类型 */
export type Model = Community.Post | Community.Comment | Community.User;
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
 * 条件查询结果
 *
 * @export
 * @interface QueryResult
 */
export interface QueryResult {
    data: Model[];
    total: number;
    page: number;
    page_size: number;
    max_page: number;
    page_count: number;
}

/** 查询器 */
export interface QueryBase {
    model: QueryType;
    page ? : number;
    page_size ? : number;
    keyword ? : string;
}

/** 文章查询器 */
export interface PostQuery extends QueryBase {
    author ? : string;
    tag ? : string;
    title ? : string;
}

/** 评论查询器 */
export interface CommentQuery extends QueryBase {
    author ? : string;
    target ? : string;
}

/** 用户查询器 */
export interface UserQuery extends QueryBase {}


/**
 * 格式化请求返回的数据对象
 * @param obj 网络请求返回的数据对象
 */
export function modelize < T extends Community.Model > (obj: any): T {
    if (obj && 'updated_at' in obj && 'created_at' in obj && 'object_id' in obj) {
        obj.updated_at = new Date(obj.updated_at);
        obj.created_at = new Date(obj.created_at);
        // Parse Array<string>
        for (const key in obj) {
            let value = obj[key];
            if (typeof (value) == "string" && value.startsWith('[') && value.endsWith(']')) {
                obj[key] = JSON.parse(value);
            }
        }
    }
    let model: T = obj;
    return model;
}
