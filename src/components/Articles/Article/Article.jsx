import { useState, useEffect } from "react";

import { useParams, Link } from "react-router-dom";
import { getArticleById } from "../../../api";

import styles from "./Article.module.css";

const Article = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticleById(article_id).then((newArticle) => {
      setArticle(newArticle);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <p className={styles.msg}>Loading...</p>;
  }

  if (article) {
    const { title, topic, author, body, created_at, votes, article_img_url, comment_count } = article;
    return (
      <article className={styles.article}>
        <nav className={styles.articleNav}>
          <Link to="/articles">⬅︎</Link>
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
            <p>Created on {created_at}</p>
          </div>
          <p className={styles.count}>{comment_count} comments</p>
        </footer>
      </article>
    );
  }
};

export default Article;
