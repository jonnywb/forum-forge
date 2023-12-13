import Filters from "./Filters/Filters";
import Page from "./Page/Page";
import Card from "./Card/Card";
import list from "./List.module.css";
import Vote from "../Vote/Vote";
import Topics from "../Topics/Topics";

import { useState, useEffect } from "react";
import { getArticles } from "../../../api";
import { useParams } from "react-router-dom";

const List = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sort, setSort] = useState();
  const [order, setOrder] = useState();
  const { topic } = useParams();

  useEffect(() => {
    const params = { topic };
    setIsLoading(true);

    getArticles(params).then((newArticles) => {
      setArticles(newArticles);
      setIsLoading(false);
    });
  }, [topic]);

  if (isLoading) <p>Loading...</p>;

  return (
    <>
      <div className={list.sectionHead}>
        <h2>Articles</h2>
      </div>
      <Topics currTopic={topic} />
      <Filters setSort={setSort} setOrder={setOrder} />
      <ul className={list.list}>
        <p>Click the image to view article</p>
        {articles.map((article) => {
          return (
            <Card key={article.article_id} article={article}>
              <Vote article_id={article.article_id} setArticles={setArticles} votes={article.votes} />
            </Card>
          );
        })}
      </ul>
      <Page />
    </>
  );
};

export default List;
