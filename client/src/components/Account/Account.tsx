import { fetchMe } from "../../api/User"
import { useQuery } from "@tanstack/react-query"
import { Loader } from "../Loader";
import { AuthForm } from "../AuthForm";
import { PostForm } from "../PostForm";
import { queryClient } from "../../api/queryClients";


export const Account = () => {
    const meQuery = useQuery ({
        queryFn: () => fetchMe(),
        queryKey: ["users", "me"],
    },
    queryClient
);

    switch (meQuery.status) {
        case "pending":
            return <Loader />;


            case "error":
                return <AuthForm />;

                case "success":
                    return <PostForm/>
    }
};