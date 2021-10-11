const express = require("express");
const exphbs = require("express-handlebars");
const configRoutes = require("./routes");

const bluebird = require("bluebird");
const redis = require("redis");

const client = redis.createClient();
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const static = express.static(__dirname + "/public");
app.use("/public", static);

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", async (req, res, next) => {
  let cacheForHomePageExists = await client.getAsync("homePage");
  if (cacheForHomePageExists) {
    res.send(cacheForHomePageExists);
  } else {
    next();
  }
});

app.get("/show/:id", async (req, res, next) => {
  let cacheForShowPageExists = await client.getAsync(`show_${req.params.id}`);
  if (cacheForShowPageExists) {
    res.send(cacheForShowPageExists);
  } else {
    next();
  }
});

app.post("/search", async (req, res, next) => {
  let cacheForSearchTerm = await client.getAsync(req.body.searchTerm);
  if (cacheForSearchTerm) {
    await client.zincrbyAsync("searchResults", 1, req.body.searchTerm);
    res.send(cacheForSearchTerm);
  } else {
    next();
  }
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
