import { topics as list, topic as item, active } from "./Topics.module.css";
import { Link } from "react-router-dom";

const Topics = ({ topics, currTopic }) => {
  return (
    <nav className={list}>
      {topics.map((topic) => {
        return (
          <Link className={currTopic === topic.slug ? active : item} key={topic.slug} to={`/topics/${topic.slug}`}>
            {topic.slug}
          </Link>
        );
      })}
    </nav>
  );
};

export default Topics;
