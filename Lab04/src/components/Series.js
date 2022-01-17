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

const Series = (props) => {
  const [series, setSeries] = useState(undefined);
  const [seriesId, setSeriesId] = useState(props.match.params.id);
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
        const baseUrl = `https://gateway.marvel.com:443/v1/public/series/${seriesId}`;
        const url =
          baseUrl + "?ts=" + ts + "&apikey=" + publickey + "&hash=" + hash;

        const { data: marvel } = await axios.get(url);
        console.log(marvel.data.results[0]);
        setSeries(marvel.data.results[0]);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [seriesId]);

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
    console.log(series);
    return (
      <Card className={classes.card} variant="outlined">
        <CardHeader className={classes.titleHead} title={series.title} />
        <CardMedia
          className={classes.media}
          component="img"
          image={
            series.thumbnail && series.thumbnail.path
              ? series.thumbnail.path + "." + series.thumbnail.extension
              : noImage
          }
          title="character image"
        />

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="div">
            <dl>
              <dt className="title">Last Edited On:</dt>
              {series && series.modified ? (
                <dd>{series.modified}</dd>
              ) : (
                <dd>N/A</dd>
              )}

              <dt className="title">Description:</dt>
              {series && series.description ? (
                <dd dangerouslySetInnerHTML={{ __html: series.description }} />
              ) : (
                <dd>N/A</dd>
              )}

              <dt className="title">Number of Comics:</dt>
              {series && series.comics && series.comics.available ? (
                <dd
                  dangerouslySetInnerHTML={{
                    __html: series.comics.available,
                  }}
                />
              ) : (
                <dd>N/A</dd>
              )}

              <dt className="title">Start Year:</dt>
              {series && series.startYear ? (
                <dd>{series.startYear}</dd>
              ) : (
                <dd>N/A</dd>
              )}

              <dt className="title">End Year:</dt>
              {series && series.endYear ? (
                <dd>{series.endYear}</dd>
              ) : (
                <dd>N/A</dd>
              )}

              <dt className="title">Rating:</dt>
              {series && series.rating ? (
                <dd>{series.rating}</dd>
              ) : (
                <dd>N/A</dd>
              )}
            </dl>
            <p>Comic Links (20 MAX):</p>
            <ol>{buildList(series.comics.items)}</ol>
            <Link to="/series/page/0">Back to series list</Link>
          </Typography>
        </CardContent>
      </Card>
    );
  }
};

export default Series;
