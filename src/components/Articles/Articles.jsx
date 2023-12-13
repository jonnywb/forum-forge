import List from "./List/List";
import Article from "./Article/Article";
import { article } from "./Articles.module.css";

import { Routes, Route } from "react-router-dom";

const Articles = () => {
  return (
    <section className={article}>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/articles" element={<List />} />
        <Route path="/articles/:article_id" element={<Article />} />
        <Route path="/topics/:topic" element={<List />} />
      </Routes>
    </section>
  );
};

export default Articles;
