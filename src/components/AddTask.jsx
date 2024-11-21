import React, { useState, useEffect } from "react";
import db from "../appwrite/database";
import AlignerBtn from "./AlignerBtn";
import Alert from "./Alert";

function AddTask({ onSubmit }) {
  const [taskName, setTaskName] = useState("");
  const [taskDetail, setTaskDetail] = useState("");
  const [taskDuration, setTaskDuration] = useState("");
  const [totalTasks, setTotalTasks] = useState(0);
  const [tasksName, setTasksNames] = useState([]);
  const [alert, setAlert] = useState({ msg: "", cat: "" });
  const [alertIsShown, setAlertIsShown] = useState(false);

  // Fetch total tasks and task names from the database
  useEffect(() => {
    const fetchTotalTasks = async () => {
      try {
        const res = await db.Tasks.list();
        const taskNames = res.documents.map((task) => task.task_name);
        setTasksNames(taskNames);
        setTotalTasks(res.documents.length);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTotalTasks();
  }, []);

  // Format task ID based on total tasks
  const formatTaskId = (taskNumber) => {
    return taskNumber < 10 ? `#0${taskNumber}` : `#${taskNumber}`;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input validation
    if (!taskName || !taskDetail || !taskDuration) {
      setAlert({ msg: "Please fill in all fields", cat: "warning" });
      setAlertIsShown(true);
      return;
    }

    if (tasksName.includes(taskName)) {
      setAlert({ msg: "Task name already exists", cat: "warning" });
      setAlertIsShown(true);
      return;
    }

    if (taskDetail.length > 150 || taskName.length > 20 || taskDuration > 8) {
      setAlert({ msg: "Out of limit texts", cat: "error" });
      setAlertIsShown(true);
      return;
    }

    const newTask = {
      task_id: formatTaskId(totalTasks + 1),
      task_name: taskName,
      task_details: taskDetail,
      task_duration: taskDuration,
    };

    try {
      await db.Tasks.create(newTask);
      setAlert({ msg: "Task Added Successfully", cat: "success" });
      setAlertIsShown(true);

      setTasksNames((prev) => [...prev, newTask.task_name]);
      setTotalTasks((prev) => prev + 1);

      // Clear input fields
      setTaskName("");
      setTaskDetail("");
      setTaskDuration("");

      if (onSubmit) onSubmit(newTask);

      window.location.href = "/tasks";
    } catch (error) {
      console.error("Error adding task to the database:", error);
      setAlert({
        msg: error.message || "An error occurred",
        cat: "error",
      });
      setAlertIsShown(true);
    }
  };

  return (
    <div className="relative w-full mt-20">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-2"
      >
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          maxLength={20}
          placeholder="Task Name"
          className="h-[50px] w-[80%] placeholder:text-[#ffffff80] rounded-md backdrop-blur-md input bg-[#ffffff4d]"
        />

        <textarea
          value={taskDetail}
          onChange={(e) => setTaskDetail(e.target.value)}
          maxLength={150}
          placeholder="Task Detail"
          className="h-[180px] w-[80%] placeholder:text-[#ffffff80] rounded-md backdrop-blur-md textarea bg-[#ffffff4d]"
        ></textarea>

        <input
          type="text"
          value={taskDuration}
          onChange={(e) => setTaskDuration(e.target.value)}
          maxLength={8}
          placeholder="Task Duration"
          className="h-[50px] w-[80%] placeholder:text-[#ffffff80] rounded-md backdrop-blur-md input bg-[#ffffff4d]"
        />

        <button
          type="submit"
          className="btn bg-gold-100 text-gold-200 mt-10 w-40"
        >
          Add Task
        </button>
      </form>

      <footer className="fixed bottom-0 w-full h-16 bg-gold-100">
        <AlignerBtn />
      </footer>

      {alertIsShown && (
        <div className="fixed w-[90%] bottom-[260px] left-1/2 -translate-x-1/2 animate-alertDisplayer">
          <Alert msg={alert.msg} cat={alert.cat} />
        </div>
      )}
    </div>
  );
}

export default AddTask;
