import List from "./List/List";
import Card from "./List/Card/Card";
import Article from "./Article/Article";

import { Routes, Route } from "react-router-dom";

const Articles = () => {
  return (
    <section id="articles">
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/articles" element={<List />} />
        <Route path="/articles/:article_id" element={<Article />} />
      </Routes>
    </section>
  );
};

export default Articles;
