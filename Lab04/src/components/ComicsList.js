import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../App.css";
import Search from "./Search";
import noImage from "../img/download.jpeg";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
console.clear();

const useStyles = makeStyles({
  card: {
    maxWidth: 250,
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

const ComicsList = (props) => {
  const classes = useStyles();
  const [comicsList, setComicsList] = useState(undefined);
  const [page, setPage] = useState(props.match.params.page);
  const [nextPage, setNextPage] = useState(true);
  const [loading, setLoading] = useState(true);
  const [invalidPage, setInvalidPage] = useState(true);
  const [searchData, setSearchData] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  let list = null;

  useEffect(() => {
    setLoading(true);
    console.log("useEffect for Axios Call");
    async function fetchData() {
      try {
        setPage(props.match.params.page);
        if (isNaN(props.match.params.page)) {
          setInvalidPage(true);
        } else {
          setInvalidPage(false);
        }
        const offSet = page * 100;

        const md5 = require("blueimp-md5");
        const publickey = "f3ba3d5fe8325138f1b25136f4cb8897";
        const privatekey = "ad2d1b4929e4aa343ea9e9ef32ec685767f85f91";
        const ts = new Date().getTime();
        const stringToHash = ts + privatekey + publickey;
        const hash = md5(stringToHash);
        const baseUrl = `https://gateway.marvel.com:443/v1/public/comics?limit=100&offset=${offSet}`;
        const url =
          baseUrl + "&ts=" + ts + "&apikey=" + publickey + "&hash=" + hash;

        const { data: marvel } = await axios.get(url);
        if (props.match.params.page > marvel.data.total / 100) {
          setInvalidPage(true);
        }
        setComicsList(marvel.data.results);
        setLoading(false);

        if (marvel.data.total - offSet <= 100) {
          setNextPage(false);
        } else {
          setNextPage(true);
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [page, props.match.params.page, nextPage]);

  useEffect(() => {
    console.log("search useEffect fired");
    async function fetchData() {
      try {
        console.log(`in fetch searchTerm: ${searchTerm}`);
        const md5 = require("blueimp-md5");
        const publickey = "f3ba3d5fe8325138f1b25136f4cb8897";
        const privatekey = "ad2d1b4929e4aa343ea9e9ef32ec685767f85f91";
        const ts = new Date().getTime();
        const stringToHash = ts + privatekey + publickey;
        const hash = md5(stringToHash);
        const baseUrl = `https://gateway.marvel.com:443/v1/public/comics?limit=100&titleStartsWith=${searchTerm}`;
        const url =
          baseUrl + "&ts=" + ts + "&apikey=" + publickey + "&hash=" + hash;
        console.log("URL is --> " + url);
        const { data: marvel } = await axios.get(url);
        console.log(marvel.data.results);
        setSearchData(marvel.data.results);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    if (searchTerm) {
      console.log("searchTerm is set");
      fetchData();
    }
  }, [searchTerm]);
  const searchValue = async (value) => {
    setSearchTerm(value);
  };

  const buildList = (comic) => {
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={comic.id}>
        <Card className={classes.card} variant="outlined">
          <CardActionArea>
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
          </CardActionArea>
          <Link to={`/comics/${comic.id}`}>
            <CardContent>
              <Typography
                className={classes.titleHead}
                gutterBottom
                variant="h6"
                component="h2"
              >
                {comic.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <span>Click on card for more info!</span>
              </Typography>
            </CardContent>
          </Link>
        </Card>
      </Grid>
    );
  };

  if (searchTerm) {
    list =
      searchData &&
      searchData.map((comic) => {
        return buildList(comic);
      });
  } else if (comicsList) {
    list = comicsList.map((character) => {
      return buildList(character);
    });
  }

  function Navigation() {
    if (page <= 0) {
      return (
        <div>
          <Link
            to={`/series/page/${parseInt(page) + 1}`}
            onClick={() => {
              console.log(page);
              console.log("----");
              setPage(parseInt(page) + 1);
            }}
          >
            NEXT
          </Link>
        </div>
      );
    } else if (!nextPage) {
      return (
        <div>
          <Link
            to={`/series/page/${parseInt(page) - 1}`}
            onClick={() => {
              console.log(page);
              console.log("----");
              setPage(parseInt(page) - 1);
            }}
          >
            PREV
          </Link>
        </div>
      );
    } else if (page > 0) {
      return (
        <div>
          <Link
            to={`/series/page/${parseInt(page) - 1}`}
            onClick={() => {
              console.log(page);
              console.log("----");
              setPage(parseInt(page) - 1);
            }}
          >
            PREV
          </Link>
          <br />
          <br />
          <br />
          <Link
            to={`/series/page/${parseInt(page) + 1}`}
            onClick={() => {
              console.log(page);
              console.log("----");
              setPage(parseInt(page) + 1);
            }}
          >
            NEXT
          </Link>
        </div>
      );
    }
  }

  if (loading) {
    return (
      <div>
        <h2>HAVE PATIENCE SON, SUPERHEROES ARE LOADING</h2>
      </div>
    );
  } else if (invalidPage) {
    return (
      <div>
        <h2>Page number not a valid number or out of range</h2>
        <Link to="/comics/page/0">Click here to go back to first page</Link>
      </div>
    );
  } else if (searchTerm !== "") {
    return (
      <div>
        <Search searchValue={searchValue} />
        <br />
        <br />
        <Grid container className={classes.grid} spacing={5}>
          {list}
        </Grid>
      </div>
    );
  } else {
    return (
      <div>
        <Search searchValue={searchValue} />
        <br />
        <br />
        <Navigation />
        <br />
        <br />
        <Grid container className={classes.grid} spacing={5}>
          {list}
        </Grid>
      </div>
    );
  }
};

export default ComicsList;
