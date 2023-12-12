import { useState } from "react";
import app from "./App.module.css";
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import Articles from "./components/Articles/Articles";

function App() {
  return (
    <>
      <header>
        <Header />
        <Nav />
      </header>
      <main>
        <Articles />
      </main>
    </>
  );
}

export default App;
