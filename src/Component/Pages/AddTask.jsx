import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { filterByProjectNameClear } from "../../features/filter/filterSlice";
import {
  projectApi,
  useGetProjectsQuery,
} from "../../features/project/projectAPI";
import { useAddTaskMutation } from "../../features/tasks/tasksAPI";
import {
  teamMemberApi,
  useGetTeamsQuery,
} from "../../features/teamMember/teamMemberAPI";

const AddTask = () => {
  const [addTask, { isSuccess }] = useAddTaskMutation();
  const { data: projects } = useGetProjectsQuery();
  const { data: teamMembers } = useGetTeamsQuery();
  // all local state
  const [taskName, setTaskName] = useState("");
  const [teamMember, setTeamMember] = useState("");
  const [project, setProject] = useState("");
  const [deadline, setDeadline] = useState("");
  const [projectObj, setProjectObj] = useState({});
  const [teamMemberObj, setTeamMemberObj] = useState({});

  useEffect(() => {
    dispatch(filterByProjectNameClear());
  }, []);

  // Team member & project list
  const teamMemberList = [];
  teamMembers?.map((t) => teamMemberList.push(t.name));
  const projectList = [];
  projects?.map((p) => projectList.push(p.projectName));
  // Team member & project list

  const dispatch = useDispatch();

  // get teamMember obj
  useEffect(() => {
    dispatch(teamMemberApi.endpoints.getTeamByName.initiate(teamMember))
      .unwrap()
      .then((result) => {
        setTeamMemberObj(result);
      });
  }, [dispatch, teamMember]);

  // get project obj
  useEffect(() => {
    dispatch(projectApi.endpoints.getProjectByName.initiate(project))
      .unwrap()
      .then((result) => {
        setProjectObj(result);
      });
  }, [dispatch, project]);

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (teamMemberObj.length > 0 && projectObj.length > 0) {
      addTask({
        taskName,
        deadline,
        project: projectObj[0],
        teamMember: teamMemberObj[0],
      });
    }
  };
  return (
    <div className="container relative">
      <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
        <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
          Create Task for Your Team
        </h1>

        <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="fieldContainer">
              <label htmlFor="lws-taskName">Task Name</label>
              <input
                type="text"
                name="taskName"
                id="lws-taskName"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                required
                placeholder="Implement RTK Query"
              />
            </div>

            <div className="fieldContainer">
              <label>Assign To</label>
              <select
                name="teamMember"
                id="lws-teamMember"
                value={teamMember}
                onChange={(e) => setTeamMember(e.target.value)}
                required
              >
                <option value="" hidden>
                  Select Job
                </option>
                {teamMemberList?.map((tml, i) => (
                  <option key={i}>{tml}</option>
                ))}
              </select>
            </div>
            <div className="fieldContainer">
              <label htmlFor="lws-projectName">Project Name</label>
              <select
                id="lws-projectName"
                name="projectName"
                value={project}
                onChange={(e) => setProject(e.target.value)}
                required
              >
                <option value="" hidden>
                  Select Project
                </option>
                {projectList?.map((pl, i) => (
                  <option key={i}>{pl}</option>
                ))}
              </select>
            </div>

            <div className="fieldContainer">
              <label htmlFor="lws-deadline">Deadline</label>
              <input
                type="date"
                name="deadline"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                id="lws-deadline"
                required
              />
            </div>

            <div className="text-right">
              <button type="submit" className="lws-submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddTask;
