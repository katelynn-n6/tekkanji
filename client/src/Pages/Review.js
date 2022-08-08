import React from "react";

import { useNavigate, useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";

function Review() {
  const { state } = useLocation();
  // const { lesson, level, kanji, kanjiStr } = state;

  let navigate = useNavigate();
  const navigateHome = () => navigate("/tekkanji");

  return (
    <div className="App">
      <div>{"under construction... すみません"}</div>

      <div>
        <button onClick={navigateHome}> home </button>
      </div>
    </div>
  );
}

export default Review;
