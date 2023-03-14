import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import play from "../assets/play.svg";
import pause from "../assets/pause.svg";
import next from "../assets/next.svg";
import prev from "../assets/prev.svg";

function Learn() {
  const { state } = useLocation();
  const { lesson, level, kanji } = state;

  let navigate = useNavigate();
  const navigateHome = () => navigate("/");

  const [index, setIndex] = useState(0);

  let done = false;
  const replay = (e) => {
    if (!done) {
      var video = document.getElementsByClassName("stroke");
      function reset(v) {
        v.addEventListener("ended", myHandler, false);
        function myHandler(e) {
          // console.log("ended");
          v.play();
        }
      }
      for (const el of video) {
        reset(el);
      }
      done = !done;
    }
  };

  const togglePlayPause = (idx) => {
    var video = document.getElementById(`vid${idx}`);
    var icon = document.getElementById(`playPause${idx}`);
    if (video.paused) {
      video.play();
      icon.src = pause;
    } else {
      video.pause();
      icon.src = play;
    }
  };

  const nextStroke = (item, idx) => {
    var video = document.getElementById(`vid${idx}`);
    var icon = document.getElementById(`playPause${idx}`);
    var timings = item.kanji.strokes.timings;
    video.pause();
    if (video.currentTime !== video.duration) {
      icon.src = play;
      for (let i = 0; i < timings.length; i++) {
        if (video.currentTime + 0.1 < timings[i]) {
          video.currentTime = timings[i];
          return;
        }
      }
    }
    video.currentTime = video.duration;
  };

  const lastStroke = (item, idx) => {
    var video = document.getElementById(`vid${idx}`);
    var icon = document.getElementById("playPause");
    var timings = item.kanji.strokes.timings;
    video.pause();
    if (video.currentTime !== 0) {
      icon.src = play;
      for (let i = timings.length; i > 0; i--) {
        if (video.currentTime - 0.1 > timings[i] && i !== 0) {
          video.currentTime = timings[i];
          return;
        }
      }
    }
  };

  const move = (idx) => {
    setIndex(idx);
    document.getElementById(index).style.backgroundColor = "transparent";
    // previous index
    document.getElementById(idx).style.backgroundColor = "lightblue";
  };

  const toggleEngJpn = (idx, num) => {
    document.getElementById("jpn" + idx + num).style.display = "none";
    document.getElementById("eng" + idx + num).style.display = "inline-block";
    setTimeout(function () {
      document.getElementById("eng" + idx + num).style.display = "none";
      document.getElementById("jpn" + idx + num).style.display = "inline-block";
    }, 2000);
  };

  const playAudio = (idx, num) => {
    document.getElementById("audio" + idx + num).play();
  };

  useEffect(() => {
    document.getElementById(0).style.backgroundColor = "lightblue";
  }, []);

  useEffect(() => {
    var videos = document.getElementsByClassName("stroke");
    for (let i = 0; i < videos.length; i++) {
      videos[i].pause();
      videos[i].currentTime = 50;
    }
    var boxes = document.getElementsByClassName("full-box");
    document.getElementById("fwd").style.visibility = "visible";
    document.getElementById("back").style.visibility = "visible";
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].style.display = "none";
      if (i === index) {
        boxes[i].style.display = "block";
      }
    }
    if (index === boxes.length - 1) {
      document.getElementById("fwd").style.visibility = "hidden";
    } else if (index === 0) {
      document.getElementById("back").style.visibility = "hidden";
    }
  }, [index]);

  return (
    <div className="App">
      <div className="header">
        <h1>テッカンジ</h1>
      </div>
      <h3>
        JAPN {level} - L{lesson}
      </h3>
      <div>
        {kanji.map((item, idx) => {
          return (
            <button
              id={idx}
              key={idx}
              className="link"
              onClick={() => move(idx)}
            >
              {item.kanji.character}
            </button>
          );
        })}
      </div>
      <div className="box-a-box">
        {kanji.map((item, idx) => {
          return (
            <div className="full-box" key={idx}>
              <div className="kanji-box">
                <div className="video-box">
                  <div className="video">
                    <video
                      muted
                      id={"vid" + idx}
                      className="stroke"
                      onPlay={(e) => replay(e)}
                      width="190px"
                    >
                      <source src={item.kanji.video.mp4} type="video/mp4" />
                    </video>
                  </div>
                  <div className="controls">
                    <button
                      className="ctrl"
                      onClick={() => lastStroke(item, idx)}
                    >
                      <img
                        className="icon"
                        src={prev}
                        alt="play or pause button"
                      ></img>
                    </button>
                    <button
                      className="ctrl"
                      onClick={() => togglePlayPause(idx)}
                    >
                      <img
                        id={`playPause${idx}`}
                        className="icon"
                        src={play}
                        alt="play or pause button"
                      ></img>
                    </button>
                    <button
                      className="ctrl"
                      onClick={() => nextStroke(item, idx)}
                    >
                      <img
                        className="icon"
                        src={next}
                        alt="play or pause button"
                      ></img>
                    </button>
                  </div>
                </div>
                <div className="info">
                  <p>
                    kanji: <span>{item.kanji.character}</span>
                  </p>
                  <p>
                    meaning: <span>{item.kanji.meaning.english}</span>
                  </p>
                  <p>
                    kun: <span>{item.kanji.kunyomi.hiragana}</span>
                  </p>
                  <p>
                    on: <span>{item.kanji.onyomi.katakana}</span>
                  </p>
                </div>
              </div>
              <div className="example-box">
                <div className="examples">
                  {item.examples.map((ex, i) => {
                    return (
                      <div className="ex-box" key={i}>
                        <div className="ex">
                          <button
                            className="play-btn"
                            onClick={() => playAudio(idx, i)}
                          >
                            {"▶"}
                          </button>
                          <div
                            className="ex-jpn"
                            id={"jpn" + idx + i}
                            onClick={() => toggleEngJpn(idx, i)}
                          >
                            {ex.japanese}
                          </div>
                          <div className="ex-eng" id={"eng" + idx + i}>
                            {ex.meaning.english}
                          </div>

                          <audio id={"audio" + idx + i}>
                            <source
                              src={ex.audio.mp3}
                              type="audio/mpeg"
                            ></source>
                          </audio>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <button id="back" className="learn-btn" onClick={() => move(index - 1)}>
          {"<"}
        </button>
        <button onClick={navigateHome}> home </button>
        <button id="fwd" className="learn-btn" onClick={() => move(index + 1)}>
          {">"}
        </button>
      </div>
    </div>
  );
}

export default Learn;
