var loki = require("lokijs");

var db = new loki("db.json");

db.addCollection("urlList").insert([
  {
    urlCode: "1",
    longUrl: "https://www.kanlanc.com",
    shortUrl: "https://bit.ly/3Fu2qQ5",
  },
]);

db.saveDatabase();
