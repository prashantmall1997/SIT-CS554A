import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "../App.css";
import noImage from "./../img/noImage.jpeg";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  makeStyles,
  CardHeader,
} from "@material-ui/core";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import actions from "../actions";
const useStyles = makeStyles({
  card: {
    maxWidth: 550,
    height: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 5,
    border: "1px solid #007b6d",
    boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);",
  },
  titleHead: {
    borderBottom: "1px solid #007b6d",
    fontWeight: "bold",
  },
  grid: {
    flexGrow: 1,
    flexDirection: "row",
  },
  media: {
    height: "100%",
    width: "100%",
  },
  button: {
    color: "#007b6d",
    fontWeight: "bold",
    fontSize: 12,
  },
});

const Pokemon = (props) => {
  const dispatch = useDispatch();
  const selectedTrainer = useSelector((state) => state.trainerSelected);

  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [invalidPage, setInvalidPage] = useState(true);
  const [pokemon, setPokemon] = useState(undefined);
  const [pokemonId, setPokemonId] = useState(props.match.params.pokeId);
  useState(null);

  useEffect(() => {
    setLoading(true);
    console.log("useEffect for Axios Call");
    async function fetchData() {
      try {
        console.log(pokemonId);
        if (isNaN(props.match.params.pokeId)) {
          setInvalidPage(true);
        } else {
          setInvalidPage(false);
        }
        const url = `http://localhost:4000/pokemon/${pokemonId}`;
        const { data: pokeData } = await axios.get(url);
        if (pokeData.name === "Error") {
          setInvalidPage(true);
        }
        if (props.match.params.pokeId < 1) {
          setInvalidPage(true);
        }
        setPokemon(pokeData);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [pokemonId, props.match.params.pokeId]);

  if (loading) {
    return (
      <div>
        <h2>HAVE PATIENCE SON, POKEMON IS LOADING</h2>
      </div>
    );
  } else if (invalidPage) {
    return (
      <div>
        <h2>Pokemon ID not a valid number or out of range</h2>
        <Link to="/">
          Why do you want to break my application? Click to go back to homepage
        </Link>
      </div>
    );
  } else {
    const isTrainerSelected = selectedTrainer.length === 0 ? false : true;
    const isPokemanBagFull =
      selectedTrainer[0] &&
      Object.keys(selectedTrainer[0].pokemonsCaptured).length < 6
        ? false
        : true;
    const isPokemonCaptured =
      selectedTrainer[0] && pokemon.id in selectedTrainer[0].pokemonsCaptured
        ? true
        : false;

    const PokemonStatus = () => {
      if (!isTrainerSelected) {
        return (
          <span>
            Go to Trainers Tab and select a trainer to capture a Pokemon
          </span>
        );
      } else if (
        (isTrainerSelected && isPokemanBagFull && isPokemonCaptured) ||
        (isTrainerSelected && !isPokemanBagFull && isPokemonCaptured)
      ) {
        return (
          <button
            className={classes.button}
            onClick={() => {
              dispatch(
                actions.releasePokemon(selectedTrainer[0].id, pokemon.id)
              );
              dispatch(actions.releaseSelectedTrainerPokemon(pokemon.id));
            }}
          >
            Release Pokemon
          </button>
        );
      } else if (isTrainerSelected && isPokemanBagFull && !isPokemonCaptured) {
        return <span>Don't be greedy, release to capture more!</span>;
      } else if (isTrainerSelected && !isPokemanBagFull && !isPokemonCaptured) {
        return (
          <button
            className={classes.button}
            onClick={() => {
              dispatch(
                actions.catchPokemon(
                  selectedTrainer[0].id,
                  pokemon.id,
                  pokemon.name
                )
              );
              dispatch(
                actions.catchSelectedTrainerPokemon(pokemon.id, pokemon.name)
              );
            }}
          >
            Capture Pokemon
          </button>
        );
      }
    };

    const abilities = [];
    if (pokemon && pokemon.abilities) {
      pokemon.abilities.forEach((ability) => {
        abilities.push(
          <li key={ability.ability.name}>
            {ability.ability.name.toUpperCase()}
          </li>
        );
      });
    }

    return (
      <Card className={classes.card} variant="outlined">
        <CardHeader className={classes.titleHead} title={pokemon.forms.name} />
        <CardMedia
          className={classes.media}
          component="img"
          image={
            pokemon.sprites
              ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
              : noImage
          }
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = noImage;
          }}
          alt="Pokemon"
          title="pokemon image"
        />

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="div">
            <h1>{pokemon.forms[0].name.toUpperCase()}</h1>
            <PokemonStatus />

            <dl>
              <dt className="title">Abilities:</dt>
              {pokemon && pokemon.abilities ? (
                <dd>
                  <ol>{abilities}</ol>
                </dd>
              ) : (
                <dd>N/A</dd>
              )}

              <dt className="title">Base Experience:</dt>
              {pokemon && pokemon.base_experience ? (
                <dd>{pokemon.base_experience}</dd>
              ) : (
                <dd>N/A</dd>
              )}

              <dt className="title">Height:</dt>
              {pokemon && pokemon.height ? (
                <dd>{pokemon.height}</dd>
              ) : (
                <dd>N/A</dd>
              )}
            </dl>
            <Link to="/pokemon/page/1">Back to pokemons list</Link>
          </Typography>
        </CardContent>
      </Card>
    );
  }
};

export default Pokemon;
