import React from "react";
import MiddleContentHeader from "../HomePage/MiddleContent/MiddleContentHeader";
import MiddleContentList from "../HomePage/MiddleContent/MiddleContentList";
import ProjectList from "../HomePage/SideBar/ProjectList";
import TeamMemberList from "../HomePage/SideBar/TeamMemberList";

const HomePage = () => {
  return (
    <div className="container relative">
      <div className="sidebar">
        {/* <!-- Projects List --> */}
        <ProjectList />

        {/* <!-- Team Members --> */}
        <TeamMemberList />
      </div>

      <div className="lg:pl-[16rem] 2xl:pl-[23rem]">
        <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
          <MiddleContentHeader />

          <MiddleContentList />
        </main>
      </div>
    </div>
  );
};

export default HomePage;
