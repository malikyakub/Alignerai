import React from "react";
import Intro from "./components/Intro";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col h-[100dvh] items-center justify-around overflow-hidden">
      <Intro />
      <div className="absolute bottom-0 w-full flex justify-center py-4">
        <Footer />
      </div>
    </div>
  );
}

export default App;
