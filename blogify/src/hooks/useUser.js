import { useContext, useDebugValue } from "react";
import { ProfileContext } from "../context";

const useUser = () => {
    const { user } = useContext(ProfileContext)
    useDebugValue(user, user => user ? "user available" : "user not available")
    return useContext(ProfileContext)
}
export default useUser