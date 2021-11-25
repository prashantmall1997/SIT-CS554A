import { gql } from "@apollo/client";

const UPLOAD_IMAGE = gql`
  mutation uploadImage(
    $url: String!
    $description: String
    $posterName: String
  ) {
    uploadImage(url: $url, description: $description, posterName: $posterName) {
      id
    }
  }
`;

const UPDATE_IMAGE = gql`
  mutation updateImage(
    $id: ID!
    $url: String
    $description: String
    $posterName: String
    $userPosted: Boolean
    $binned: Boolean
  ) {
    uploadImage(
      id: $id
      url: $url
      description: $description
      posterName: $posterName
      userPosted: $userPosted
      binned: $binned
    ) {
      id
    }
  }
`;

const DELETE_IMAGE = gql`
  mutation deleteImage($id: ID!) {
    uploadImage(id: $id) {
      id
    }
  }
`;

export { UPLOAD_IMAGE, UPDATE_IMAGE, DELETE_IMAGE };
