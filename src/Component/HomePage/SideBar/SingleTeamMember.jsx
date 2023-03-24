import React from "react";

const SingleTeamMember = ({ teamMember }) => {
  const { name, avatar } = teamMember || {};
  return (
    <div className="checkbox-container">
      <img src={avatar} className="team-avater" alt="#" />
      <p className="label">{name}</p>
    </div>
  );
};

export default SingleTeamMember;
