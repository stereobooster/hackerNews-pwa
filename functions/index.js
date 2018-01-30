const functions = require("firebase-functions");
const Firebase = require("firebase");
const express = require("express");
// const LRU = require("lru-cache");

const version = "/v0";
const config = {
  databaseURL: "https://hacker-news.firebaseio.com"
};

Firebase.initializeApp(config);
const api = Firebase.database().ref(version);
api.onServer = true;

// fetched item cache
// api.cachedItems = LRU({
//   max: 1000,
//   maxAge: 1000 * 60 * 15 // 15 min cache
// });

// cache the latest story ids
// api.cachedIds = {};

const app = express();
app.get("/api/item/:id", (request, response) => {
  api
    .child(`item/${request.params.id}`)
    .limitToFirst(1)
    .once("value")
    .then(s => {
      response.setHeader("Cache-Control", "public, max-age=900");
      response.set("Content-Type", "application/json");
      response.send(JSON.stringify(s.val()));
    });
});

["top", "new", "show", "ask", "job"].forEach(type => {
  app.get(`/api/${type}`, (request, response) => {
    api
      .child(`${type}stories`)
      .limitToFirst(10)
      .once("value", snapshot => {
        const resPromises = (snapshot.val() || []).map(id =>
          api
            .child(`item/${id}`)
            .once("value")
            .then(s => s.val())
        );
        Promise.all(resPromises)
          .then(res => {
            response.setHeader("Cache-Control", "public, max-age=900");
            response.set("Content-Type", "application/json");
            // response.send(res);
            response.send(
              res.map(x => ({
                id: x.id,
                url: x.url,
                title: x.title,
                points: x.score,
                user: x.by,
                time_ago: x.time,
                type: x.type,
                comments_count: x.descendants
              }))
            );
          })
          .catch(err => {
            response.status(500).send(err);
          });
      });
  });
});

exports.app = functions.https.onRequest(app);
