import { useState } from "react";
import { CommentContext } from "../context";

const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  return (
    <CommentContext.Provider value={{ comments, setComments }}>
      {children}
    </CommentContext.Provider>
  );
};

export default CommentProvider;
