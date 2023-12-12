import { item, imgDiv, title, author, topic, count, votes, dateTime } from "./Card.module.css";

import { useNavigate } from "react-router-dom";

const Card = ({ article }) => {
  const date = new Date(article.created_at).toLocaleDateString();
  const time = new Date(article.created_at).toLocaleTimeString();

  const goToArticle = useNavigate();

  return (
    <li className={item}>
      <div className={votes}>
        <p>⬆︎</p>
        <p>{article.votes}</p>
        <p>⇩</p>
      </div>

      <h3 className={title}>{article.title}</h3>

      <h4 className={topic}>{article.topic}</h4>

      <div
        className={imgDiv}
        onClick={() => {
          goToArticle(`/articles/${article.article_id}`);
        }}
      >
        <img src={article.article_img_url} alt={article.title} />
      </div>

      <p className={author}>Author: {article.author}</p>

      <p className={count}>{article.comment_count} comments</p>

      <div className={dateTime}>
        <p>Created on {date}</p>
        <p>
          at <time>{time}</time>
        </p>
      </div>
    </li>
  );
};

export default Card;
