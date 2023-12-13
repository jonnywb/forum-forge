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

export async function getComments(article_id) {
  const { data } = await newsApi.get(`/articles/${article_id}/comments`);

  return data.comments;
}

export async function voteArticle(article_id, inc_votes) {
  const { data } = await newsApi.patch(`/articles/${article_id}`, { inc_votes });

  return data.article;
}

export async function postComment(article_id, username, body) {
  const { data } = await newsApi.post(`/articles/${article_id}/comments`, { username, body });

  return data.comment;
}

export async function deleteComment(comment_id) {
  const { data } = await newsApi.delete(`/comments/${comment_id}`);

  return data;
}
