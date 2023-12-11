import { item, imgDiv, title, author, count, votes, dateTime } from "./Card.module.css";

const Card = ({ article }) => {
  const date = new Date(article.created_at).toLocaleDateString();
  const time = new Date(article.created_at).toLocaleTimeString();

  return (
    <li className={item}>
      <div className={votes}>
        <p>⇧</p>
        <p>{article.votes}</p>
        <p>⇩</p>
      </div>
      <div className={title}>
        <h4>{article.title}</h4>
        <h5>{article.topic}</h5>
      </div>

      <p className={author}>Author: {article.author}</p>
      <div className={dateTime}>
        <p>Created on {date}</p>
        <p>at {time}</p>
      </div>

      <div className={imgDiv}>
        <img src={article.article_img_url} alt={article.title} />
      </div>
      <p className={count}>{article.comment_count} comments</p>
    </li>
  );
};

export default Card;
