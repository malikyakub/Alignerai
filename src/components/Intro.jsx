import React from "react";

function Intro() {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="uppercase text-xl text-center mb-[50px]">
        Manage you time with...
      </h1>
      <a href="#">
        <img
          // src="/images/logo/horizontallogo.png"
          src="/SVG/verticallogo.svg"
          alt="main logo"
          width={250}
          className="my-4"
        />
      </a>
      <a
        href="/tasks"
        className="btn bg-gold-100 text-gold-200 uppercase px-4 mt-10 w-40"
      >
        Tasks
      </a>
    </div>
  );
}

export default Intro;
