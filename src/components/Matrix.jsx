import React, { useEffect, useState } from "react";
import db from "../appwrite/database";
import RCtasksLoading from "./Loadings/RCtasksLoading";
import Alert from "./Alert";

function Matrix() {
  const [R1C1TASKS, setToR1C1TASKS] = useState([]);
  const [R1C2TASKS, setToR1C2TASKS] = useState([]);
  const [R2C1TASKS, setToR2C1TASKS] = useState([]);
  const [R2C2TASKS, setToR2C2TASKS] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [taskNameShown, setTaskNameShown] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const r1c1_tasks = await db.R1C1.list();
        const r1c2_tasks = await db.R1C2.list();
        const r2c1_tasks = await db.R2C1.list();
        const r2c2_tasks = await db.R2C2.list();

        setToR1C1TASKS(r1c1_tasks.documents);
        setToR1C2TASKS(r1c2_tasks.documents);
        setToR2C1TASKS(r2c1_tasks.documents);
        setToR2C2TASKS(r2c2_tasks.documents);
      } catch (error) {
        <Alert msg={"Error fetching data"} cat={"error"} />;
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderTasks = (tasks) => {
    return isLoading ? (
      <RCtasksLoading />
    ) : (
      tasks.map((task) => {
        return (
          <div
            onClick={() => setTaskNameShown(!taskNameShown)}
            className="bg-[#ffffff33] py-4 px-2 w-full rounded"
            key={task.tasks.task_id}
          >
            {taskNameShown ? task.tasks.task_name : task.tasks.task_id}
          </div>
        );
      })
    );
  };

  return (
    <div className="mt-4 w-full flex gap-2 flex-wrap justify-center">
      <div className="w-[47%] flex items-center gap-2 p-2 overflow-scroll flex-col justify-start border border-prim-300 rounded h-40 bg-[#006a674d]">
        {renderTasks(R1C1TASKS)}
      </div>
      <div className="w-[47%] flex items-center gap-2 p-2 overflow-scroll flex-col justify-start border border-prim-200 rounded h-40 bg-[#fff4b74d]">
        {renderTasks(R1C2TASKS)}
      </div>
      <div className="w-[47%] flex items-center gap-2 p-2 overflow-scroll flex-col justify-start border border-prim-200 rounded h-40 bg-[#fff4b74d]">
        {renderTasks(R2C1TASKS)}
      </div>
      <div className="w-[47%] flex items-center gap-2 p-2 overflow-scroll flex-col justify-start border border-prim-100 rounded h-40 bg-[#A0153E4d]">
        {renderTasks(R2C2TASKS)}
      </div>
    </div>
  );
}

export default Matrix;
