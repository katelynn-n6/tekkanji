const PORT = process.env.PORT || 8000;

const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());

if (process.env.NODE_ENV === "production") {
  // Exprees will serve up production assets
  app.use(express.static("./build"));

  // Express serve up index.html file if it doesn't recognize route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

app.get("/kanji", (req, res) => {
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

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
