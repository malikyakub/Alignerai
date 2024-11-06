import React from "react";

function Divider() {
  return (
    <div className="relative w-full h-10 my-8">
      <div className="absolute border border-gold-100 h-10 w-10 rounded top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-dark-100 z-10"></div>
      <div className="absolute w-full h-0.5 bg-gold-100 top-1/2 -translate-y-1/2"></div>
    </div>
  );
}

export default Divider;
