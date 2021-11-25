import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import noImage from "../img/download.jpeg";
import {
  makeStyles,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardHeader,
} from "@material-ui/core";
import "../App.css";
const useStyles = makeStyles({
  card: {
    maxWidth: 550,
    height: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 5,
    border: "1px solid #1e8678",
    boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);",
  },
  titleHead: {
    borderBottom: "1px solid #1e8678",
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
    color: "#1e8678",
    fontWeight: "bold",
    fontSize: 12,
  },
});

console.clear();

const Characters = (props) => {
  const [character, setCharacter] = useState(undefined);
  const [characterId, setCharacterId] = useState(props.match.params.id);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    setLoading(true);
    console.log("useEffect for Axios Call");
    async function fetchData() {
      try {
        const md5 = require("blueimp-md5");
        const publickey = "f3ba3d5fe8325138f1b25136f4cb8897";
        const privatekey = "ad2d1b4929e4aa343ea9e9ef32ec685767f85f91";
        const ts = new Date().getTime();
        const stringToHash = ts + privatekey + publickey;
        const hash = md5(stringToHash);
        const baseUrl = `https://gateway.marvel.com:443/v1/public/characters/${characterId}`;
        const url =
          baseUrl + "?ts=" + ts + "&apikey=" + publickey + "&hash=" + hash;

        const { data: marvel } = await axios.get(url);
        console.log(marvel.data.results[0].series.items);
        setCharacter(marvel.data.results[0]);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [characterId]);

  let list = null;
  const buildList = (array) => {
    list = array.map((element) => {
      let uri = element.resourceURI.split(
        "http://gateway.marvel.com/v1/public"
      )[1];
      return (
        <li key={uri}>
          <a href={uri}>{element.name}</a>
        </li>
      );
    });

    return list;
  };

  if (loading) {
    return (
      <div>
        <h2>HAVE PATIENCE SON, SUPERHEROES ARE LOADING</h2>
      </div>
    );
  } else {
    console.log(character);
    return (
      <Card className={classes.card} variant="outlined">
        <CardHeader className={classes.titleHead} title={character.name} />
        <CardMedia
          className={classes.media}
          component="img"
          image={
            character.thumbnail && character.thumbnail.path
              ? character.thumbnail.path + "." + character.thumbnail.extension
              : noImage
          }
          title="character image"
        />

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="div">
            <dl>
              <dt className="title">Last Edited On:</dt>
              {character && character.modified ? (
                <dd>{character.modified}</dd>
              ) : (
                <dd>N/A</dd>
              )}

              <dt className="title">Description:</dt>
              {character && character.description ? (
                <dd
                  dangerouslySetInnerHTML={{ __html: character.description }}
                />
              ) : (
                <dd>N/A</dd>
              )}

              <dt className="title">Number of Comics:</dt>
              {character && character.comics && character.comics.available ? (
                <dd>{character.comics.available}</dd>
              ) : (
                <dd>N/A</dd>
              )}

              <dt className="title">Number of Series:</dt>
              {character && character.series && character.series.available ? (
                <dd>{character.series.available}</dd>
              ) : (
                <dd>N/A</dd>
              )}

              <dt className="title">Number of Stories:</dt>
              {character && character.stories && character.stories.available ? (
                <dd>{character.stories.available}</dd>
              ) : (
                <dd>N/A</dd>
              )}

              <dt className="title">Number of Events:</dt>
              {character && character.events && character.events.available ? (
                <dd>{character.events.available}</dd>
              ) : (
                <dd>N/A</dd>
              )}
            </dl>
            <p>Comic Links (20 MAX):</p>
            <ol>{buildList(character.comics.items)}</ol>

            <p>Series Links (20 MAX):</p>
            <ol>{buildList(character.series.items)}</ol>
            <Link to="/characters/page/0">Back to character list</Link>
          </Typography>
        </CardContent>
      </Card>
    );
  }
};

export default Characters;
