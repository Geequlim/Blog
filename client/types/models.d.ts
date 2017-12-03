/** 社区模块 */
declare namespace Community {

    /** 数据唯一ID */
    type UID = string;

    /** 基础数据模型基类 */
    interface Model {
        created_at: Date,
        updated_at: Date,
        object_id: UID
    }

    /** 用户 */
    interface User extends Model {
        name: string;
        nick: string;
        avatar: string;
        email: string;
        password: string;
        actived: boolean;
    }

    /** 文章 */
    interface Post extends Model {
        author: User | UID;
        title: string;
        content: string;
        tags: string[];
        comments: Comment[] | UID[];
    }


    /** 评论 */
    interface Comment extends Model {
        author: User | UID;
        target: Post | UID;
        content: string;
    }

    /* ======= redux ============ */

    type UserStoreState = User;
    type PostStoreState = Post[];

}
