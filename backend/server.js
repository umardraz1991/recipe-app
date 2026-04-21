const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// ✅ VERY IMPORTANT (MUST BE FIRST)
app.use(express.json());

// ✅ CORS (simple + safe)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// Connect MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Schema
const recipeSchema = new mongoose.Schema({
  name: String,
  ingredients: String,
  category: String,
});

const Recipe = mongoose.model("Recipe", recipeSchema);

// Routes
app.get("/recipes", async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

app.post("/recipes", async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const newRecipe = new Recipe(req.body);
    await newRecipe.save();

    res.json(newRecipe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Serve React
app.use(express.static(path.join(__dirname, "..", "build")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

// Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});