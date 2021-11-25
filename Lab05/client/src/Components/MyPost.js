import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { USER_POSTED_IMAGES } from "../GraphQL/Queries";
import { Link } from "react-router-dom";
import { DELETE_IMAGE } from "../GraphQL/Mutations";
import { useMutation } from "@apollo/client";

// import { Button, Card } from "react-bootstrap";
// import "./../unsplash.css";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";

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

function UnsplashedImages() {
  const { errors, loading, data } = useQuery(USER_POSTED_IMAGES);
  console.log(data);
  const [photos, setPhotos] = useState([]);
  const [id, setId] = useState("");
  const [deleteImage, { error }] = useMutation(DELETE_IMAGE);

  const classes = useStyles();
  let list = null;

  const deletePhoto = () => {
    deleteImage({
      variables: {
        id: id,
      },
    });
    if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loading === false && !errors) {
      setPhotos(data.userPostedImages);
    }
  }, [data, errors, loading]);

  const buildList = (photo) => {
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={photo.id}>
        <Card className={classes.card} variant="outlined">
          <CardActionArea>
            <CardMedia
              className={classes.media}
              component="img"
              image={photo.url}
              title="series image"
            />
          </CardActionArea>
          {/* <Link to={`/series/${photo.id}`}>*/}
          <CardContent>
            <Typography
              className={classes.titleHead}
              gutterBottom
              variant="h6"
              component="h2"
            >
              {photo.description}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <button
                onClick={() => {
                  setId(photo.id);

                  deletePhoto();
                }}
              >
                Delete
              </button>
            </Typography>
          </CardContent>
          {/* </Link> */}
        </Card>
      </Grid>
    );
  };

  list =
    photos &&
    photos.map((photo) => {
      return buildList(photo);
    });

  return (
    <div>
      <Grid container className={classes.grid} spacing={5}>
        {list}
      </Grid>
    </div>
  );
}

export default UnsplashedImages;
