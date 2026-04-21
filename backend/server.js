const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// ✅ ONLY THIS (no cors, no options)
app.use(express.json());

// ✅ Mongo
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ✅ Schema
const recipeSchema = new mongoose.Schema({
  name: String,
  ingredients: String,
  category: String,
});

const Recipe = mongoose.model("Recipe", recipeSchema);

// ✅ API
app.get("/recipes", async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

app.post("/recipes", async (req, res) => {
  const newRecipe = new Recipe(req.body);
  await newRecipe.save();
  res.json(newRecipe);
});

app.delete("/recipes/:id", async (req, res) => {
  await Recipe.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.put("/recipes/:id", async (req, res) => {
  const updated = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// ✅ Serve React
app.use(express.static(path.join(__dirname, "build")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// ✅ PORT (CRITICAL FOR AZURE)
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});