import { postComment } from "../../../../../api";
import { useState, useContext } from "react";
import { commentForm, label, textarea, submit, error } from "./PostComment.module.css";
import { UserContext } from "../../../../Context/UserProvider";

const PostComment = ({ article_id, setComments, comments, setCommentCount, setShowComments }) => {
  const [input, setInput] = useState("");
  const { user } = useContext(UserContext);
  const [apiError, setApiError] = useState(false);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const newComment = await postComment(article_id, user.username, input);
      setComments([newComment, ...comments]);
      setShowComments(true);
      setCommentCount((currCount) => {
        return currCount + 1;
      });
      setInput("");
    } catch (err) {
      console.log(err);
      setApiError(true);
    }
  };

  return (
    <>
      {apiError && <p className={error}>There was an error contacting the server, please try again later.</p>}
      <form className={commentForm} onSubmit={handleSubmit}>
        <label className={label} htmlFor="comment">
          Comment
        </label>

        <textarea
          id="comment"
          style={{ width: "none" }}
          className={textarea}
          onChange={handleChange}
          value={input}
          placeholder="Write a comment..."
          required
        />
        <button className={submit}>Submit</button>
      </form>
    </>
  );
};

export default PostComment;
