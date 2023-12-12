import { item, imgDiv, title, author, topic, count, votes, dateTime } from "./Card.module.css";
import { Link } from "react-router-dom";

import Vote from "../../Vote/Vote";

const Card = ({ article, setArticles }) => {
  const date = new Date(article.created_at);

  return (
    <li className={item}>
      <div className={votes}>
        <Vote article_id={article.article_id} setArticles={setArticles} votes={article.votes} />
      </div>

      <h3 className={title}>{article.title}</h3>

      <h4 className={topic}>{article.topic.charAt(0).toUpperCase() + article.topic.slice(1)}</h4>

      <Link to={`/articles/${article.article_id}`} className={imgDiv}>
        <img src={article.article_img_url} alt={article.title} />
      </Link>

      <p className={author}>Author: {article.author}</p>

      <p className={count}>{article.comment_count} comments</p>

      <p className={dateTime}>
        Created on {date.toLocaleDateString()} at <time>{date.toLocaleTimeString()}</time>
      </p>
    </li>
  );
};

export default Card;
