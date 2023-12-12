import { Routes, Route } from "react-router-dom";
import app from "./App.module.css";
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import Articles from "./components/Articles/Articles";
import Account from "./components/Account/Account";
import { UserProvider } from "./components/Context/UserProvider";

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
            <Route path="*" element={<Articles />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </UserProvider>
      </main>
    </>
  );
}

export default App;
