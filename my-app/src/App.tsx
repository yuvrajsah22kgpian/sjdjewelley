import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/landingpage";
import LabGrownDiamond from "../pages/material/lab_grown_diamond_jewelry";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/material/lab_grown_diamond" element={<LabGrownDiamond/>} />
      {/* Add more routes here */}
    </Routes>
  );
}
