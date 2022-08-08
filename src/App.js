//import "./App.css";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import Learn from "./Pages/Learn";
import Home from "./Pages/Home";
import Review from "./Pages/Review";
import About from "./Pages/About";
import React from "react";

function App() {
  //<h3>a kanji learning system for JAPN at Georgia Tech</h3>

  let navigate = useNavigate();
  const moveAbout = () => {
    navigate("/tekkanji/about");
  };

  return (
    <div>
      <div className="App">
        <div className="header">
          <h1>tekkanji</h1>
          <h2>テック + かんじ</h2>
        </div>

        <Routes>
          <Route path="/tekkanji" element={<Home />} />
          <Route path="/tekkanji/learn" element={<Learn />} />
          <Route path="/tekkanji/review" element={<Review />} />
          <Route path="/tekkanji/about" element={<About />} />
        </Routes>
      </div>
      <div id="about" className="about">
        <div onClick={moveAbout}>about</div>
      </div>
    </div>
  );
}

export default App;
