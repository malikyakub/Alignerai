import React from "react";

function AlignerBtn() {
  return (
    <a
      href="/aligner"
      className="absolute bg-dark-100  flex items-center justify-center left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 w-20 h-20 overflow-hidden rounded-full shadow-orange-shadow"
    >
      <img src="/SVG/mainlogo.svg" alt="logo" width={50} />
    </a>
  );
}

export default AlignerBtn;
