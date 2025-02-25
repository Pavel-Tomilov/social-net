import { z } from "zod";
import { useState } from "react";
import { useEffect } from "react";

const PostSchema = z.object({
    id: z.string(),
    text: z.string(),
    authorId: z.string(),
    created: z.string(),
});

export type Post = z.infer<typeof PostSchema>;

export const PostList = z.array(PostSchema);

export type PostList = z.infer<typeof PostList>

export const FetchPostListSchema = z.object({
    list: PostList,
})

type FetchPostListResponse = z.infer<typeof FetchPostListSchema>;

export function fetchPostlist(): Promise<FetchPostListResponse> {
    return fetch("/api/posts")
    .then((response) => response.json())
    .then((data) => FetchPostListSchema.parse(data));
}

interface IdleRequestState {
status: "idle;"
}

interface LoadingRequestState {
status: "pending";
}

interface SuccesRequestState {
status: "succes";
data: PostList;
}

interface ErrorRequestState {
status: "error"; 
error: unknown;  
}

type RequestState = 
| IdleRequestState 
|LoadingRequestState
|SuccesRequestState
|ErrorRequestState

export function usePostList() {
    const [state, setState] = useState<RequestState>({status: "idle"})


useEffect(() => {
    if (state.status ==="pending") {
        fetchPostlist()
        .then((data) => {
            setState({ status:"succes", data: data.list});
        })
        .catch((error) => {
            setState({ status: "error", error});
        });
    }
}, [state]);

useEffect(() => {
    setState({ status:"pending"});
}, []);

const refetch = () => {
    setState({ status: "pending" })
};

return {
    state, 
    refetch,
};
}