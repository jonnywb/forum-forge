import { useState, useEffect } from "react";
import { getTopics } from "../../../api";
import { topics as list, topic as item } from "./Topics.module.css";
import { Link } from "react-router-dom";

const Topics = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then((newTopics) => {
      setTopics(newTopics);
    });
  }, []);

  return (
    <nav className={list}>
      {topics.map((topic) => {
        return (
          <Link className={item} key={topic.slug} to={`/topics/${topic.slug}`}>
            {topic.slug}
          </Link>
        );
      })}
    </nav>
  );
};

export default Topics;
