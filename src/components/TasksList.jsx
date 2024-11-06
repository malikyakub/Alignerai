import React, { useState, useEffect } from "react";
import { PiDotsSixVerticalBold } from "react-icons/pi";

function TasksList({
  taskId,
  taskName,
  taskDetail,
  taskDuration,
  taskPriority,
  taskisSet,
}) {
  const [isMainDialogOpen, setIsMainDialogOpen] = useState(false);
  const [isPriorityDialogOpen, setIsPriorityDialogOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setTasks(data.tasks))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  let priorityClass;
  if (taskPriority === "high") {
    priorityClass = "bg-prim-300";
  } else if (taskPriority === "medium") {
    priorityClass = "bg-prim-200";
  } else {
    priorityClass = "bg-prim-100";
  }

  const handlePrioritySelection = (section) => {
    if (section === 1) {
      console.log("ur/im");
    } else if (section === 2) {
      console.log("ur/notim");
    } else if (section === 3) {
      console.log("notur/im");
    } else {
      console.log("not/not");
    }

    console.log(taskId);

    let currentTask = tasks.find((task) => task.taskId === taskId);
    console.log(currentTask);
  };

  return (
    <>
      <div
        className="relative flex justify-between items-center rounded bg-[rgba(255,255,255,0.2)] py-4 px-4 m-2 cursor-pointer"
        onClick={() => setIsMainDialogOpen(true)}
      >
        <div
          className={`absolute rounded-full top-0 right-0 translate-x-1/3 -translate-y-1/3 border-2 border-dark-100 w-4 h-4 ${priorityClass}`}
        ></div>
        <div className="py-2">
          <h2 className="text-4xl text-white font-bold">{taskId}</h2>
          <p className="text-[12px]">{taskDuration}</p>
        </div>
        <div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsPriorityDialogOpen(true);
            }}
          >
            <PiDotsSixVerticalBold className="text-2xl" />
          </button>
        </div>
      </div>

      {isMainDialogOpen && (
        <div className="fixed inset-0 bg-dark-100 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-dark-100 p-6 rounded-md shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4 text-white">Task Details</h3>
            <table className="w-full text-left text-white">
              <tbody>
                <tr>
                  <td className="py-2 pr-4 font-semibold text-gold-100">
                    Task ID:
                  </td>
                  <td>{taskId}</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-semibold text-gold-100">
                    Task Name:
                  </td>
                  <td>{taskName}</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-semibold text-gold-100">
                    Task Detail:
                  </td>
                  <td>{taskDetail}</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-semibold text-gold-100">
                    Duration:
                  </td>
                  <td>{taskDuration}</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-semibold text-gold-100">
                    Priority:
                  </td>
                  <td>{taskPriority}</td>
                </tr>
              </tbody>
            </table>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsMainDialogOpen(false)}
                className="btn bg-gold-100 text-gold-200 px-4 py-2 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {isPriorityDialogOpen && (
        <div className="fixed inset-0 bg-dark-100 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-dark-100 p-6 rounded-md shadow-lg w-4/5">
            <h3 className="text-xl font-bold mb-4 text-white">Add to Cell</h3>
            <div className="space-y-4">
              <button
                onClick={() => handlePrioritySelection(1)}
                className="w-full px-4 py-2 text-start text-white bg-[#ffffff4d] rounded hover:bg-[#006a674d]"
              >
                Urgent / Important
              </button>
              <button
                onClick={() => handlePrioritySelection(2)}
                className="w-full px-4 py-2 text-start text-white bg-[#ffffff4d] rounded hover:bg-[#fff4b74d]"
              >
                Not-Urgent / Important
              </button>
              <button
                onClick={() => handlePrioritySelection(3)}
                className="w-full px-4 py-2 text-start text-white bg-[#ffffff4d] rounded hover:bg-[#fff4b74d]"
              >
                Urgent / Not-Important
              </button>
              <button
                onClick={() => handlePrioritySelection(4)}
                className="w-full px-4 py-2 text-start text-white bg-[#ffffff4d] rounded hover:bg-[#a0153e4d]"
              >
                Not-Urgent / Not-Important
              </button>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsPriorityDialogOpen(false)}
                className="btn bg-gold-100 px-4 mt-4 py-2 text-gold-200 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TasksList;
