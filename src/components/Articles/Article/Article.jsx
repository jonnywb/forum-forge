import { useState, useEffect } from "react";

import { useParams, Link } from "react-router-dom";
import { getArticleById } from "../../../api";

import Comments from "./Comments/Comments";
import styles from "./Article.module.css";

const Article = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    getArticleById(article_id).then((newArticle) => {
      setArticle(newArticle);
      setIsLoading(false);
    });
  }, []);

  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  if (isLoading) {
    return <p className={styles.msg}>Loading...</p>;
  }

  if (article) {
    const { title, topic, author, body, created_at, votes, article_img_url, comment_count } = article;

    const date = new Date(created_at);

    return (
      <>
        <article className={styles.article}>
          <nav className={styles.articleNav}>
            <Link to="/articles">
              <span>⬅︎</span> Back
            </Link>
          </nav>
          <header className={styles.sectionHead}>
            <div className={styles.votes}>
              <p>⬆︎</p>
              <p>{votes}</p>
              <p>⇩</p>
            </div>
            <div className={styles.title}>
              <h2>{title}</h2>
              <p>{topic}</p>
            </div>

            <p className={styles.author}>Author: {author}</p>
          </header>

          <div className={styles.imgDiv}>
            <img src={article_img_url} alt={title} />
          </div>

          <p className={styles.body}>{body}</p>

          <footer className={styles.articleFoot}>
            <div className={styles.dateTime}>
              <p>
                Created on {date.toLocaleDateString()} at {date.toLocaleTimeString()}
              </p>
            </div>
            <button className={styles.count} onClick={handleShowComments}>
              Show {comment_count} comments
            </button>
          </footer>
        </article>
        {showComments && <Comments article_id={article_id} />}
      </>
    );
  }
};

export default Article;
