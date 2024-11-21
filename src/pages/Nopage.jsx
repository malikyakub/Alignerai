import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Nopage() {
  return (
    <div>
      <Header />
      <div className="w-full flex flex-col my-20 h-4/5 items-center justify-center ">
        <h1 className="text-5xl font-bold">404</h1>
        <img src="/SVG/Lost-page.svg" alt="you're lost" />
        <p className="font-sans">I think you're lost</p>
        <a
          href="/tasks"
          className="btn bg-gold-100 text-gold-200 uppercase px-4 mt-10 w-40"
        >
          Tasks
        </a>
      </div>
      <div className="absolute bottom-0 w-full flex justify-center py-4">
        <Footer />
      </div>
    </div>
  );
}

export default Nopage;
