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

const Comics = (props) => {
  const [comic, setComic] = useState(undefined);
  const [comicId, setComicId] = useState(props.match.params.id);
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
        const baseUrl = `https://gateway.marvel.com:443/v1/public/comics/${comicId}`;
        const url =
          baseUrl + "?ts=" + ts + "&apikey=" + publickey + "&hash=" + hash;

        const { data: marvel } = await axios.get(url);
        setComic(marvel.data.results[0]);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [comicId]);

  if (loading) {
    return (
      <div>
        <h2>HAVE PATIENCE SON, SUPERHEROES ARE LOADING</h2>
      </div>
    );
  } else {
    console.log(comic);
    return (
      <Card className={classes.card} variant="outlined">
        <CardHeader className={classes.titleHead} title={comic.title} />
        <CardMedia
          className={classes.media}
          component="img"
          image={
            comic.thumbnail && comic.thumbnail.path
              ? comic.thumbnail.path + "." + comic.thumbnail.extension
              : noImage
          }
          title="character image"
        />

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="div">
            <dl>
              <dt className="title">Last Edited On:</dt>
              {comic && comic.modified ? (
                <dd>{comic.modified}</dd>
              ) : (
                <dd>N/A</dd>
              )}

              <dt className="title">Description:</dt>
              {comic && comic.description ? (
                <dd dangerouslySetInnerHTML={{ __html: comic.description }} />
              ) : (
                <dd>N/A</dd>
              )}

              <dt className="title">Series:</dt>
              {comic && comic.series ? (
                <dd>
                  <Link
                    to={
                      comic.series.resourceURI.split(
                        "http://gateway.marvel.com/v1/public"
                      )[1]
                    }
                  >
                    {comic.series.name}
                  </Link>
                </dd>
              ) : (
                <dd>N/A</dd>
              )}

              <dt className="title">Issue Number:</dt>
              {comic && comic.issueNumber ? (
                <dd>{comic.issueNumber}</dd>
              ) : (
                <dd>N/A</dd>
              )}

              <dt className="title">Variant Description:</dt>
              {comic && comic.variantDescription ? (
                <dd>{comic.variantDescription}</dd>
              ) : (
                <dd>N/A</dd>
              )}
            </dl>
            <Link to="/comics/page/0">Back to comics list</Link>
          </Typography>
        </CardContent>
      </Card>
    );
  }
};

export default Comics;
