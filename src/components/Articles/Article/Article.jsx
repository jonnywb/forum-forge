import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getArticleById } from "../../../api";
import CommentCard from "./Comments/CommentCard/CommentCard";

import Comments from "./Comments/Comments";
import PostComment from "./Comments/PostComment/PostComment";
import Vote from "../Vote/Vote";
import styles from "./Article.module.css";

const Article = () => {
  const { article_id } = useParams();
  const [showComments, setShowComments] = useState(false);
  const [article, setArticle] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    setIsLoading(true);

    getArticleById(article_id).then((newArticle) => {
      setArticle(newArticle);
      setCommentCount(+newArticle.comment_count);
      setIsLoading(false);
    });
  }, [article_id]);

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
              <Vote article_id={article_id} setArticle={setArticle} votes={votes} />
            </div>
            <div className={styles.title}>
              <h2>{title}</h2>
              <p>{topic.charAt(0).toUpperCase() + topic.slice(1)}</p>
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
            <button className={styles.count} onClick={handleShowComments} disabled={commentCount === 0}>
              {(showComments && commentCount > 0 && "Hide ") || (!showComments && commentCount > 0 && "Show ")}
              {commentCount} comments
            </button>
          </footer>
        </article>

        <Comments
          article_id={article_id}
          show={showComments}
          renderItem={(comments, setComments, com, com_id) => (
            <>
              <PostComment
                article_id={article_id}
                comments={comments}
                setComments={setComments}
                setCommentCount={setCommentCount}
                setShowComments={setShowComments}
              />
              <CommentCard
                key={com_id}
                comment={com}
                comments={comments}
                setComments={setComments}
                setCommentCount={setCommentCount}
                setShowComments={setShowComments}
              />
            </>
          )}
        />
      </>
    );
  }
};

export default Article;
