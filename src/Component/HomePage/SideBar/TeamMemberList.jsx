import React from "react";
import { useGetTeamsQuery } from "../../../features/teamMember/teamMemberAPI";
import SingleTeamMember from "./SingleTeamMember";

const TeamMemberList = () => {
  const { data: teamMembers } = useGetTeamsQuery();
  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold">Team Members</h3>
      <div className="mt-3 space-y-4">
        {teamMembers?.map((team) => (
          <SingleTeamMember teamMember={team} key={team.id} />
        ))}
      </div>
    </div>
  );
};

export default TeamMemberList;
