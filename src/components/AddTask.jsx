import React, { useState } from "react";
import AlignerBtn from "./AlignerBtn";

function AddTask({ onSubmit }) {
  const [taskName, setTaskName] = useState("");
  const [taskDetail, setTaskDetail] = useState("");
  const [taskDuration, setTaskDuration] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [tasIsSet, setTaskIsSet] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure all necessary fields are filled
    if (!taskName || !taskDetail || !taskDuration || !taskPriority) {
      alert("Please fill in all fields");
      return;
    }

    // Collect form data
    const formData = {
      taskName,
      taskDetail,
      taskDuration,
      taskPriority,
      tasIsSet: false, // Indicate that the task is set
    };

    // Call the onSubmit prop (passing data to the parent)
    onSubmit(formData);

    // Optionally, clear the form fields after submission
    setTaskName("");
    setTaskDetail("");
    setTaskDuration("");
    setTaskPriority("");
    window.location.href = "/tasks";
  };

  return (
    <div className="relative w-full mt-20">
      <form
        onSubmit={handleSubmit}
        action=""
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

        <select
          onChange={(e) => setTaskPriority(e.target.value)}
          value={taskPriority}
          className="h-[50px] w-[80%] select relative bg-[#ffffff4d] text-xl"
        >
          <option disabled value="">
            Set priority
          </option>
          <option className="bg-dark-100" value="high">
            High
          </option>
          <option className="bg-dark-100" value="medium">
            Medium
          </option>
          <option className="bg-dark-100" value="low">
            Low
          </option>
        </select>

        <button type="submit" className="btn bg-gold-100 text-gold-200 mt-10">
          Add task
        </button>
      </form>

      <footer className="fixed bottom-0 w-full h-16 bg-gold-100">
        <AlignerBtn />
      </footer>
    </div>
  );
}

export default AddTask;
