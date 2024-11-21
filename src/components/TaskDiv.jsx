import React, { useState } from "react";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import { MdDelete, MdOutlineClose } from "react-icons/md";
import db from "../appwrite/database";
import Alert from "./Alert";

function TaskDiv({ taskInfo, taskOrigin }) {
  const [isNameShown, setIsNameShown] = useState(false);
  const [matrixWindowOpen, setMatrixWinoeOpen] = useState(false);
  const [taskIsSet, setTaskIsSet] = useState(taskInfo.task_is_set);
  const [alert, setAlert] = useState({ isShown: false, msg: "", cat: "" });

  // Helper function to show alert
  const showAlert = (msg, cat) => {
    setAlert({ isShown: true, msg, cat });
    setTimeout(() => {
      setAlert({ isShown: false, msg: "", cat: "" });
    }, 3000);
  };

  // Handle unset and delete actions
  const handleTaskAction = async (actionType) => {
    setMatrixWinoeOpen(false);

    try {
      const validCells = ["R1C1", "R1C2", "R2C1", "R2C2"];
      const cell = taskInfo.task_is_set_to;

      // Validate cell existence before querying
      if (!cell || !validCells.includes(cell)) {
        showAlert("Cell doesn't exist or is invalid", "warning");
        return;
      }

      // Fetch tasks from the cell
      const the_row = await db[cell]?.list();
      const documents = the_row?.documents || [];
      const matchingTask = documents.find(
        (doc) => doc.tasks.task_id === taskInfo.task_id
      );

      if (actionType === "unset") {
        if (!matchingTask) {
          showAlert("Couldn't find the task in the cell", "error");
          return;
        }

        // Unset task
        await db[cell].delete(matchingTask.$id);
        await db.Tasks.update(taskOrigin, {
          task_is_set: false,
          task_is_set_to: "",
        });
        showAlert("Task successfully unset", "success");
      } else if (actionType === "delete") {
        if (!matchingTask) {
          showAlert("Task not found in the cell", "warning");
          return;
        }

        // Delete task
        await db.Tasks.delete(taskOrigin);
        await db[cell].delete(matchingTask.$id);
        showAlert("Task successfully deleted", "success");
      }

      // Reload after success
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error(`Error in handleTaskAction (${actionType}):`, error);
      showAlert(
        `An error occurred while performing ${actionType} action`,
        "error"
      );
    }
  };

  const handleDeleteUnsetTask = async () => {
    try {
      await db.Tasks.delete(taskOrigin);
    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
    showAlert("Task successfully deleted", "success");
  };

  const UpdateTaskSet = async (cellId) => {
    setMatrixWinoeOpen(false);
    try {
      await db.Tasks.update(taskOrigin, {
        task_is_set: true,
        task_is_set_to: cellId,
      });

      await db[cellId]?.create({ tasks: taskOrigin });

      showAlert(`Task successfully added to ${cellId}`, "success");

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Error updating task set:", error);
      showAlert("Request denied. Please try again.", "error");
    } finally {
      setMatrixWinoeOpen(false);
      setTaskIsSet(true);
    }
  };

  return (
    <div className="relative flex justify-between items-center rounded bg-[rgba(255,255,255,0.2)] py-4 px-4 m-2 cursor-pointer">
      {alert.isShown && (
        <div className="fixed w-[90%] bottom-[260px] left-1/2 -translate-x-1/2 animate-alertDisplayer">
          <Alert msg={alert.msg} cat={alert.cat} />
        </div>
      )}

      <div className="py-2">
        <h2
          onClick={() => setIsNameShown((prev) => !prev)}
          className={`text-3xl text-white ${isNameShown ? "" : "font-bold"}`}
        >
          <div
            className={`absolute right-0 top-0 translate-x-[30%] -translate-y-[30%] ${
              taskIsSet ? "text-prim-300" : "hidden"
            }`}
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

      {matrixWindowOpen && (
        <div className="fixed z-50 w-full h-full top-0 flex justify-center items-center left-0 bg-[rgba(0,0,0,0.3)]">
          <div className="relative bg-[#1a1a1d99] backdrop-blur-lg w-4/5 p-6 rounded-lg">
            <MdOutlineClose
              className="absolute top-7 right-6 text-xl"
              onClick={() => setMatrixWinoeOpen(false)}
            />
            <h1 className="uppercase font-thin px-2 mb-5">
              {taskIsSet ? taskInfo.task_name : "Add to a cell"}
            </h1>
            {!taskIsSet && (
              <MdDelete
                onClick={() => handleDeleteUnsetTask()}
                className="text-xl text-prim-100 absolute top-7 right-12"
              />
            )}

            {!taskIsSet ? (
              <div className="flex flex-col gap-4 items-end">
                {[
                  { id: "R1C1", color: "006A67" },
                  { id: "R1C2", color: "FFF4B7" },
                  { id: "R2C1", color: "FFF4B7" },
                  { id: "R2C2", color: "A0153E" },
                ].map(({ id, color }) => (
                  <button
                    key={id}
                    onClick={() => UpdateTaskSet(id)}
                    className={`bg-[#${color}40] btn font-thin text-white w-full rounded-none border-none`}
                  >
                    {id}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-between w-full">
                <button
                  onClick={() => handleTaskAction("unset")}
                  className="bg-[#FFF4B740] btn font-thin text-white rounded-none border-none"
                >
                  Unset task
                </button>
                <button
                  onClick={() => handleTaskAction("delete")}
                  className="bg-[#A0153E40] btn font-thin text-white rounded-none border-none"
                >
                  Delete task
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskDiv;
