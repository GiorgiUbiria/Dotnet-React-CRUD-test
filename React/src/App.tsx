import { Routes, Route } from "react-router-dom";
import ItemPage from "./ItemPage";
import MainPage from "./MainPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/item/:id" element={<ItemPage />} />
    </Routes>
  );
}

export default App;
