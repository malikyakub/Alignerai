import React from "react";
import Header from "../components/Header";
import DoTask from "../components/DoTask";
import Recommendation from "../components/Recommendation";
import Divider from "../components/Divider";
import Footer from "../components/Footer";

function AlignerPage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Header />
      <DoTask />
      <Divider />
      <Recommendation />
      <div className="absolute bottom-0 w-full flex justify-center py-4">
        <Footer />
      </div>
    </div>
  );
}

export default AlignerPage;
