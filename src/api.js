import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://forum-forge.onrender.com/api",
});

export async function getArticles() {
  const { data } = await newsApi.get("/articles");

  return data.articles;
}

export async function getArticleById(article_id) {
  const { data } = await newsApi.get(`/articles/${article_id}`);

  return data.article;
}
