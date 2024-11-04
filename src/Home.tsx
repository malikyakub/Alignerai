import React from "react";
import Header from "./components/Intro";
import Footer from "./components/Footer";
import { useState } from "react";

function App() {
  const [page, setPage] = useState("page-1");
  if (page == "page-1") {
    return (
      <div className="flex flex-col h-[100vh] items-center justify-around">
        <Header />
        <Footer />
      </div>
    );
  } else if (page == "page-2") {
    return <h1>page two </h1>;
  } else if (page == "page-3") {
    return <h1>page three</h1>;
  }
}

export default App;