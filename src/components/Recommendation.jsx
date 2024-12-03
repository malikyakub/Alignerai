import React, { useState, useEffect } from "react";
import Recommender from "../../public/Models/recommendator";
import db from "../appwrite/database";

function Recommendation() {
  const [res, setRes] = useState("");
  const [loading, setLoading] = useState(true);
  const [tasks, SetTasks] = useState([]);
  const [taskInfo, setTaskInfo] = useState({ names: [], ids: [] });

  const cellName = (cell) => {
    if (cell == "R1C1") {
      return "quadrant one";
    } else if (cell == " R1C2") {
      return "quadrant two";
    } else if (cell == "R2C1") {
      return "quadrant three";
    } else {
      return "quadrant four";
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await db.Tasks.list();
        SetTasks(res.documents);

        // setTaskInfo({ names, ids });
      } catch (e) {
        console.log(e);
      }
    };
    fetchTasks();
  }, []);

  const instructions = `using the Eisenhower Matrix i want you to schedule these ${tasks.length} tasks as do first, do next and leave the other's`;
  const prompt = `I  have ${tasks.map(
    (task) => task.task_name
  )}, which each scheduled to ${tasks.map((task) =>
    cellName(task.task_is_set_to)
  )}, respectivelly`;

  useEffect(() => {
    async function fetchRecommendation(instructions) {
      try {
        const result = await Recommender(instructions);
        setRes(result);
      } catch (error) {
        console.error("Error fetching recommendation:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendation(instructions);
    console.log(instructions);
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      <h2>Recommendation:</h2>
      <pre className="w-full text-wrap px-4 text-xl font-sans leading-relaxed">
        {res}
      </pre>
    </div>
  );
}

export default Recommendation;
