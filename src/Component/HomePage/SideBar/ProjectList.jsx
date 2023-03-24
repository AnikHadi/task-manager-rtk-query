import React from "react";
import { useGetProjectsQuery } from "../../../features/project/projectAPI";
import SingleProject from "./SingleProject";

const ProjectList = () => {
  const { data: projects } = useGetProjectsQuery();

  return (
    <div>
      <h3 className="text-xl font-bold">Projects</h3>
      <div className="mt-3 space-y-4">
        {projects?.map((p) => (
          <SingleProject project={p} key={p.id} />
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
