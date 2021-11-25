import { gql } from "@apollo/client";

const UNSPLASH_IMAGES = gql`
  query Query {
    unsplashImages(pageNum: 3) {
      id
      url
      posterName
      description
      userPosted
      binned
    }
  }
`;

const BINNED_IMAGES = gql`
  query Query {
    binnedImages {
      id
      url
      posterName
      description
      userPosted
      binned
    }
  }
`;

const USER_POSTED_IMAGES = gql`
  query Query {
    userPostedImages {
      id
      url
      posterName
      description
      userPosted
      binned
    }
  }
`;

export { UNSPLASH_IMAGES, BINNED_IMAGES, USER_POSTED_IMAGES };
