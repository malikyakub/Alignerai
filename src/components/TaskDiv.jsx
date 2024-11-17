import React, { useState } from "react";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import { MdOutlineClose } from "react-icons/md";

function TaskDiv({ taskInfo }) {
  const [isNameShown, setIsNameShown] = useState(false);
  const [matrixWindowOpen, setMatrixWinoeOpen] = useState(false);

  // Function to handle button click and pass the task ID and cell ID
  const handleCellAssignment = (cellId) => {
    console.log(`Task ID: ${taskInfo.task_id}, Assigned to: ${cellId}`);
    // Add logic here to update the task or make an API call
    setMatrixWinoeOpen(false); // Close the popup after assigning
  };

  return (
    <div className="relative flex justify-between items-center rounded bg-[rgba(255,255,255,0.2)] py-4 px-4 m-2 cursor-pointer">
      <div className="py-2">
        <h2
          onClick={() => setIsNameShown((prev) => !prev)}
          className={
            isNameShown
              ? `text-3xl text-white`
              : `text-3xl text-white font-bold`
          }
        >
          {isNameShown ? taskInfo.task_name : taskInfo.task_id}
        </h2>
        <p className="text-[12px]">{taskInfo.task_duration}</p>
      </div>

      <div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setMatrixWinoeOpen(true);
          }}
        >
          <PiDotsSixVerticalBold className="text-2xl" />
        </button>
      </div>

      {matrixWindowOpen && (
        <div className="fixed z-50 w-full h-full top-0 flex justify-center items-center left-0 bg-[rgba(0,0,0,0.3)]">
          <div className="relative bg-[#1a1a1d99] backdrop-blur-lg w-4/5 p-6 rounded-lg">
            <MdOutlineClose
              className="absolute top-7 right-6 text-xl"
              onClick={() => setMatrixWinoeOpen(false)}
            />
            <h1 className="capitalize font-thin text-2xl mb-5">
              add to a cell
            </h1>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleCellAssignment("R1C1")}
                className="bg-[#006A6740] btn font-thin text-white rounded-none border border-prim-300"
              >
                R1C1
              </button>
              <button
                onClick={() => handleCellAssignment("R1C2")}
                className="bg-[#FFF4B740] btn font-thin text-white rounded-none border border-prim-200"
              >
                R1C2
              </button>
              <button
                onClick={() => handleCellAssignment("R2C1")}
                className="bg-[#FFF4B740] btn font-thin text-white rounded-none border border-prim-200"
              >
                R2C1
              </button>
              <button
                onClick={() => handleCellAssignment("R2C2")}
                className="bg-[#A0153E40] btn font-thin text-white rounded-none border border-prim-100"
              >
                R2C2
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskDiv;
