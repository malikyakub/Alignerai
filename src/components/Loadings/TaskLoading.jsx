import React from "react";

function TaskLoading() {
  return (
    <div className="relative w-[396px] h-[102px] overflow-hidden bg-[rgba(255,255,255,0.2)] m-2 rounded">
      <span className="w-4 h-[200%] -translate-y-1/2 absolute bg-[rgba(255,255,255,0.5)] top-1/2 left-0 rotate-45 blur-md animate-slideHorizontal"></span>
    </div>
  );
}

export default TaskLoading;
