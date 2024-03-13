import { useContext } from "react";
import { BlogsContext } from "../context";

const useBlogs = () => {
    return useContext(BlogsContext)
}
export default useBlogs