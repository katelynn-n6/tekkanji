const PORT = 8000;

const path = require("path");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  var kanji = req.query.kanji;
  const options = {
    method: "GET",
    url: "https://kanjialive-api.p.rapidapi.com/api/public/kanji/" + kanji,
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      "X-RapidAPI-Host": "kanjialive-api.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      //console.log(response.data);
      res.json(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.listen(PORT, () => console.log(PORT));
