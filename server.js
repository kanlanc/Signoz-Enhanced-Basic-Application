const express = require("express");
const axios = require("axios");

const app = express();

app.use(
  express.json({
    extended: false,
  })
);

require("./database");

const db = require("./utils/db");

app.get("/externalapidelay", (req, res) => {
  axios
    .get("https://infra.free.beeceptor.com/beerceptordelay")
    .then((response) => {
      console.log(response.data);
      res.status(200).send(response.data);
    });
});

app.get("/internalapidelay", (req, res) => {
  // add setTimeOut Here
  setTimeout(() => {
    res.status(200).send({ message: "I am sorry I am late by 2 seconds" });
  }, 2000);
});

app.get("/senderror", (req, res) => {
  res.status(500).send({ message: "We have an emergency!!" });
});

app.get("/databaseget", (req, res) => {
  // call get lokidb here
  db.loadDatabase({}, () => {
    var urls = db.getCollection("urlList");

    var url = urls.findOne({ urlCode: 1 });
    if (url) {
      return res.json({ longUrl: url.longUrl });
    } else {
      return res.status(404).json({ message: "No URL Found" });
    }
  });
});

app.post("/databasepost", (req, res) => {
  // Call LokiDb post here
  let longUrl = "x";
  let shortUrl = "y";
  let urlCode = "z";

  db.loadDatabase({}, () => {
    var urls = db.getCollection("urlList");

    var url = urls.findOne({ longUrl });
    if (!url) {
      let url = urls.insert({ longUrl, shortUrl, urlCode });

      db.save();
      return res.status(200).json({ shortUrl: url.shortUrl });
    }
    res.json(url);
  });
});

app.listen(9090);
