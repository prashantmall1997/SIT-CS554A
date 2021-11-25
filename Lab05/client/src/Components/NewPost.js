import React, { useState } from "react";
import { UPLOAD_IMAGE } from "../GraphQL/Mutations";
import { useMutation } from "@apollo/client";

function NewPost() {
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [posterName, setPosterName] = useState("");
  const [uploadImage, { error }] = useMutation(UPLOAD_IMAGE);

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
  return (
    <div>
      <input
        type="text"
        placeholder="URL"
        onChange={(e) => {
          setUrl(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Description"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Poster Name"
        onChange={(e) => {
          setPosterName(e.target.value);
        }}
      />
      <button onClick={addPhoto}> Add Photo</button>
    </div>
  );
}

export default NewPost;
