import { useContext, useDebugValue } from "react";
import { CommentContext } from "../context";

const useComment = () => {
    return useContext(CommentContext)
}
export default useComment