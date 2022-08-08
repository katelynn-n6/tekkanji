import React from "react";

import { useNavigate } from "react-router-dom";

function About() {
  let navigate = useNavigate();
  const navigateHome = () => {
    navigate("/tekkanji");
    document.getElementById("about").style.display = "block";
  };

  document.getElementById("about").style.display = "none";

  return (
    <div className="App">
      <h3>about</h3>
      <div className="about-info">
        <div>
          <p>built by Katelynn Nguyen</p>
          <p>
            {"supported by the "}
            <a href="https://app.kanjialive.com/api/docs">KanjiAlive API</a>
          </p>
          <p>
            {"supporting the "}
            <a href="https://a2096-19034049.cluster208.canvas-user-content.com/courses/2096~1190/files/2096~19034049/course%20files/kanji/kanjilist-new.html">
              322 kanji
            </a>{" "}
            taught in JAPN 1001-3001 at Georgia Tech
          </p>
        </div>
      </div>
      <div>
        <button onClick={navigateHome}> home </button>
      </div>
    </div>
  );
}

export default About;
