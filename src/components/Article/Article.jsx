import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getArticleById } from "../api";
import CommentCard from "./Comments/CommentCard/CommentCard";
import Comments from "./Comments/Comments";
import PostComment from "./Comments/PostComment/PostComment";
import Error from "../Error/Error-lg";
import Vote from "../Vote/Vote";
import { RotatingLines } from "react-loader-spinner";
import styles from "./Article.module.css";

const Article = () => {
  const { article_id } = useParams();
  const [showComments, setShowComments] = useState(false);
  const [article, setArticle] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [commentCount, setCommentCount] = useState(0);
  const [apiError, setApiError] = useState();

  useEffect(() => {
    setIsLoading(true);

    getArticleById(article_id)
      .then((newArticle) => {
        setArticle(newArticle);
        setCommentCount(+newArticle.comment_count);
        setIsLoading(false);
      })
      .catch(({ response }) => {
        const {
          status,
          data: { msg },
        } = response;
        setApiError({ status, msg });
      });
  }, [article_id]);

  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  if (apiError) {
    return <Error err={apiError} />;
  } else if (isLoading) {
    return (
      <div className={styles.loading}>
        <RotatingLines strokeColor="#0c243e" strokeWidth="1" animationDuration="0.75" width="100" />
      </div>
    );
  }

  if (article) {
    const { title, topic, author, body, created_at, votes, article_img_url, comment_count } = article;

    const date = new Date(created_at);

    return (
      <section className={styles.container}>
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
            <p className={styles.dateTime}>
              Created on {date.toLocaleDateString()} at {date.toLocaleTimeString()}
            </p>
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
      </section>
    );
  }
};

export default Article;
