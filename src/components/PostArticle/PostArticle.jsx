import { postArticle, header } from "./PostArticle.module.css";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../Context/UserProvider";
import { getTopics } from "../api";

const PostArticle = () => {
  const [topics, setTopics] = useState();
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [hideCreateTopic, setHideCreateTopic] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    getTopics().then((newTopics) => {
      setTopics(newTopics);
    });
  }, []);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTopicChange = (event) => {
    if (event.target.value === "create") {
      setHideCreateTopic(false);
    } else {
      setHideCreateTopic(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  if (topics) {
    return (
      <section className={postArticle}>
        <h2 className={header}>New Article</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title
            <input type="text" onChange={handleTitleChange} value={title} required></input>
          </label>

          <label>
            Body
            <textarea value={body} required></textarea>
          </label>

          <label>
            Image URL
            <input type="url" required></input>
          </label>

          <label>
            Topic
            <select onChange={handleTopicChange}>
              {topics.map((topic) => (
                <option value={topic.slug} key={topic.slug}>
                  {topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}
                </option>
              ))}
              <option value="create">+ New</option>
            </select>
          </label>

          <label hidden={hideCreateTopic}>
            New Topic
            <input disabled={hideCreateTopic} placeholder="New topic name..."></input>
          </label>

          <label hidden={hideCreateTopic}>
            Description
            <input disabled={hideCreateTopic}></input>
          </label>

          <button>Submit</button>
        </form>
      </section>
    );
  }
};

export default PostArticle;
