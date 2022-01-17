import React, { useState, useEffect } from "react";
import "../App.css";
import { Link, useHistory } from "react-router-dom";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import actions from "../actions";
const useStyles = makeStyles({
  card: {
    maxWidth: 250,
    height: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "10%",
    marginBottom: "10%",
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
    marginBottom: "10%",
    marginLeft: "5%",
    marginRight: "5%",
  },
});

const Trainer = (props) => {
  const dispatch = useDispatch();
  const allTrainers = useSelector((state) => state.trainer);
  const selectedTrainer = useSelector((state) => state.trainerSelected);

  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  useState(null);
  let list = null;

  useEffect(() => {
    setLoading(true);
    console.log("useEffect for Axios Call");
    async function fetchData() {
      try {
        console.log("Checking if trainer is selected");
        console.log(`Result: ${JSON.stringify(selectedTrainer[0])}`);
        setLoading(false);
      } catch (e) {
        console.log("ERROR " + e);
      }
    }
    fetchData();
  }, [allTrainers, selectedTrainer]);

  const buildList = (trainer) => {
    const BuildPokemonList = (pokemonsCaptured) => {
      const pokemonList = [];
      for (const property in pokemonsCaptured.pokemonsCaptured) {
        pokemonList.push(
          <li key={property}>
            <Link to={`/pokemon/${property}`}>
              {pokemonsCaptured.pokemonsCaptured[property].toUpperCase()}
            </Link>
          </li>
        );
      }
      if (pokemonList.length !== 0) {
        return <ol>{pokemonList}</ol>;
      } else {
        return "Bummer! You got no pokemons.";
      }
    };

    const isAnyTrainerSelected = selectedTrainer.length === 0 ? false : true;
    const isTrainerSelected =
      trainer.selected && trainer.selected === true ? true : false;

    const TrainerStatus = () => {
      if (isAnyTrainerSelected) {
        if (isTrainerSelected) {
          return (
            <div>
              <button
                className={classes.button}
                onClick={() => {
                  dispatch(actions.unselectTrainer(trainer.id));
                  dispatch(actions.removeSelectedTrainer(trainer));
                }}
              >
                Unselect Trainer
              </button>
              <Link to={`/pokemon/page/1`}>
                <button className={classes.button}>Hunt Pokemons!</button>
              </Link>
            </div>
          );
        } else if (!isTrainerSelected) {
          return <></>;
        } else {
          return <div>Error while building trainer list</div>;
        }
      } else if (!isAnyTrainerSelected) {
        return (
          <div>
            <button
              className={classes.button}
              onClick={() => {
                dispatch(actions.selectTrainer(trainer.id));
                dispatch(
                  actions.updateSelectedTrainer(
                    trainer.id,
                    trainer.name,
                    trainer.pokemonsCaptured
                  )
                );
              }}
            >
              Select Trainer
            </button>
            <button
              className={classes.button}
              onClick={() => {
                dispatch(actions.deleteTrainer(trainer.id));
                dispatch(actions.removeSelectedTrainer(trainer));
              }}
            >
              Delete Trainer
            </button>
          </div>
        );
      } else {
        return <div>Error while building trainer list</div>;
      }
    };

    return (
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={trainer.id}>
        <Card className={classes.card} variant="outlined">
          {/* <Link to={`/pokemon/${pokemon.id}`}> */}
          <CardContent>
            <Typography
              className={classes.titleHead}
              gutterBottom
              variant="h6"
              component="h2"
            >
              {trainer.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {" "}
              <BuildPokemonList pokemonsCaptured={trainer.pokemonsCaptured} />
            </Typography>
          </CardContent>
          {/* </Link> */}
          <TrainerStatus />
        </Card>
      </Grid>
    );
  };

  if (allTrainers) {
    list = allTrainers.map((trainer) => {
      return buildList(trainer);
    });
  }

  function AddTrainer({ addTask }) {
    const [value, setValue] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!value) return;

      setValue(addTask);
      dispatch(actions.addTrainer(value));
      setValue("");

      console.log(value);
    };

    return (
      <form onSubmit={handleSubmit}>
        <label for="my-input">Enter Trainer Name: </label>

        <input
          input
          id="my-input"
          type="text"
          className="input"
          value={value}
          placeholder=""
          onChange={(e) => setValue(e.target.value)}
        />
        <input type="submit" value="Add Trainer" />
      </form>
    );
  }

  if (loading) {
    return (
      <div>
        <h2>HAVE PATIENCE SON, TRAINERS ARE LOADING</h2>
      </div>
    );
  } else {
    return (
      <div>
        <AddTrainer />
        <br />
        <br />
        <Grid container className={classes.grid} spacing={5}>
          {list}
        </Grid>
      </div>
    );
  }
};

export default Trainer;
