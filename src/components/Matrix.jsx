import React, { useEffect, useState } from "react";

function Matrix() {
  const [priOneTasks, setPriOneTasks] = useState([]);
  const [priTwoTasks, setPriTwoTasks] = useState([]);
  const [priThreeTasks, setPriThreeTasks] = useState([]);
  const [priFourTasks, setPriFourTasks] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null); // State to store selected task details
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog visibility

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setPriOneTasks(data.priOneTasks || []);
        setPriTwoTasks(data.priTwoTasks || []);
        setPriThreeTasks(data.priThreeTasks || []);
        setPriFourTasks(data.priFourTasks || []);
        setTasks(data.tasks || []);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const taskDetailShow = (clickedTaskId) => {
    const taskToShowDetailed = tasks.find(
      (task) => task.taskId === clickedTaskId
    );
    setSelectedTask(taskToShowDetailed); // Set the selected task details
    setIsDialogOpen(true); // Open the dialog
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedTask(null);
  };

  return (
    <div className="mt-4 w-full flex gap-2 flex-wrap justify-center">
      <div className="w-[47%] flex items-center gap-1 p-2 overflow-scroll flex-wrap justify-center border border-prim-300 rounded h-40 bg-[#006a674d]">
        {priOneTasks.map((priOneTask) => (
          <div
            onClick={() => taskDetailShow(priOneTask.taskId)}
            className="bg-[#ffffff33] py-4 px-2 w-full rounded"
            key={priOneTask.taskId}
          >
            {priOneTask.taskId}
          </div>
        ))}
      </div>
      <div className="w-[47%] flex items-center gap-1 p-2 overflow-scroll flex-cols justify-center border border-prim-200 rounded h-40 bg-[#fff4b74d]">
        {priTwoTasks.map((priTwoTask) => (
          <div
            onClick={() => taskDetailShow(priTwoTask.taskId)}
            className="bg-[#ffffff33] py-4 px-2 w-full rounded"
            key={priTwoTask.taskId}
          >
            {priTwoTask.taskId}
          </div>
        ))}
      </div>
      <div className="w-[47%] flex items-center gap-1 p-2 overflow-scroll flex-wrap justify-center border border-prim-200 rounded h-40 bg-[#fff4b74d]">
        {priThreeTasks.map((priThreeTask) => (
          <div
            onClick={() => taskDetailShow(priThreeTask.taskId)}
            className="bg-[#ffffff33] py-4 px-2 w-full rounded"
            key={priThreeTask.taskId}
          >
            {priThreeTask.taskId}
          </div>
        ))}
      </div>
      <div className="w-[47%] flex items-center gap-1 p-2 overflow-scroll flex-wrap justify-center border border-prim-100 rounded h-40 bg-[#A0153E4d]">
        {priFourTasks.map((priFourTask) => (
          <div
            onClick={() => taskDetailShow(priFourTask.taskId)}
            className="bg-[#ffffff33] py-4 px-2 w-full rounded"
            key={priFourTask.taskId}
          >
            {priFourTask.taskId}
          </div>
        ))}
      </div>

      {/* Dialog */}
      {isDialogOpen && selectedTask && (
        <div className="fixed inset-0 bg-dark-100 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-dark-100 p-6 rounded-md shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-white">Task Details</h2>
            <table className="w-full text-left text-white">
              <tbody>
                <tr>
                  <td className="py-2 pr-4 font-semibold text-gold-100">
                    Task ID:
                  </td>
                  <td>{selectedTask.taskId}</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-semibold text-gold-100">
                    Task Name:
                  </td>
                  <td>{selectedTask.taskName || "No name"}</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-semibold text-gold-100">
                    Task Detail:
                  </td>
                  <td>{selectedTask.taskDetail || "No detail"}</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-semibold text-gold-100">
                    Duration:
                  </td>
                  <td>{selectedTask.taskDuration || "No duration"}</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-semibold text-gold-100">
                    Priority:
                  </td>
                  <td>{selectedTask.taskPriority || "No priority"}</td>
                </tr>
              </tbody>
            </table>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleCloseDialog}
                className="bbtn bg-gold-100 text-gold-200 px-4 py-2 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Matrix;
