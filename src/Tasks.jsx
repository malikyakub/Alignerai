import React from "react";
import Header from "./components/Header";
import Divider from "./components/Divider";
import TasksList from "./TasksList";
import Matrix from "./components/Matrix";
import AlignerBtn from "./components/AlignerBtn";

function Tasks() {
  const tasks = [
    {
      taskId: "#01",
      taskName: "dishes",
      taskDetail: "doing the dishes",
      taskDuration: "1 hour",
      taskPriority: "middle",
    },
    {
      taskId: "#02",
      taskName: "exercise",
      taskDetail: "12 assigned exercises",
      taskDuration: "4 hours",
      taskPriority: "high",
    },
    {
      taskId: "#03",
      taskName: "Exam",
      taskDetail: "midterm examination",
      taskDuration: "20 minutes",
      taskPriority: "low",
    },
  ];

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
          />
        ))}
      </div>
      <button className="btn bg-gold-100 text-gold-200 mt-5">Add Task</button>
      <div className="absolute w-full h-16 bg-gold-100 bottom-0">
        <AlignerBtn />
      </div>
    </div>
  );
}

export default Tasks;
