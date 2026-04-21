const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// ✅ VERY IMPORTANT (MUST BE FIRST)
//app.use(express.json());

// ✅ CORS (simple + safe)
const cors = require("cors");

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));
app.options("*", cors());
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

// Routes
app.get("/recipes", async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

app.post("/recipes", async (req, res) => {
  try {
    console.log("BODY:", req.body);

    if (!req.body || !req.body.name || !req.body.ingredients) {
      return res.status(400).json({ error: "Invalid data" });
    }

    const newRecipe = new Recipe({
      name: req.body.name,
      ingredients: req.body.ingredients,
      category: req.body.category || "General",
    });

    await newRecipe.save();

    res.status(201).json(newRecipe);
  } catch (err) {
    console.error("POST ERROR:", err);
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