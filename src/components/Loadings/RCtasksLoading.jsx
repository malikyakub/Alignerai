import React from "react";

function RCtasksLoading() {
  return (
    <div className="relative h-[56px] overflow-hidden w-[176px] bg-[#ffffff33] animate-pulse rounded">
      <span className="w-4 h-[200%] -translate-y-1/2 absolute bg-[rgba(255,255,255,0.5)] top-1/2 left-0 rotate-45 blur-md animate-slideHorizontal"></span>
    </div>
  );
}

export default RCtasksLoading;
