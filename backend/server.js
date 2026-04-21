const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// ✅ ✅ PUT MIDDLEWARE HERE (EXACT PLACE)
app.use(cors());
app.use(express.json());

// ✅ SAFE for Express 5
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// ⬇️ THEN MongoDB connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ⬇️ THEN schema
const recipeSchema = new mongoose.Schema({
  name: String,
  ingredients: String,
  category: String,
});

const Recipe = mongoose.model("Recipe", recipeSchema);

// ⬇️ THEN routes
app.get("/recipes", async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

app.post("/recipes", async (req, res) => {
  const newRecipe = new Recipe(req.body);
  await newRecipe.save();
  res.json(newRecipe);
});

// ⬇️ THEN static build
app.use(express.static(path.join(__dirname, "..", "build")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

// ⬇️ LAST: server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});