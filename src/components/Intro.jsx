import React from "react";

function Intro() {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="uppercase text-xl text-center">Manage you time with...</h1>
      <a href="#">
        <img
          src="/images/logo/horizontallogo.png"
          alt="main logo"
          width={300}
        />
      </a>
      <a
        href="/tasks"
        className="btn bg-gold-100 text-gold-200 uppercase px-4 mt-10"
      >
        Tasks
      </a>
    </div>
  );
}

export default Intro;
