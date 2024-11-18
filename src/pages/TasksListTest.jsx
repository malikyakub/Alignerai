import React, { useEffect, useState } from "react";
import db from "../appwrite/database";

// function TasksListTest() {
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await db.Tasks.list();
//         setTasks(response.documents);
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//       }
//     }
//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h1>Tasks</h1>
//       {tasks.map((task) => {
//         return <div key={task.task_id}>{task.task_name}</div>;
//       })}
//     </div>
//   );
// }

// export default TasksListTest;

function TasksListTest() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await db.Tasks.list();
        setTasks(response.documents);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }

      // console.table(tasks)
    }
    fetchData();
  }, []);
  return (
    <div>
      {tasks.map((task) => {
        console.log(task.id)
        return <div key={task.task_id}>{task.$id}</div>;
      })}
    </div>
  );
}

export default TasksListTest;
