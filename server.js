const express = require('express');
const cors = require('cors');

const db = require("./app/models");
const routes = require('./app/routes/app_routes');
const app= express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/tutorials', routes);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
  });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  });

db.sequelize.sync({force: true})
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


  