import { useState } from "react";
import app from "./App.module.css";
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import Articles from "./components/Articles/Articles";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <header>
        <Header />
        <Nav />
      </header>
      <main>
        <Routes>
          <Route path="*" element={<Articles />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
