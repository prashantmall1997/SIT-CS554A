import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { UNSPLASH_IMAGES } from "../GraphQL/Queries";
import { UPLOAD_IMAGE } from "../GraphQL/Mutations";
import { useMutation } from "@apollo/client";

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
  const { errors, loading, data } = useQuery(UNSPLASH_IMAGES);
  const [photos, setPhotos] = useState([]);
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [posterName, setPosterName] = useState("");
  const [uploadImage, { error }] = useMutation(UPLOAD_IMAGE);

  const classes = useStyles();
  let list = null;

  const addPhoto = () => {
    uploadImage({
      variables: {
        url: url,
        description: description,
        posterName: posterName,
      },
    });
    if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loading === false && !errors) {
      setPhotos(data.unsplashImages);
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
                  setUrl(photo.url);
                  setDescription(photo.description);
                  setPosterName(photo.posterName);

                  addPhoto();
                }}
              >
                Add to Bin
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
