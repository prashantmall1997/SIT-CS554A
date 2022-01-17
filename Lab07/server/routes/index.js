const API = require("./API_Routes");

const constructorMethod = (app) => {
  app.use("/", API);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
