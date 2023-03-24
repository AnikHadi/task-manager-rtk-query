import { Route, Routes } from "react-router-dom";
import AddTask from "./Component/Pages/AddTask";
import EditTask from "./Component/Pages/EditTask";
import HomePage from "./Component/Pages/HomePage";
import Navbar from "./Component/Share/Navbar";

function App() {
  return (
    <div className="text-[#111827]">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/edit-task/:taskId" element={<EditTask />} />
      </Routes>
    </div>
  );
}

export default App;
