import { useState, useEffect } from "react";
import { getArticles } from "../../../api";
import Filters from "./Filters/Filters";
import Page from "./Page/Page";
import Card from "./Card/Card";
import list from "./List.module.css";

const List = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles().then((newArticles) => {
      setArticles(newArticles);
    });
  }, []);

  return (
    <section>
      <div className={list.sectionHead}>
        <h2>Articles</h2>
      </div>
      <Filters />
      <ul className={list.list}>
        <p>Click to view an article</p>
        {articles.map((article) => {
          return <Card key={article.article_id} article={article} />;
        })}
      </ul>
      <Page />
    </section>
  );
};

export default List;
