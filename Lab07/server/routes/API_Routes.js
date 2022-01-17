const express = require("express");
const router = express.Router();
const { APIdata } = require("./../data/index");

const bluebird = require("bluebird");
const redis = require("redis");

const client = redis.createClient();
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

router.get("/pokemon/page/:page", async (req, res) => {
  try {
    let PokemonListPage = "PokemonListPage" + req.params.page;
    let pokemonList = await APIdata.getAllPokemon(req.params.page);
    if (pokemonList.length === 0) {
      res.status(404).json({
        error: "Invalid Page Number",
      });
    } else {
      await client.setAsync(PokemonListPage, JSON.stringify(pokemonList));
      res.status(200).json(pokemonList);
    }
  } catch (e) {
    console.log(e);
  }
});

router.get("/pokemon/:id", async (req, res) => {
  try {
    let PokemonPageExists = "PokemonPage" + req.params.id;
    let pokemon = await APIdata.getPokemon(req.params.id);
    if (pokemon === "Not Found") {
      res.status(404).json({
        error: "Invalid ID",
      });
    } else {
      await client.setAsync(PokemonPageExists, JSON.stringify(pokemon));
      res.status(200).json(pokemon);
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
