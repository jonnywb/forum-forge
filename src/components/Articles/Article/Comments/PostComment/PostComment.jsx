import { postComment } from "../../../../../api";
import { useState, useContext } from "react";
import { commentForm, label, textarea, submit } from "./PostComment.module.css";
import { UserContext } from "../../../../Context/UserProvider";

const PostComment = ({ article_id, setComments, comments }) => {
  const [input, setInput] = useState("");
  const { user } = useContext(UserContext);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newComment = {
      comment_id: comments.length + 1,
      author: user.username,
      body: input,
    };

    setComments([newComment, ...comments]);

    try {
      await postComment(article_id, user.username, input);
      setInput("");
    } catch (error) {
      console.error(error);

      const updatedComments = await getComments(article_id);
      setComments(updatedComments);
    }
  };

  return (
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
      />
      <button className={submit}>Submit</button>
    </form>
  );
};

export default PostComment;
