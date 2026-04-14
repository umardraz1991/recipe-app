const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/recipes")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Schema
const recipeSchema = new mongoose.Schema({
  name: String,
  ingredients: String,
});

const Recipe = mongoose.model("Recipe", recipeSchema);

// Routes
app.get("/", (req, res) => {
  res.send("Recipe API is running");
});

app.get("/recipes", async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

app.post("/recipes", async (req, res) => {
  const newRecipe = new Recipe(req.body);
  await newRecipe.save();
  res.json(newRecipe);
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});