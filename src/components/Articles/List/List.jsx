import Filters from "./Filters/Filters";
import Page from "./Page/Page";
import Card from "./Card/Card";
import list from "./List.module.css";
import Vote from "../Vote/Vote";
import Topics from "../Topics/Topics";

import { useState, useEffect } from "react";
import { getArticles } from "../../../api";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const List = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sort_by, setSort_by] = useState();
  const [order, setOrder] = useState();
  const { topic } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = { topic, order, sort_by };

    setIsLoading(true);

    getArticles(params).then((newArticles) => {
      setArticles(newArticles);
      setIsLoading(false);
    });

    const searchParams = new URLSearchParams(location.search);

    if (topic) {
      searchParams.set("topic", topic);
    }

    if (sort_by) {
      searchParams.set("sort_by", sort_by);
    }

    if (order) {
      searchParams.set("order", order);
    }

    const stringParams = searchParams.toString();

    console.log(stringParams);

    navigate({
      pathname: location.pathname,
      search: stringParams,
    });
  }, [topic, order, sort_by]);

  if (isLoading) <p>Loading...</p>;

  return (
    <>
      <div className={list.sectionHead}>
        <h2>Articles</h2>
      </div>
      <Topics currTopic={topic} />
      <Filters setSort_by={setSort_by} setOrder={setOrder} />
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
