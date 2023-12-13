import { item, content, votes, author, body, del } from "./CommentCard.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteComment } from "../../../../../api";
import { useContext } from "react";
import { UserContext } from "../../../../Context/UserProvider";

const CommentCard = ({ comment, setComments, setCommentCount, setShowComments }) => {
  const { user } = useContext(UserContext);

  const handleClick = async () => {
    setComments((currComments) => {
      const filteredComments = currComments.filter((item) => item.comment_id !== comment.comment_id);

      setCommentCount((currCount) => {
        if (currCount - 1 === 0) {
          setShowComments(false);
        }
        return currCount - 1;
      });

      return filteredComments;
    });

    try {
      await deleteComment(comment.comment_id);
    } catch (err) {
      console.log(err);
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
        {comment.author === user.username && <DeleteIcon className={del} onClick={handleClick} />}
      </div>
    </li>
  );
};

export default CommentCard;
