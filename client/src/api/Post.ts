import { z } from "zod";

const PostShema = z.object({
    id: z.string(),
    text: z.string(),
    authorId: z.string(),
    created: z.string(),
});

export type Post = z.infer<typeof PostShema>;

export const PostList = z.array(PostShema);

export type PostList = z.infer<typeof PostList>

function fetchPostlist(): Promise {
    return fetch("/api/posts");
}