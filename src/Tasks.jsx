import React from "react";
import Header from "./components/Header";
import Divider from "./components/Divider";
import TasksList from "./TasksList";

function Tasks() {
  const tasks = [
      {
          taskId: "#01",
          taskName: "dishes",
          taskDetail: "doing the dishes",
          taskDuration: "1 hour",
          taskPriority: 'middle',
      },
      {
          taskId: "#02",
          taskName: "exercise",
          taskDetail: "12 assigned exercises",
          taskDuration: "4 hours",
          taskPriority: 'high',
      },
      {
          taskId: "#03",
          taskName: "Exam",
          taskDetail: "midterm examination",
          taskDuration: "20 minutes",
          taskPriority: 'low',
      }
  ];

  return (
      <div>
          <Header />
          <Divider />
          {tasks.map((task) => (
              <TasksList
                  key={task.taskId} // Add a unique key for each item
                  taskId={task.taskId}
                  taskName={task.taskName}
                  taskDetail={task.taskDetail}
                  taskDuration={task.taskDuration}
                  taskPriority={task.taskPriority}
              />
          ))}
      </div>
  );
}

export default Tasks;
