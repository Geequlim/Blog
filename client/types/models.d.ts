/** TodoMVC 测试模块 */
declare namespace Todos {

  interface TodoItemData {
    id?: TodoItemId;
    text?: string;
    completed?: boolean;
  }

  type TodoItemId = number;
  type TodoFilterType = 'SHOW_ALL' | 'SHOW_ACTIVE' | 'SHOW_COMPLETED';
  type TodoStoreState = TodoItemData[];
}

/** 社区模块 */
declare namespace Community {

  /** 数据唯一ID */
  type UID = string;

  interface ServerData {
    uid: UID;
    created_at: Date;
    updated_at : Date;
  }

  /** 用户 */
  interface User extends ServerData {
    name: string;
    nick: string;
    avatar: string;
    email: string;
    password: string;
    actived: boolean;
  }
  type UserStoreState = User;

  /** 文章 */
  interface Post extends ServerData {
    author: User|UID;
    title: string;
    content: string;
    tags: string[];
    comments: Comment[] | UID[];
  }
  type PostStoreState = Post[];

  /** 评论 */
  interface Comment extends ServerData {
    author: User|UID;
    target: Post|UID;
    content: string;
  }

}
