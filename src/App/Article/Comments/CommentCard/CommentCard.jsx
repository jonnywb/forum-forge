import { item, content, votes, author, body, del } from "./CommentCard.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteComment } from "../../../api";
import { useContext } from "react";
import { UserContext } from "../../../Context/UserProvider";

const CommentCard = ({ comments, comment, setComments, setCommentCount, setShowComments }) => {
  const { user } = useContext(UserContext);

  const handleDelete = async () => {
    const backup = { ...comment };
    try {
      setComments((currComments) => {
        const filteredComments = currComments.filter((item) => {
          return item.comment_id !== comment.comment_id;
        });

        return filteredComments;
      });
      if (comments.length === 1) {
        setShowComments(false);
      }
      setCommentCount((currCount) => {
        return currCount - 1;
      });

      await deleteComment(comment.comment_id);
    } catch (err) {
      setComments((currComments) => {
        return [backup, ...currComments];
      });

      setShowComments(true);
      setCommentCount((currCount) => {
        return currCount + 1;
      });
    }
  };

  return (
    <li className={item}>
      <p className={author}>{comment.author}</p>
      <div className={content}>
        <div className={votes}>
          <p>⬆︎</p>
          <p>{comment.votes}</p>
          <p>⇩</p>
        </div>
        <p className={body}>{comment.body}</p>
        {comment.author === user.username && <DeleteIcon className={del} onClick={handleDelete} />}
      </div>
    </li>
  );
};

export default CommentCard;
