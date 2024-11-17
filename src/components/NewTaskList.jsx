import React, { useEffect, useState } from "react";
import db from "../appwrite/database";

function NewTasksList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await db.Tasks.list();
        setTasks(response.documents);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {tasks.map((task) => {
        return <div key={task.task_id}>{task.task_name}</div>;
      })}
    </div>
  );
}

export default NewTasksList;
