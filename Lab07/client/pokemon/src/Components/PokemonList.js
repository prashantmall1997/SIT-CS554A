import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "../App.css";
import noImage from "./../img/noImage.jpeg";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";

import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import actions from "../actions";
const useStyles = makeStyles({
  card: {
    maxWidth: 250,
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
    marginBottom: "10%",
  },
});

const PokemonList = (props) => {
  const dispatch = useDispatch();
  const selectedTrainer = useSelector((state) => state.trainerSelected);

  const classes = useStyles();
  const [pokemonList, setPokemonList] = useState(undefined);
  const [page, setPage] = useState(props.match.params.page);
  const [loading, setLoading] = useState(true);
  const [invalidPage, setInvalidPage] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  useState(null);

  let list = null;

  useEffect(() => {
    setLoading(true);
    console.log("useEffect for Axios Call");
    async function fetchData() {
      try {
        setPage(parseInt(props.match.params.pagenum));
        if (isNaN(props.match.params.pagenum)) {
          setInvalidPage(true);
        } else {
          setInvalidPage(false);
        }
        const url = `http://localhost:4000/pokemon/page/${page}`;
        const { data: pokemon } = await axios.get(url);
        if (pokemon.pokeData.length === 0) {
          setInvalidPage(true);
        }

        if (
          props.match.params.page >
            pokemon.totalCount / pokemon.pokeData.length ||
          props.match.params.page < 1
        ) {
          setInvalidPage(true);
        }

        setPokemonList(pokemon.pokeData);
        setLoading(false);

        setPageCount(Math.ceil(pokemon.totalCount / 20));
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [page, props.match.params.page, props.match.params.pagenum]);

  const PaginatedItems = () => {
    let history = useHistory();
    const redirect = (url) => {
      history.push(url);
    };

    const handlePageClick = (event) => {
      console.log(`User requested page number ${event.selected + 1}`);
      redirect(`/pokemon/page/${parseInt(event.selected) + 1}`);
    };
    console.log("Current Page in Pagination is: " + page);

    let prevHidden = "prev";
    let nextHidden = "next";
    if (parseInt(page) === 1) {
      prevHidden = "";
    }
    if (parseInt(page) === parseInt(pageCount)) {
      nextHidden = "";
    }
    return (
      <div className="pagination">
        <ReactPaginate
          currentPage={parseInt(page) - 1}
          previousLabel={prevHidden}
          nextLabel={nextHidden}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={parseInt(pageCount)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
          forcePage={parseInt(page) - 1}
        />
      </div>
    );
  };

  const buildList = (pokemon) => {
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
        return <span>Go to Trainers Tab and select a trainer</span>;
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

    return (
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={pokemon.id}>
        <Card className={classes.card} variant="outlined">
          <CardActionArea>
            <CardMedia
              className={classes.media}
              component="img"
              image={pokemon.img ? pokemon.img : noImage}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = noImage;
              }}
              alt="Pokemon"
              title="pokemon image"
            />
          </CardActionArea>
          <Link to={`/pokemon/${pokemon.id}`}>
            <CardContent>
              <Typography
                className={classes.titleHead}
                gutterBottom
                variant="h6"
                component="h2"
              >
                {pokemon.name}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
              ></Typography>
            </CardContent>
          </Link>
          <PokemonStatus />
        </Card>
      </Grid>
    );
  };

  if (pokemonList) {
    list = pokemonList.map((pokemon) => {
      return buildList(pokemon);
    });
  }

  if (loading) {
    return (
      <div>
        <h2>HAVE PATIENCE SON, POKEMONS ARE LOADING</h2>
      </div>
    );
  } else if (invalidPage) {
    return (
      <div>
        <h2>Page number not a valid number or out of range</h2>
        <Link to="/">
          Why do you want to break my application? Click to go back to homepage
        </Link>
      </div>
    );
  } else {
    return (
      <div>
        <PaginatedItems />
        <br />
        <br />
        <h2>
          Trainer:{" "}
          {selectedTrainer.length !== 0
            ? selectedTrainer[0].name
            : "Please go to trainer tab to select pokemons!"}
        </h2>
        <Grid container className={classes.grid} spacing={5}>
          {list}
        </Grid>
      </div>
    );
  }
};

export default PokemonList;
