import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Divider from "../components/Divider";
import TasksList from "../components/TasksList";
import Matrix from "../components/Matrix";
import AlignerBtn from "../components/AlignerBtn";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setTasks(data.tasks))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <Header />
      <Matrix />
      <Divider />
      <div className="h-[150px] w-full overflow-y-scroll">
        {tasks.map((task) => (
          <TasksList
            key={task.taskId}
            taskId={task.taskId}
            taskName={task.taskName}
            taskDetail={task.taskDetail}
            taskDuration={task.taskDuration}
            taskPriority={task.taskPriority}
            taskisSet={task.taskisSet}
          />
        ))}
      </div>
      <a href="/add-task" className="btn bg-gold-100 text-gold-200 mt-5">Add Task</a>
      <footer className="fixed bottom-0 w-full h-16 bg-gold-100">
        <AlignerBtn />
      </footer>
    </div>
  );
}

export default Tasks;
