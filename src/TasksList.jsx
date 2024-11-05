import React from "react";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import Tomovesection from "./components/Tomovesection";
function TasksList({
  taskId,
  taskName,
  taskDetail,
  taskDuration,
  taskPriority,
}) {
  let IsHigh;
  let IsMiddle;
  let IsLow;

  if (taskPriority == "high") {
    IsHigh = true;
    IsMiddle = false;
    IsLow = false;
  } else if (taskPriority == "middle") {
    IsMiddle = true;
    IsHigh = false;
    IsLow = false;
  } else {
    IsLow = true;
    IsHigh = false;
    IsMiddle = false;
  }
  return (
    <div className="relative flex justify-between items-center rounded bg-[rgba(255,255,255,0.2)] py-4 px-4 m-2">
      <div
        className={
          IsHigh
            ? "absolute rounded-full top-0 right-0 translate-x-1/3 -translate-y-1/3 border-2 border-dark-100  w-4 h-4 bg-prim-300"
            : "hidden"
        }
      ></div>
      <div
        className={
          IsMiddle
            ? "absolute rounded-full top-0 right-0 translate-x-1/3 -translate-y-1/3 border-2 border-dark-100  w-4 h-4 bg-prim-200"
            : "hidden"
        }
      ></div>
      <div
        className={
          IsLow
            ? "absolute rounded-full top-0 right-0 translate-x-1/3 -translate-y-1/3 border-2 border-dark-100  w-4 h-4 bg-prim-100"
            : "hidden"
        }
      ></div>
      <div className="py-2">
        <h2 className="text-4xl text-white font-bold">{taskId}</h2>
        <p className="text-[12px]">{taskDuration}</p>
      </div>
      <div>
        <button onClick={console.log("moved")}>
          <PiDotsSixVerticalBold className="text-2xl" />
        </button>
      </div>
    </div>
  );
}

export default TasksList;
