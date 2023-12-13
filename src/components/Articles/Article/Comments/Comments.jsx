import { useState, useEffect } from "react";
import { getComments } from "../../../../api";
import CommentCard from "./CommentCard/CommentCard";
import PostComment from "./PostComment/PostComment";

import { list, heading } from "./Comments.module.css";

const Comments = ({ article_id, show }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getComments(article_id).then((newComments) => {
      setComments(newComments);
      setIsLoading(false);
    });
  }, [article_id]);

  if (show && comments.length) {
    return (
      <section>
        <PostComment article_id={article_id} setComments={setComments} comments={comments} />

        {isLoading ? (
          <h3 className={heading}>"Loading..."</h3>
        ) : (
          <ul className={list}>
            {comments.map((comment) => {
              return <CommentCard key={comment.comment_id} comment={comment} />;
            })}
          </ul>
        )}
      </section>
    );
  } else if (show) {
    return (
      <section>
        <h3 className={heading}>{isLoading ? "Loading..." : "No Comments to display"}</h3>
      </section>
    );
  }
};

export default Comments;
