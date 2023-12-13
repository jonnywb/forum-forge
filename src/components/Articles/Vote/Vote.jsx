import { useState } from "react";
import { voteArticle } from "../../../api";
import styles from "./Vote.module.css";

const Vote = ({ article_id, setArticle, setArticles, votes }) => {
  const [voteValue, setVoteValue] = useState(0);

  const handleVote = async (vote) => {
    setVoteValue((current) => {
      return (current += vote);
    });

    if (!setArticle) {
      setArticles((currArticles) => {
        const updatedArticles = currArticles.map((item) => {
          const newVotes = item.votes + vote;
          if (item.article_id === article_id) {
            return { ...item, votes: newVotes };
          }
          return item;
        });
        return updatedArticles;
      });
    } else {
      setArticle((currArticle) => {
        const newVotes = currArticle.votes + vote;
        return { ...currArticle, votes: newVotes };
      });
    }

    try {
      await voteArticle(article_id, vote);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpVote = () => {
    handleVote(1);
  };

  const handleDownVote = () => {
    handleVote(-1);
  };

  return (
    <>
      <button className={styles.arrow} onClick={handleUpVote} disabled={voteValue === 1}>
        {voteValue === 1 ? "⬆︎" : "⇧"}
      </button>
      <p>{votes}</p>
      <button className={styles.arrow} onClick={handleDownVote} disabled={voteValue === -1}>
        {voteValue === -1 ? "⬇︎" : "⇩"}
      </button>
    </>
  );
};

export default Vote;
