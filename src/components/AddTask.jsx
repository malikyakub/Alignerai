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

  const fetchTotalTasks = async () => {
    try {
      const res = await db.Tasks.list();

      const taskNames = res.documents.map((task) => task.task_name);
      setTasksNames(taskNames);

      setTotalTasks(res.documents.length);

      console.log(`Task Names: ${taskNames}`);
      console.log(`Total tasks in the database: ${res.documents.length}`);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const formatTaskId = (taskNumber) => {
    return taskNumber < 10 ? `#0${taskNumber}` : `#${taskNumber}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!taskName || !taskDetail || !taskDuration) {
      alert("Please fill in all fields");
      return;
    }

    const newTask = {
      task_id: formatTaskId(totalTasks + 1),
      task_name: taskName,
      task_details: taskDetail,
      task_duration: taskDuration,
    };

    if (tasksName.includes(newTask.task_name)) {
      setAlertIsShown(true);
      setAlert({ msg: "Task name already exists", cat: "warning" });
      return;
    }

    if (taskDetail.length > 150 || taskName.length > 20 || taskDuration > 8) {
      setAlertIsShown(true);
      setAlert({ msg: "out of limit texts", cat: "error" });
      return;
    }

    try {
      await db.Tasks.create(newTask);

      setAlertIsShown(true);
      setAlert({ msg: "Task Added Successfully", cat: "success" });
      setTasksNames((prev) => [...prev, newTask.task_name]);
      setTotalTasks((prev) => prev + 1);

      setTaskName("");
      setTaskDetail("");
      setTaskDuration("");

      if (onSubmit) {
        onSubmit(newTask);
      }
      window.location.href = "/tasks";
    } catch (error) {
      console.error("Error adding task to the database:", error);
      setAlertIsShown(true);
      setAlert({ msg: error.message || "An error occurred", cat: "error" });
    }
  };

  useEffect(() => {
    fetchTotalTasks();
  }, []);

  return (
    <div className="relative w-full mt-20">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-2"
      >
        <input
          type="text"
          onChange={(e) => setTaskName(e.target.value)}
          value={taskName}
          placeholder="Task Name"
          className="h-[50px] w-[80%] placeholder:text-[#ffffff80] input bg-[#ffffff4d]"
        />

        <textarea
          onChange={(e) => setTaskDetail(e.target.value)}
          value={taskDetail}
          className="h-[180px] w-[80%] placeholder:text-[#ffffff80] textarea bg-[#ffffff4d]"
          placeholder="Task Detail"
        ></textarea>

        <input
          type="text"
          onChange={(e) => setTaskDuration(e.target.value)}
          value={taskDuration}
          placeholder="Task Duration"
          className="h-[50px] w-[80%] placeholder:text-[#ffffff80] input bg-[#ffffff4d]"
        />

        <button type="submit" className="btn bg-gold-100 text-gold-200 mt-10">
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
