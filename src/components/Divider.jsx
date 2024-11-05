import React from "react";

function Divider() {
  return (
    <div className="flex w-full justify-between items-center py-4">
      <div className="h-[1px] w-[186px] bg-gold-100"></div>
      <div className="border border-gold-100 w-8 h-8 rounded rotate-45"></div>
      <div className="h-[1px] w-[186px] bg-gold-100"></div>
    </div>
  );
}

export default Divider;
