import "./App.css";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import load from "../assets/load.gif";

//

function Home() {
  const [lessons, setLessons] = useState([]);
  const [level, setLevel] = useState(0);
  const [lesson, setLesson] = useState(0);
  const [textbook, setTextbook] = useState(0);
  const [kanji, setKanji] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [kanjiReal, setKanjiReal] = useState([]);

  const PORT =
    process.env.NODE_ENV === "development" ? "http://localhost:8000" : "";

  const getKanji = async () => {
    let newReal = [];
    let kanjiArr = kanji.split("");
    setIsLoading(true);
    for (let i = 0; i < kanjiArr.length; i++) {
      const options = {
        method: "GET",
        /* `${process.env.REACT_APP_URL}:${PORT} */
        // "http://localhost:8000"
        url: `${PORT}/kanji`,
        params: { kanji: encodeURI(kanjiArr[i]) },
      };
      //console.log("we half-did it");
      //console.log(options);

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

  const gtKanjiMap = new Map([
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

  const genkiMap = new Map([
    ["3", "一二三四五六七八九十百千万円時"],
    ["4", "日本人月火水木金土曜上下中半"],
    ["5", "山川元気天私今田女男見行食飲"],
    ["6", "東西南北口出右左分先生大学外国"],
    ["7", "京子小会社父母高校毎語文帰入"],
    ["8", "員新聞作仕事電車休言読思次何"],
    ["9", "午後前名白雨書友間家話少古知来"],
    ["10", "住正年売買町長道雪立自夜朝持"],
    ["11", "手紙好近明病院映画歌市所勉強有旅"],
    ["12", "昔々神早起牛使働連別度赤青色"],
    ["13", "物鳥料理特安飯肉悪体同着空港昼海"],
    ["14", "彼代留族親切英店去急乗当音楽医者"],
    ["15", "死意味注夏魚寺広足転借走場建地通"],
    ["16", "供世界全部始週考開屋方運動教室以"],
    ["17", "野習主歳集発表品写真字活結婚歩"],
    ["18", "目的洋服堂力授業試験貸図館終宿題"],
    ["19", "春秋冬花様不姉兄漢卒工研究質問多"],
    ["20", "皿声茶止枚両無払心笑絶対痛最続"],
    ["21", "信経台風犬重初若送幸計遅配弟妹"],
    ["22", "記銀回夕黒用末待残駅番説案内忘守"],
    ["23", "顔悲怒違変比情感調査果化横相答"],
  ]);

  const lessonMap = new Map([
    [
      1001,
      [
        ["5", "6A", "6B"],
        ["3", "4", "5"],
      ],
    ],
    [
      1002,
      [
        ["7", "8", "9", "10", "11"],
        ["6", "7", "8", "9"],
      ],
    ],
    [
      2001,
      [
        ["12", "13", "14", "15", "16"],
        ["10", "11", "12", "13", "14"],
      ],
    ],
    [
      2002,
      [
        ["17", "18", "19", "20", "21"],
        ["15", "16", "17", "18", "19"],
      ],
    ],
    [
      3001,
      [
        ["22", "23", "24", "25"],
        ["20", "21", "22", "23"],
      ],
    ],
  ]);

  let navigate = useNavigate();

  function whichKanji() {
    if (lesson) {
      if (textbook === 0) {
        setKanji(gtKanjiMap.get(lesson));
      } else {
        setKanji(genkiMap.get(lesson));
      }
    }
  }

  const classClick = (e, num) => {
    setLevel(num);
    setLessons(lessonMap.get(num)[textbook]);
    toggleColor(e, "classOpt");
    document.getElementById("textbook").style.visibility = "visible";
  };

  const textbookClick = (e, num) => {
    setTextbook(num);
    setLessons(lessonMap.get(level)[num]);
    toggleColor(e, "textbookOpt");
    toggleColor(e, "lessonOpt");
    document.getElementById("lesson").style.visibility = "visible";
  };

  const lessonClick = (e, num) => {
    setLesson(num);
    toggleColor(e, "lessonOpt");
    document.getElementById("begin").style.visibility = "visible";
  };

  const toggleColor = (e, option) => {
    var btn = document.getElementsByClassName(option);
    for (let i = 0; i < btn.length; i++) {
      btn[i].classList.remove("active");
    }
    e.currentTarget.classList.add("active");
    if (option === "classOpt") {
      toggleColor(e, "lessonOpt");
    }
  };

  const showLessons = () => {
    for (let i = 0; i < lessons.length; i++) {
      document.getElementById(i).innerText = "L" + lessons[i];
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

  useEffect(() => {
    showLessons();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessons]);

  useEffect(() => {
    whichKanji();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson]);

  function Redirect() {
    navigate("/learn", {
      state: {
        lesson: lesson,
        level: level,
        kanji: kanjiReal,
      },
    });
    console.log("going to learn :D");
  }

  return (
    <div className="App">
      <div className="header">
        <h1>tekkanji</h1>
        <h2>テック + かんじ</h2>
      </div>
      <div className="class">
        <div>class?</div>
        <div className="classOptions">
          {[1001, 1002, 2001, 2002, 3001].map((c) => {
            return (
              <button
                key={c}
                className="classOpt"
                onClick={(e) => classClick(e, c)}
              >{`japn ${c}`}</button>
            );
          })}
        </div>

        <div className="textbook" id="textbook">
          <div>textbook?</div>
          <div className="classOptions">
            <button
              className="textbookOpt"
              onClick={(e) => {
                textbookClick(e, 0);
              }}
            >
              GT online
            </button>
            <button
              className="textbookOpt"
              onClick={(e) => {
                textbookClick(e, 1);
              }}
            >
              Genki (3rd)
            </button>
          </div>
        </div>

        <div className="lesson" id="lesson">
          <div>lesson?</div>
          <div className="lessonOptions">
            {[0, 1, 2].map((l) => {
              return (
                <button
                  id={l}
                  key={l}
                  className="lessonOpt"
                  onClick={(e) => lessonClick(e, lessons[l])}
                ></button>
              );
            })}
            {level !== 1001 && (
              <button
                id={3}
                className="lessonOpt"
                onClick={(e) => lessonClick(e, lessons[3])}
              ></button>
            )}
            {level !== 3001 &&
              level !== 1001 &&
              !(textbook === 1 && level === 1002) && (
                <button
                  id={4}
                  className="lessonOpt"
                  onClick={(e) => lessonClick(e, lessons[4])}
                ></button>
              )}
          </div>
        </div>
      </div>

      <div>
        <button
          disabled={isLoading}
          onClick={Redirect}
          className="begin"
          id="begin"
        >
          {isLoading && <img width="20" src={load} alt="loading..." />}
          {!isLoading && <b>始めましょう！</b>}
        </button>
      </div>
    </div>
  );
}

export default Home;
