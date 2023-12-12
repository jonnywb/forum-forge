import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import Vote from "../../Vote/Vote";

const Card = ({ article }) => {
  const { article_id, votes, title, topic, article_img_url, author, comment_count, created_at } = article;

  const date = new Date(created_at);

  return (
    <li className={styles.item}>
      <div className={styles.votes}>
        <Vote article_id={article_id} votes={votes} />
      </div>

      <h3 className={styles.title}>{title}</h3>

      <h4 className={styles.topic}>{topic.charAt(0).toUpperCase() + topic.slice(1)}</h4>

      <Link to={`/articles/${article_id}`} className={styles.imgDiv}>
        <img src={article_img_url} alt={title} />
      </Link>

      <p className={styles.author}>Author: {author}</p>

      <p className={styles.count}>{comment_count} comments</p>

      <p className={styles.dateTime}>
        Created on {date.toLocaleDateString()} at <time>{date.toLocaleTimeString()}</time>
      </p>
    </li>
  );
};

export default Card;
