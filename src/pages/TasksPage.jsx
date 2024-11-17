import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Divider from "../components/Divider";

import db from "../appwrite/database";
import Matrix from "../components/Matrix";
import AlignerBtn from "../components/AlignerBtn";
import TaskDiv from "../components/TaskDiv";
import TaskLoading from "../components/Loadings/TaskLoading";

function Tasks() {
  const [taskInfo, setTaskInfo] = useState({
    task_id: "",
    task_name: "",
    task_details: "",
    task_duration: "",
    task_is_set: "",
  });
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await db.Tasks.list();
        setTasks(response.documents);

        if (response.documents.length > 0) {
          const firstTask = response.documents[0];
          setTaskInfo({
            task_id: firstTask.task_id,
            task_name: firstTask.task_name,
            task_details: firstTask.task_details,
            task_duration: firstTask.task_duration,
            task_is_set: firstTask.task_is_set,
          });
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <Header />
      <Matrix />
      <Divider />
      <div className="h-[150px] w-full overflow-y-scroll">
        {loading ? (
          <TaskLoading />
        ) : (
          tasks.map((task) => (
            <TaskDiv
              key={task.task_id}
              taskInfo={{
                task_id: task.task_id,
                task_name: task.task_name,
                task_details: task.task_details,
                task_duration: task.task_duration,
                task_is_set: task.task_is_set,
              }}
            />
          ))
        )}
      </div>
      <a href="/add-task" className="btn bg-gold-100 text-gold-200 mt-5">
        Add Task
      </a>
      <footer className="fixed bottom-0 w-full h-16 bg-gold-100">
        <AlignerBtn />
      </footer>
    </div>
  );
}

export default Tasks;
