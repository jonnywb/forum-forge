import Filters from "./Filters/Filters";
import Page from "./Page/Page";
import Card from "./Card/Card";
import list from "./List.module.css";
import Vote from "../Vote/Vote";
import Topics from "../Topics/Topics";
import Error from "../Error/Error-lg";
import { useState, useEffect } from "react";
import { getArticles, getTopics } from "../api";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const List = () => {
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  const [topicsLoaded, setTopicsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sort_by, setSort_by] = useState();
  const [order, setOrder] = useState();
  const [apiError, setApiError] = useState();
  const { topic } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getTopics().then((newTopics) => {
      setTopics(newTopics);
      setTopicsLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!topicsLoaded) {
      return;
    }

    setIsLoading(true);

    const params = { order, sort_by };

    if (topics.find((t) => t.slug === topic)) {
      params.topic = topic;
    } else if (topic) {
      setApiError({ status: 404, msg: "Topic Not Found" });
    }

    getArticles(params)
      .then((newArticles) => {
        setArticles(newArticles);
        setIsLoading(false);
      })
      .catch(({ response }) => {
        setApiError({ status: response.status, msg: response.data.msg });
      });

    const searchParams = new URLSearchParams(location.search);

    if (sort_by) {
      searchParams.set("sort_by", sort_by);
    }

    if (order) {
      searchParams.set("order", order);
    }

    const stringParams = searchParams.toString();

    navigate({
      pathname: location.pathname,
      search: stringParams,
    });
  }, [topic, order, sort_by, topicsLoaded]);

  if (apiError) {
    return <Error err={apiError} />;
  } else {
    return (
      <section className={list.articles}>
        <div className={list.sectionHead}>
          <h2>Articles</h2>
        </div>
        <Topics topics={topics} />
        <Filters setSort_by={setSort_by} setOrder={setOrder} />
        {!isLoading ? (
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
        ) : (
          <p className={list.msg}>Loading...</p>
        )}
        <Page />
      </section>
    );
  }
};

export default List;
