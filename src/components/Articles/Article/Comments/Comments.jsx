import { useState, useEffect } from "react";
import { getComments } from "../../../../api";
import CommentCard from "./CommentCard/CommentCard";

import { list, heading } from "./Comments.module.css";

const Comments = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getComments(article_id).then((newComments) => {
      setComments(newComments);
      setIsLoading(false);
    });
  }, []);

  return (
    <section>
      <h3 className={heading}>{isLoading ? "Loading..." : "Comments"}</h3>
      <ul className={list}>
        {comments.map((comment) => {
          return <CommentCard key={comment.comment_id} comment={comment} />;
        })}
      </ul>
    </section>
  );
};

export default Comments;
