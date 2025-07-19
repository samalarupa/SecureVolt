import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import EnterKey from "./pages/EnterKey";
import Dashboard from "./pages/DashBoard";
import AddContent from "./pages/AddContent";

export default function App() {
  return (
   
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/enter-key" element={<EnterKey />} />
        <Route path="/dashboard/:key" element={<Dashboard />} />
        <Route path="/add/:key" element={<AddContent />} />
      </Routes>
  
  );
}
