import React, { useEffect, useState } from "react";
import db from "../appwrite/database";
import Aligner from "../../public/Models/Aligner";
// import textTransformer from "../../public/Models/TextTransformer";

function TasksListTest() {
  const [aiRes, setAiRes] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await db.Tasks.list();
        setTasks(response.documents);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    if (!tasks || tasks.length === 0) return; // Early exit if no tasks are available

    const cellToQuad = (cell) => {
      if (cell === "R1C1") return "quadrant one";
      if (cell === "R1C2") return "quadrant two";
      if (cell === "R2C1") return "quadrant three";
      return "quadrant four";
    };

    const prompt = `tasks: ${tasks
      .map((task) => task.task_name)
      .join(", ")} task IDs: ${tasks
      .map((task) => task.task_id)
      .join(", ")} task details: ${tasks
      .map((task) => task.task_details)
      .join(", ")} and their estimated time: ${tasks
      .map((task) => task.task_duration)
      .join(", ")} and their quadrants: ${tasks
      .map((task) => cellToQuad(task.task_is_set_to))
      .join(", ")}`;

    async function alignedTasks() {
      try {
        const response = await Aligner(prompt);
        // setAiRes(textTransformer(response.text));
        setAiRes(response.text);
      } catch (error) {
        console.log(error);
      }
    }
    alignedTasks();
  }, [tasks]); // Re-run only when tasks changes

  console.log(aiRes);
  // let trans = textTransformer(aiRes);
  // console.log(trans, "transformed");
  return (
    <div>{tasks.length > 0 ? "Tasks processed!" : "Processing tasks..."}</div>
  );
}

export default TasksListTest;
