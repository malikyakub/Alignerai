import React from "react";
import Header from "./components/Intro";
import Footer from "./components/Footer";

function App() {
return (
  <div className="flex flex-col h-[100vh] items-center justify-around">
    <Header />
    <Footer />
  </div>
);
}

export default App;