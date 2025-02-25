export interface Post {
    /**
     * Идентификатор поста
     */
    id:string;
    text:string;
    authorId:string;
    createdAt:number;
}

export type PostList = Post[];