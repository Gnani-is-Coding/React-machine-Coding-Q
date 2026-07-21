import React, { useState } from "react";
import "./index.css";

function JiraBoard() {
  const [inputData, setInputData] = useState("");
  const [backlog, setbacklog] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);

  const handleOnDragStart = (e, task, source) => {
    e.dataTransfer.setData("task", task);
    e.dataTransfer.setData("source", source);
  };

  const handleOnDrop = (e, destination) => {
    e.preventDefault();

    const task = e.dataTransfer.getData("task");
    const source = e.dataTransfer.getData("source");

    console.log(task, source, destination, "Source");

    if (source !== destination) {
      switch (source) {
        case "Backlog":
          setbacklog(backlog.filter((obj) => obj !== task));
          break;
        case "InProgress":
          setInProgress(inProgress.filter((obj) => obj !== task));
          break;
        case "Completed":
          setCompleted(completed.filter((obj) => obj !== task));
          break;
        default:
          break;
      }

      switch (destination) {
        case "Backlog":
          setbacklog([...backlog, task]);
          break;
        case "InProgress":
          setInProgress([...inProgress, task]);
          break;
        case "Completed":
          setCompleted([...completed, task]);
          break;
        default:
          break;
      }
    }
  };
  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="jiraboard">
        <h1>Jira Board</h1>
        <input
          type="text"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
        <span>
          <button
            type="button"
            onClick={() => {
              setbacklog([...backlog, inputData]);
              setInputData("");
            }}
          >
            Add
          </button>
        </span>
      </div>

      <div className="columns-wrapper">
        <Column
          title="Backlog"
          tasksList={backlog}
          onDrop={handleOnDrop}
          onDragStart={handleOnDragStart}
          onDragOver={handleOnDragOver}
        />
        <Column
          title="InProgress"
          tasksList={inProgress}
          onDrop={handleOnDrop}
          onDragStart={handleOnDragStart}
          onDragOver={handleOnDragOver}
        />
        <Column
          title="Completed"
          tasksList={completed}
          onDrop={handleOnDrop}
          onDragStart={handleOnDragStart}
          onDragOver={handleOnDragOver}
        />
      </div>
    </div>
  );
}

const Column = ({ title, tasksList, onDrop, onDragStart, onDragOver }) => {
  return (
    <div
      className="column-container"
      onDragOver={(e) => onDragOver(e)}
      onDrop={(e) => onDrop(e, title)}
    >
      <h1 style={{ marginTop: "5px", marginBottom: "0px" }}>{title}</h1>

      {tasksList.map((obj, i) => (
        <div
          key={i}
          className="card"
          draggable
          onDragStart={(e) => onDragStart(e, obj, title)}
          id={i}
        >
          {obj}
        </div>
      ))}
    </div>
  );
};

export default JiraBoard;
