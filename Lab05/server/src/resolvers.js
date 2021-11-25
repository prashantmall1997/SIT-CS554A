const bluebird = require("bluebird");
const redis = require("redis");
const client = redis.createClient();
const { v4 } = require("uuid");

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

module.exports = {
  Query: {
    unsplashImages: async (_, { pageNum }, { dataSources }) => {
      return dataSources.unsplashAPI.getPhotos({ pageNum: pageNum });
    },
    binnedImages: async () => {
      const redisData = await client.lrangeAsync("uploadImage", 0, -1);
      let tempData = [];
      if (redisData && redisData.length != 0) {
        for (let i = 0; i < redisData.length; i++) {
          if (JSON.parse(redisData[i]).binned === true) {
            tempData.push(JSON.parse(redisData[i]));
          }
        }
        return tempData;
      } else {
        return [];
      }
    },
    userPostedImages: async () => {
      const redisData = await client.lrangeAsync("uploadImage", 0, -1);
      let tempData = [];
      if (redisData && redisData.length != 0) {
        for (let i = 0; i < redisData.length; i++) {
          if (JSON.parse(redisData[i]).userPosted === true) {
            tempData.push(JSON.parse(redisData[i]));
          }
        }
        return tempData;
      } else {
        return [];
      }
    },
  },

  Mutation: {
    uploadImage: async (_, args) => {
      let photoData = {
        id: v4(),
        url: args.url,
        posterName: args.posterName,
        description: args.description,
        userPosted: true,
        binned: false,
      };
      await client.lpushAsync("uploadImage", JSON.stringify(photoData));
      return photoData;
    },
    updateImage: async (_, args) => {
      const redisData = await client.lrangeAsync("uploadImage", 0, -1);
      if (redisData && redisData.length != 0) {
        for (let i = 0; i < redisData.length; i++) {
          if (JSON.parse(redisData[i]).id === args.id) {
            let tempData = JSON.parse(redisData[i]);
            if (args.url) {
              tempData.url = args.url;
            }
            if (args.posterName) {
              tempData.posterName = args.posterName;
            }
            if (args.description) {
              tempData.description = args.description;
            }
            if (args.userPosted === false && args.binned === false) {
              let tempData = JSON.parse(redisData[i]);
              await client.lremAsync("uploadImage", -1, redisData[i]);
              return tempData;
            }
            await client.lsetAsync("uploadImage", i, JSON.stringify(tempData));
            return tempData;
          } else {
            if (args.binned === true) {
              let photoData = {
                id: args.id,
                url: args.url,
                posterName: args.posterName,
                description: args.description,
                userPosted: true,
                binned: true,
              };
              await client.lpushAsync("uploadImage", JSON.stringify(photoData));
              return photoData;
            } else {
              return [];
            }
          }
        }
      } else {
        return [];
      }
    },
    deleteImage: async (_, args) => {
      const redisData = await client.lrangeAsync("uploadImage", 0, -1);
      console.log(redisData);
      if (redisData && redisData.length != 0) {
        for (let i = 0; i < redisData.length; i++) {
          if (JSON.parse(redisData[i]).id === args.id) {
            let tempData = JSON.parse(redisData[i]);
            await client.lremAsync("uploadImage", -1, redisData[i]);
            return tempData;
          }
        }
      } else {
      }
    },
  },
};
