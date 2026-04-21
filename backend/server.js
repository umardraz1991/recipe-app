const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});
app.use(express.json());
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

// API routes
app.get("/recipes", async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

app.post("/recipes", async (req, res) => {
  try {
    console.log("BODY:", req.body);

    if (!req.body.name || !req.body.ingredients) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const newRecipe = new Recipe({
      name: req.body.name,
      ingredients: req.body.ingredients,
      category: req.body.category || "General",
    });

    await newRecipe.save();

    res.json(newRecipe);
  } catch (error) {
    console.error("POST ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

app.delete("/recipes/:id", async (req, res) => {
  await Recipe.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.put("/recipes/:id", async (req, res) => {
  const updated = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Serve React build
app.use(express.static(path.join(__dirname, "..", "build")));

// ✅ SAFE fallback (NO "*")
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});