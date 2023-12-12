import { item, content, votes, author, body } from "./CommentCard.module.css";

const CommentCard = ({ comment }) => {
  const date = new Date(comment.created_at);

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
      </div>
    </li>
  );
};

export default CommentCard;
