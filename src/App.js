//import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Learn from "./pages/Learn";
import Home from "./pages/Home";
import Review from "./pages/Review";
import About from "./pages/About";
import React from "react";

function App() {
  //<h3>a kanji learning system for JAPN at Georgia Tech</h3>

  let navigate = useNavigate();
  const moveAbout = () => {
    navigate("/about");
  };

  return (
    <div>
      <div className="App">
        <div className="header">
          <h1>tekkanji</h1>
          <h2>テック + かんじ</h2>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/review" element={<Review />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <div id="about" className="about">
        <div onClick={moveAbout}>about</div>
      </div>
    </div>
  );
}

export default App;
