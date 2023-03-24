import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { filterByProjectNameClear } from "../../features/filter/filterSlice";
import { useGetProjectsQuery } from "../../features/project/projectAPI";
import {
  useEditTaskMutation,
  useGetTaskQuery,
} from "../../features/tasks/tasksAPI";
import { useGetTeamsQuery } from "../../features/teamMember/teamMemberAPI";

const EditTask = () => {
  const { taskId } = useParams();
  const { data: task } = useGetTaskQuery(taskId);
  const { data: projects } = useGetProjectsQuery();
  const { data: teamMembers } = useGetTeamsQuery();
  const [editTask, { isSuccess }] = useEditTaskMutation();

  // all local state
  const [taskName, setTaskName] = useState("");
  const [teamMember, setTeamMember] = useState("");
  const [project, setProject] = useState("");
  const [deadline, setDeadline] = useState("");
  const [projectObj, setProjectObj] = useState({});
  const [teamMemberObj, setTeamMemberObj] = useState({});
  const dispatch = useDispatch();

  // Team member & project list
  const teamMemberList = [];
  teamMembers?.map((t) => teamMemberList.push(t.name));
  const projectList = [];
  projects?.map((p) => projectList.push(p.projectName));
  // Team member & project list

  // get teamMember obj
  useEffect(() => {
    const findTeam = teamMembers?.find((tm) => tm.name === teamMember);
    setTeamMemberObj(findTeam);
  }, [dispatch, teamMember, teamMembers]);

  // get project obj
  useEffect(() => {
    const findProject = projects?.find((p) => p.projectName === project);
    setProjectObj(findProject);
  }, [dispatch, project, projects]);

  const navigate = useNavigate();

  // listen for edit mode active
  useEffect(() => {
    const { id, taskName, deadline, project, teamMember } = task || {};
    if (id) {
      setTaskName(taskName);
      setDeadline(deadline);
      setProject(project?.projectName);
      setTeamMember(teamMember?.name);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    editTask({
      id: task?.id,
      data: {
        taskName,
        teamMember: teamMemberObj,
        deadline,
        project: projectObj,
      },
    });
  };

  useEffect(() => {
    dispatch(filterByProjectNameClear());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  return (
    <div className="container relative">
      <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
        <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
          Edit Task for Your Team
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
                Update
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditTask;
