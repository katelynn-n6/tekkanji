import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Learn() {
  const { state } = useLocation();
  const { lesson, level, kanji, kanjiStr } = state;

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
          console.log("ended");
          setTimeout(function () {
            v.play();
          }, 3000);
        }
      }
      for (const el of video) {
        reset(el);
      }
      done = !done;
    }
  };

  const move = () => {
    setIndex(index + 1);
  };

  const moveBack = () => {
    setIndex(index - 1);
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
    var videos = document.getElementsByClassName("stroke");
    for (let i = 0; i < videos.length; i++) {
      videos[i].playbackRate = 1.25;
      videos[i].pause();
      videos[i].currentTime = 0;
      if (i === index) {
        videos[i].play();
      }
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
      <div>
        <p>
          {" you chose L"}
          {lesson} and you are in JAPN {level}
          {"! "}
        </p>
        <p>the kanji in this lesson are: {kanjiStr}</p>
      </div>
      <div className="box-a-box">
        {kanji.map((item, idx) => {
          return (
            <div className="full-box" key={idx}>
              <div className="kanji-box">
                <div className="video">
                  <video
                    muted
                    className="stroke"
                    onPlay={(e) => replay(e)}
                    width="190px"
                  >
                    <source src={item.kanji.video.mp4} type="video/mp4" />
                  </video>
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
                            onClick={(e) => playAudio(idx, i)}
                          >
                            {"▶"}
                          </button>
                          <div
                            className="ex-jpn"
                            id={"jpn" + idx + i}
                            onClick={(e) => toggleEngJpn(idx, i)}
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
        <button id="back" className="learn-btn" onClick={moveBack}>
          {"<"}
        </button>

        <button onClick={navigateHome}> home </button>

        <button id="fwd" className="learn-btn" onClick={move}>
          {">"}
        </button>
      </div>
    </div>
  );
}

export default Learn;
