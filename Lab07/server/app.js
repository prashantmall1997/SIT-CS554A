console.clear();
require("dotenv").config();
var cors = require("cors");
const PORT = process.env.PORT ? process.env.PORT : 3000;
const express = require("express");
const app = express();
const configRoutes = require("./routes");

const bluebird = require("bluebird");
const redis = require("redis");

const client = redis.createClient();
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/pokemon/page/:page", async (req, res, next) => {
  let PokemonListPage = "PokemonListPage" + req.params.page;
  let cacheForPokemonListPageExists = await client.getAsync(PokemonListPage);
  if (cacheForPokemonListPageExists) {
    res.status(200).json(JSON.parse(cacheForPokemonListPageExists));
  } else {
    next();
  }
});

app.get("/pokemon/:id", async (req, res, next) => {
  let PokemonPageExists = "PokemonPage" + req.params.id;
  let cacheForPokemonPageExists = await client.getAsync(PokemonPageExists);
  if (cacheForPokemonPageExists) {
    res.status(200).json(JSON.parse(cacheForPokemonPageExists));
  } else {
    next();
  }
});

configRoutes(app);

app.listen(PORT, () => {
  console.log("We've now got a server!");
  console.log(`Your routes will be running on PORT ${PORT}`);
});
