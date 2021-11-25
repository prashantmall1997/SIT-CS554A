console.clear();
const { ApolloServer, gql } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const UnsplashAPI = require("./datasources/unsplash");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    unsplashAPI: new UnsplashAPI(),
  }),
});
server
  .listen({ port: 9000 })
  .then(({ url }) => console.log(`Server running at ${url}`));
