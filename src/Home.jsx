import React, { useState } from "react";
import Intro from "./components/Intro";
import Footer from "./components/Footer";

function App() {
  const [isBuilt, setIsBuilt] = useState(false);
  return (
    <div className="flex flex-col h-[100vh] items-center justify-center text-center overflow-hidden">
      {isBuilt ? (
        <>
          <Intro />
          <div className="absolute bottom-0 w-full flex justify-center py-4">
            <Footer />
          </div>
        </>
      ) : (
        <div className="w-full flex flex-col my-20 h-4/5 items-center justify-center ">
          <h1 className="text-2xl font-thin">Under construction</h1>
          <img src="/SVG/Development.svg" alt="you're lost" />
          <p className="font-sans mt-20">Visit later...</p>
        </div>
      )}
    </div>
  );
}

export default App;
