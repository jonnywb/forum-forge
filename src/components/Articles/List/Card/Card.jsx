import { item, imgDiv, title, author, topic, count, votes, dateTime } from "./Card.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ article, setArticles }) => {
  const date = new Date(article.created_at);
  const goToArticle = useNavigate();

  const [voteValue, setVoteValue] = useState(0);

  

  return (
    <li className={item}>
      <div className={votes}>
        <button onClick={handleUpVote} disabled={voteValue === 1}>
          {voteValue === 1 ? "⬆︎" : "⇧"}
        </button>
        <p>{article.votes}</p>
        <button onClick={handleDownVote} disabled={voteValue === -1}>
          {voteValue === -1 ? "⬇︎" : "⇩"}
        </button>
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
        <p>Created on {date.toLocaleDateString()}</p>
        <p>
          at <time>{date.toLocaleTimeString()}</time>
        </p>
      </div>
    </li>
  );
};

export default Card;
