import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { filterByProjectName } from "../../../features/filter/filterSlice";

const SingleProject = ({ project }) => {
  const { id, projectName, colorClass } = project || {};
  const [checked, setChecked] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(filterByProjectName({ id, projectName }));
  }, [checked]);

  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        className={colorClass}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <p className="label">{projectName}</p>
    </div>
  );
};

export default SingleProject;
