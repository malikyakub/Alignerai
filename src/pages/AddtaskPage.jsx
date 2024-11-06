import React, { useState } from "react";
import Header from "../components/Header";
import AddTask from "../components/AddTask";

function AddtaskPage() {
  // State to store the task values
  const [taskData, setTaskData] = useState({
    taskName: "",
    taskDetail: "",
    taskDuration: "",
    taskPriority: "",
    tasIsSet: false,
  });

  // Handle form submission and update the state
  const handleTaskSubmission = (formData) => {
    setTaskData(formData);
    console.log("Task data saved:", formData);
  };

  return (
    <div>
      <Header />
      <AddTask onSubmit={handleTaskSubmission} /> {/* Pass the handler down as prop */}
    </div>
  );
}

export default AddtaskPage;
