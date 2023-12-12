import useArticlesState from "../utils/useArticlesState";
import Filters from "./Filters/Filters";
import Page from "./Page/Page";
import Card from "./Card/Card";
import list from "./List.module.css";

const List = () => {
  const { articles, setArticles, isLoading } = useArticlesState();

  return (
    <>
      <div className={list.sectionHead}>
        <h2>Articles</h2>
      </div>
      <Filters />
      <ul className={list.list}>
        <p>{isLoading ? "Loading..." : "Click the image to view article"}</p>
        {articles.map((article) => {
          return <Card key={article.article_id} article={article} />;
        })}
      </ul>
      <Page />
    </>
  );
};

export default List;
