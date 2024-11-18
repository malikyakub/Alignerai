import React, { useState } from "react";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import { MdOutlineClose } from "react-icons/md";
import db from "../appwrite/database";
import Alert from "./Alert";

function TaskDiv({ taskInfo, taskOrigin }) {
  const [isNameShown, setIsNameShown] = useState(false);
  const [matrixWindowOpen, setMatrixWinoeOpen] = useState(false);
  const [taskIsSet, setTaskIsSet] = useState(taskInfo.task_is_set);
  const [alert, setAlert] = useState({ isShown: false, msg: "", cat: "" });

  const showAlert = (msg, cat) => {
    setAlert({ isShown: true, msg, cat });
    setTimeout(() => {
      setAlert({ isShown: false, msg: "", cat: "" });
    }, 3000);
  };

  const handleUnsetTask = () => {
    console.log(taskInfo.task_id);
  };

  const UpdateTaskSet = (cellId) => {
    const updateTaskIsSetDB = async () => {
      try {
        await db.Tasks.update(taskOrigin, { task_is_set: true });

        switch (cellId) {
          case "R1C1":
            await db.R1C1.create({ tasks: taskOrigin });
            break;
          case "R1C2":
            await db.R1C2.create({ tasks: taskOrigin });
            break;
          case "R2C1":
            await db.R2C1.create({ tasks: taskOrigin });
            break;
          case "R2C2":
            await db.R2C2.create({ tasks: taskOrigin });
            break;
          default:
            throw new Error(`Invalid cellId: ${cellId}`);
        }

        showAlert(`Task successfully added to ${cellId}`, "success");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } catch (error) {
        showAlert("Request denied. Please try again.", "error");
      } finally {
        setMatrixWinoeOpen(false);
        setTaskIsSet(true);
      }
    };

    updateTaskIsSetDB();
  };

  return (
    <div className="relative flex justify-between items-center rounded bg-[rgba(255,255,255,0.2)] py-4 px-4 m-2 cursor-pointer">
      {/* Alert */}
      {alert.isShown && (
        <div className="fixed w-[90%] bottom-[260px] left-1/2 -translate-x-1/2 animate-alertDisplayer">
          <Alert msg={alert.msg} cat={alert.cat} />
        </div>
      )}

      <div className="py-2">
        <h2
          onClick={() => setIsNameShown((prev) => !prev)}
          className={
            isNameShown
              ? `text-3xl text-white`
              : `text-3xl text-white font-bold`
          }
        >
          <div
            className={
              taskIsSet
                ? "absolute right-0 top-0 translate-x-[30%] -translate-y-[30%] text-prim-300"
                : "hidden"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
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

      {matrixWindowOpen &&
        (!taskIsSet ? (
          <div className="fixed z-50 w-full h-full top-0 flex justify-center items-center left-0 bg-[rgba(0,0,0,0.3)]">
            <div className="relative bg-[#1a1a1d99] backdrop-blur-lg w-4/5 p-6 rounded-lg">
              <MdOutlineClose
                className="absolute top-7 right-6 text-xl"
                onClick={() => setMatrixWinoeOpen(false)}
              />
              <h1 className="uppercase font-thin mb-10">add to a cell</h1>
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => UpdateTaskSet("R1C1")}
                  className="bg-[#006A6740] btn font-thin text-white rounded-none border border-prim-300"
                >
                  R1C1
                </button>
                <button
                  onClick={() => UpdateTaskSet("R1C2")}
                  className="bg-[#FFF4B740] btn font-thin text-white rounded-none border border-prim-200"
                >
                  R1C2
                </button>
                <button
                  onClick={() => UpdateTaskSet("R2C1")}
                  className="bg-[#FFF4B740] btn font-thin text-white rounded-none border border-prim-200"
                >
                  R2C1
                </button>
                <button
                  onClick={() => UpdateTaskSet("R2C2")}
                  className="bg-[#A0153E40] btn font-thin text-white rounded-none border border-prim-100"
                >
                  R2C2
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="fixed z-50 w-full h-full top-0 flex justify-center items-center left-0 bg-[rgba(0,0,0,0.3)]">
            <div className="relative bg-[#1a1a1d99] backdrop-blur-lg w-4/5 p-6 rounded-lg">
              <MdOutlineClose
                className="absolute top-7 right-6 text-xl"
                onClick={() => setMatrixWinoeOpen(false)}
              />
              <h1 className="uppercase font-thin mb-10">
                {taskInfo.task_name}
              </h1>
              <div className="flex items-center justify-between w-full">
                <button
                  onClick={() => handleUnsetTask()}
                  className="bg-[#FFF4B740] btn font-thin text-white rounded-none border border-prim-200"
                >
                  Unset task
                </button>
                <button className="bg-[#A0153E40] btn font-thin text-white rounded-none border border-prim-100">
                  Delete task
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default TaskDiv;
