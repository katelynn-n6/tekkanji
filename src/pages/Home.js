import "./App.css";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import load from "../load.gif";

//

function Home() {
  const [lessons, setLessons] = useState([]);
  const [level, setLevel] = useState(0);
  const [lesson, setLesson] = useState(0);
  const [lor, setLor] = useState(0);
  const [kanji, setKanji] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [kanjiReal, setKanjiReal] = useState([]);

  const getKanji = async () => {
    let newReal = [];
    let kanjiArr = kanji.split("");
    setIsLoading(true);
    for (let i = 0; i < kanjiArr.length; i++) {
      const options = {
        method: "GET",
        /* `${process.env.REACT_APP_URL}:${PORT} */
        // "http://localhost:8000"
        url: "/kanji",
        params: { kanji: encodeURI(kanjiArr[i]) },
      };
      console.log("we half-did it");

      await axios
        .request(options)
        .then(function (response) {
          //console.log(response.data);
          newReal.push(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
    setIsLoading(false);
    setKanjiReal(newReal);
  };

  const kanjiMap = new Map([
    ["5", "田中日本山上下人"],
    ["6A", "一二三四五六七八九十"],
    ["6B", "学生先私外大小"],
    ["7", "今時月火水木金土曜半分週毎年間何"],
    ["8", "行来帰食飲見聞読書子川夜朝午後前"],
    ["9", "百千万円新古少白買右左長売言話国語"],
    ["10", "元気入休住出会持高校仕事電車社員"],
    ["11", "男女口目耳手足名父母兄弟姉妹家族"],
    ["12", "東京西南北道雨雪思立文作旅予定約自"],
    ["13", "度好近明起牛映画町連市所勉強有友次"],
    ["14", "物鳥料理特安飯肉悪体空港着同海昼"],
    ["15", "物鳥料理特安飯肉悪体空港着同海昼"],
    ["16", "昔神彼代留親切英店去急乗当音医者"],
    ["17", "死意味注夏魚寺広転借走建地場通"],
    ["18", "供世界全部始以考開屋方運動教室"],
    ["19", "歳習主結婚集発表品字活写真歩野"],
    ["20", "的力洋服堂授業試験貸図館終宿題"],
    ["21", "春秋冬花様不漢卒工研究質問多"],
    ["22", "春秋冬花様不漢卒工研究質問多"],
    ["23", "盗降信経台風犬重初若送幸計遅配"],
    ["24", "記銀回夕黒用守末待残番駅説案内忘"],
    ["25", "顔情怒変相横比化違悲調査果感答"],
  ]);

  let navigate = useNavigate();

  function whichKanji() {
    if (lesson) {
      setKanji(kanjiMap.get(lesson));
    }
  }

  const classClick = (event, num) => {
    setLevel(num);
    toggleColor(event, "classOpt");
    if (num === 1001) {
      setLessons(["5", "6A", "6B"]);
    } else if (num === 1002) {
      setLessons(["7", "8", "9", "10", "11"]);
    } else if (num === 2001) {
      setLessons(["12", "13", "14", "15", "16"]);
    } else if (num === 2002) {
      setLessons(["17", "18", "19", "20", "21"]);
    } else if (num === 3001) {
      setLessons(["22", "23", "24", "25"]);
    }
    document.getElementById("lesson").style.visibility = "visible";
  };

  const lessonClick = (event, num) => {
    setLesson(num);
    toggleColor(event, "lessonOpt");
    document.getElementById("lor").style.visibility = "visible";
  };

  const lorClick = (event, num) => {
    setLor(num);
    toggleColor(event, "lorOpt");
    document.getElementById("leggo").style.visibility = "visible";
  };

  const toggleColor = (event, option) => {
    var btn = document.getElementsByClassName(option);
    for (let i = 0; i < btn.length; i++) {
      btn[i].classList.remove("active");
    }
    event.currentTarget.classList.add("active");
    if (option === "classOpt") {
      toggleColor(event, "lessonOpt");
    }
  };

  const showLessons = () => {
    let string = "1";
    for (let i = 0; i < lessons.length; i++) {
      document.getElementById(string).innerText = "L" + lessons[i];
      string += "1";
    }
  };

  useEffect(() => {
    getKanji();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kanji]);

  useEffect(() => {
    console.log(kanjiReal);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kanjiReal]);

  function Redirect() {
    if (lor === 1) {
      navigate("/learn", {
        state: {
          lesson: lesson,
          level: level,
          kanji: kanjiReal,
        },
      });
      console.log("going to learn :D");
    } else if (lor === 2) {
      navigate("/review", {
        state: {
          lesson: lesson,
          level: level,
          kanji: kanjiReal,
        },
      });
      console.log("going to review D:");
    }
  }

  useEffect(() => {
    showLessons();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  useEffect(() => {
    whichKanji();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson]);

  return (
    <div className="App">
      <div className="class">
        <div>which class?</div>
        <div className="classOptions">
          <button
            className="classOpt"
            onClick={(event) => classClick(event, 1001)}
          >
            japn 1001
          </button>
          <button
            className="classOpt"
            onClick={(event) => classClick(event, 1002)}
          >
            japn 1002
          </button>
          <button
            className="classOpt"
            onClick={(event) => classClick(event, 2001)}
          >
            japn 2001
          </button>
          <button
            className="classOpt"
            onClick={(event) => classClick(event, 2002)}
          >
            japn 2002
          </button>
          <button
            className="classOpt"
            onClick={(event) => classClick(event, 3001)}
          >
            japn 3001
          </button>
        </div>
        <div className="lesson" id="lesson">
          <div>which lesson?</div>

          <div className="lessonOptions">
            <button
              id="1"
              className="lessonOpt"
              onClick={(event) => lessonClick(event, lessons[0])}
            ></button>
            <button
              id="11"
              className="lessonOpt"
              onClick={(event) => lessonClick(event, lessons[1])}
            ></button>
            <button
              id="111"
              className="lessonOpt"
              onClick={(event) => lessonClick(event, lessons[2])}
            ></button>
            {!(level === 1001) && (
              <button
                id="1111"
                className="lessonOpt"
                onClick={(event) => lessonClick(event, lessons[3])}
              ></button>
            )}
            {!(level === 3001) && !(level === 1001) && (
              <button
                id="11111"
                className="lessonOpt"
                onClick={(event) => lessonClick(event, lessons[4])}
              ></button>
            )}
          </div>
        </div>

        <div className="lor" id="lor">
          <div>learn or review?</div>
          <div className="classOptions">
            <button
              className="lorOpt"
              onClick={(event) => {
                lorClick(event, 1);
              }}
            >
              learn
            </button>
            <button className="lorOpt" onClick={(event) => lorClick(event, 2)}>
              review
            </button>
          </div>
        </div>
      </div>

      <div>
        <button
          disabled={isLoading}
          onClick={Redirect}
          className="leggo"
          id="leggo"
        >
          {isLoading && <img width="20" src={load} alt="loading..." />}
          {!isLoading && <b>始めましょう！</b>}
        </button>
      </div>

      {/* 
      {lor === 1 && kanji !== "" && (
        <div className="learn">
          いらっしゃいませ〜! you chose L{lesson} and you are in JAPN {level}
          {". "}
          {console.log(kanjiReal)}
          {/* 
          {kanjiReal.map((item, idx) => {
            return (
              <div className="kanji-box" key={idx}>
                <h3>character: {item}</h3>
              </div>
            );
          })} }
        </div>
      )}
 */}
    </div>
  );
}

export default Home;
