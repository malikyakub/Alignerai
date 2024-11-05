import React from "react";
import styles from "./Matrix.module.css";

function Matrix() {
  return (
    <div className={`mt-4 w-full flex gap-2 flex-wrap justify-center`}>
      <div
        className={`w-[47%] flex items-center justify-center h-40 bg-[#006a674d] ${styles.parent}`}
      >
        <h3 className="uppercase text-sm flex-col items-center justify-center hidden">
          urgert <span className="text-xl text-white -200 font-bold">/</span>{" "}
          important{" "}
        </h3>
      </div>
      <div
        className={`w-[47%] flex items-center justify-center h-40 bg-[#fff4b74d] ${styles.parent}`}
      >
        <h3 className="uppercase text-sm flex-col items-center justify-center hidden">
          urgert <span className="text-xl text-white -200 font-bold">/</span>{" "}
          not-important{" "}
        </h3>
      </div>
      <div
        className={`w-[47%] flex items-center justify-center h-40 bg-[#fff4b74d] ${styles.parent}`}
      >
        <h3 className="uppercase text-sm flex-col items-center justify-center hidden">
          not-urgert{" "}
          <span className="text-xl text-white -200 font-bold">/</span> important{" "}
        </h3>
      </div>
      <div
        className={`w-[47%] flex items-center justify-center h-40 bg-[#A0153E4d] ${styles.parent}`}
      >
        <h3 className="uppercase text-sm flex-col items-center justify-center hidden">
          not-urgert{" "}
          <span className="text-xl text-white -200 font-bold">/</span>{" "}
          not-important{" "}
        </h3>
      </div>
    </div>
  );
}

export default Matrix;
