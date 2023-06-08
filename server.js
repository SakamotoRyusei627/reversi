const express = require("express");
const knex = require("./db/knex");
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.static("build"));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/cards", async (req, res) => {
  const getMatchCard = await knex.select("*").from("match_card");
  res.set("content-type", "application/json").status(200).send(getMatchCard);
});

app.post("/stones/:id", async (req, res) => {
  await knex("match_card")
    .select("*")
    .where("id", req.params.id)
    .update({
      situation: JSON.stringify(req.body.board),
      color: req.body.color,
    });

  res.status(200).send("ポストされました。");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
