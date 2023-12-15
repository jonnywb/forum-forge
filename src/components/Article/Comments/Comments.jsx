import { useState, useEffect } from "react";
import { getComments } from "../../api";
import { RotatingLines } from "react-loader-spinner";

import { list, heading, loading } from "./Comments.module.css";

const Comments = ({ renderItem, article_id, show }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getComments(article_id).then((newComments) => {
      setComments(newComments);
      setIsLoading(false);
    });
  }, [article_id]);
  return (
    <section>
      {renderItem(comments, setComments).props.children[0]}
      {show && isLoading && (
        <div className={loading}>
          <RotatingLines strokeColor="#0c243e" strokeWidth="1" animationDuration="0.75" width="100" />
        </div>
      )}
      {show && !isLoading && (
        <ul className={list}>
          {comments.length ? (
            comments.map((comment) => {
              return renderItem(comments, setComments, comment, comment.comment_id).props.children[1];
            })
          ) : (
            <h3 className={heading}>No Comments</h3>
          )}
        </ul>
      )}
    </section>
  );
};

export default Comments;
