import React from "react";
import { useSelector } from "react-redux";
import { useGetTasksQuery } from "../../../features/tasks/tasksAPI";
import SingleMiddleContent from "./SingleMiddleContent";

const MiddleContentList = () => {
  const { data: tasks } = useGetTasksQuery();
  const copyTask = tasks?.map((task) => {
    if (task.status === undefined) {
      return { ...task, status: "pending" };
    } else {
      return task;
    }
  });

  const { searchByFilter, projectNameArray } = useSelector(
    (state) => state.filter
  );

  const filterBySearch = (task) =>
    task.taskName.toLocaleLowerCase().includes(searchByFilter);

  const filterByProject = (task) => {
    if (projectNameArray?.length > 0) {
      return projectNameArray.includes(task?.project?.projectName);
    }
  };

  return (
    <div className="lws-task-list">
      {copyTask
        ?.filter(filterBySearch)
        ?.filter(filterByProject)
        ?.map((task) => (
          <SingleMiddleContent task={task} key={task.id} />
        ))}
    </div>
  );
};

export default MiddleContentList;
