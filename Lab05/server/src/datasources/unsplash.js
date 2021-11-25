require("dotenv").config();
const { RESTDataSource } = require("apollo-datasource-rest");

class UnsplashAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.unsplash.com/photos?";
  }

  async getPhotos(pageNum) {
    const response = await this.get(
      this.baseURL +
        `page=${pageNum.pageNum}&client_id=${process.env.CLIENT_ID}`
    );

    return Array.isArray(response)
      ? response.map((photo) => this.photosReducer(photo))
      : [];
  }

  photosReducer(photo) {
    return {
      id: photo.id,
      url: photo.urls.raw,
      posterName: photo.user.username,
      description: photo.description,
      userPosted: false,
      binned: false,
    };
  }
}

module.exports = UnsplashAPI;
