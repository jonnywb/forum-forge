import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Nav from "../Nav/Nav";
import Account from "../Account/Account";
import { UserProvider } from "./Context/UserProvider";
import List from "./List/List";
import Article from "./Article/Article";
import Error from "../Error/Error-lg";

function App() {
  return (
    <>
      <header>
        <Header />
        <Nav />
      </header>
      <main>
        <UserProvider>
          <Routes>
            <Route path="/" element={<List />} />
            <Route path="/articles" element={<List />} />
            <Route path="/articles/:article_id" element={<Article />} />
            <Route path="/topics/:topic" element={<List />} />
            <Route path="/account" element={<Account />} />
            <Route path="*" element={<Error err={{ msg: 404, status: "Not Found" }} />} />
          </Routes>
        </UserProvider>
      </main>
    </>
  );
}

export default App;
