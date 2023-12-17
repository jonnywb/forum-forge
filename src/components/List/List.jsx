import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import { RotatingLines } from "react-loader-spinner";
import { Pagination } from "@mui/material";

import { getArticles, getTopics } from "../api";

import Filters from "./Filters/Filters";
import Card from "./Card/Card";
import Vote from "../Vote/Vote";
import Topics from "../Topics/Topics";
import Error from "../Error/Error-lg";

import listStyles from "./List.module.css";

const List = () => {
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  const [topicsLoaded, setTopicsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sort_by, setSort_by] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const [apiError, setApiError] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pageCount, setPageCount] = useState(1);

  const { topic } = useParams();

  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  const validSortBy = ["votes", "comment_count", "created_at"];
  const validOrder = ["asc", "desc"];

  useEffect(() => {
    getTopics().then((newTopics) => {
      setTopics(newTopics);
      setTopicsLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (topicsLoaded) {
      let params = {
        topic,
        p: 1,
        limit: 10,
        sort_by: "created_at",
        order: "desc",
      };

      getArticles(params)
        .then(({ articles, total_count }) => {
          setArticles(articles);

          setPageCount(Math.ceil(total_count / limit));

          setIsLoading(false);
        })
        .catch((err) => {
          if (err.response) {
            setApiError({ status: response.status, msg: response.data.msg });
          } else {
            setApiError({ status: 500, msg: "Internal Server Error" });
          }
        });
    }
  }, [topic]);

  useEffect(() => {
    if (topicsLoaded) {
      let params = { order, sort_by, p: page, limit };
      const searchParams = new URLSearchParams(search);

      if (topics.find((t) => t.slug === topic)) {
        params.topic = topic;
      } else if (topic) {
        setApiError({ status: 404, msg: "Topic Not Found" });
      }

      const searchParamsSort = searchParams.get("sort_by");
      const searchParamsOrder = searchParams.get("order");
      const searchParamsLimit = searchParams.get("limit");
      const searchParamsPage = searchParams.get("p");

      if (sort_by) {
        searchParams.set("sort_by", sort_by);
      } else if (searchParamsSort) {
        if (validSortBy.includes(searchParamsSort)) {
          params.sort_by = searchParamsSort;
        } else {
          setApiError({ status: 400, msg: "Bad Request" });
        }
      }

      if (order) {
        searchParams.set("order", order);
      } else if (searchParamsOrder) {
        if (validOrder.includes(searchParamsOrder)) {
          params.order = searchParamsOrder;
        } else {
          setApiError({ status: 400, msg: "Bad Request" });
        }
      }

      if (limit) {
        searchParams.set("limit", limit);
      } else if (searchParamsLimit) {
        params.limit = searchParamsLimit;
      }

      if (page) {
        searchParams.set("p", page);
      } else if (searchParamsPage) {
        params.p = searchParamsPage;
      }

      const stringParams = searchParams.toString();

      navigate({
        pathname: pathname,
        search: stringParams,
      });

      getArticles(params)
        .then(({ articles, total_count }) => {
          setArticles(articles);

          setPageCount(Math.ceil(total_count / limit));

          setIsLoading(false);
        })
        .catch((err) => {
          if (err.response) {
            setApiError({ status: response.status, msg: response.data.msg });
          } else {
            setApiError({ status: 500, msg: "Internal Server Error" });
          }
        });
    }
  }, [order, sort_by, limit, page, topicsLoaded]);

  if (apiError) {
    return <Error err={apiError} />;
  } else {
    const { articlesCss, sectionHead, list, loading } = listStyles;

    return (
      <section className={articlesCss}>
        <div className={sectionHead}>
          <h2>Articles</h2>
        </div>

        <Topics topics={topics} />

        <Filters setSort_by={setSort_by} setOrder={setOrder} />

        {!isLoading && (
          <ul className={list}>
            <p>Click the image to view article</p>
            {articles.map((article) => {
              return (
                <Card key={article.article_id} article={article}>
                  <Vote article_id={article.article_id} setArticles={setArticles} votes={article.votes} />
                </Card>
              );
            })}
          </ul>
        )}

        {isLoading && (
          <div className={loading}>
            <RotatingLines strokeColor="#0c243e" strokeWidth="1" animationDuration="0.75" width="100" />
          </div>
        )}

        <Pagination
          sx={{ width: 1 / 2 }}
          count={pageCount}
          page={page}
          onChange={(event, value) => {
            setPage(value);
          }}
        />
      </section>
    );
  }
};

export default List;
