import { useState, useEffect } from "react";
import { getArticles } from "../../../api";

const useArticlesState = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticles().then((newArticles) => {
      setArticles(newArticles);
      setIsLoading(false);
    });
  }, []);

  return { articles, setArticles, isLoading };
};

export default useArticlesState;
