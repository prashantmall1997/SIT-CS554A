const blogApiRoutes = require("./blogApiRoutes");

const constructorMethod = (app) => {
  app.use("/", blogApiRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
