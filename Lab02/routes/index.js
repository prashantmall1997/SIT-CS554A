const portfolioRoutes = require('./portfolio');

const constructorMethod = (app) => {
  app.use('/', portfolioRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
