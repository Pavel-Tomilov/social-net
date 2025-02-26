import { fetchPostlist } from "../../api/Post";
import { useQuery } from "@tanstack/react-query";
import { PostListView } from "./PostListView";
import { Loader } from "../Loader";
import { queryClient } from "../../api/queryClients";

export const FetchPostListView = () => {
    

    const postListQuerry = useQuery ({
        queryFn: fetchPostlist,
        queryKey: ["posts"]
    },
     queryClient);

    switch(postListQuerry.status) {
        
            case"pending":
            return <Loader />;

            case "success":
                return <PostListView postList={postListQuerry.data.list} />;

                case "error":
                    return (
                        <div>
                            <span>Произошла ошибка :( </span>

                            <button onClick = { () => {postListQuerry.refetch()}}>Повторить запрос</button>
                        </div>
                    );
    }
}