import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [error, setError] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);

  // ✅ FETCH RECIPES (NO API_URL)
  const fetchRecipes = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get("/recipes");
      setRecipes(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch recipes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  // ✅ ADD RECIPE
  const addRecipe = async () => {
    if (!name || !ingredients) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post("/recipes", {
        name,
        ingredients,
        category,
      });

      setName("");
      setIngredients("");
      setCategory("");
      fetchRecipes();
    } catch (err) {
      console.error(err);
      alert("Error adding recipe");
    }
  };

  // ✅ DELETE
  const deleteRecipe = async (id) => {
    try {
      await axios.delete(`/recipes/${id}`);
      fetchRecipes();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>🍽 Recipe Manager</h1>

      <input
        placeholder="Recipe name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Ingredients"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />

      <br /><br />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        <option value="Italian">Italian</option>
        <option value="Healthy">Healthy</option>
        <option value="Fast Food">Fast Food</option>
        <option value="Dessert">Dessert</option>
      </select>

      <br /><br />

      <button onClick={addRecipe}>Add Recipe</button>

      <hr />

      <h2>Recipes ({recipes.length})</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading...</p>}

      {recipes.map((recipe) => (
        <div key={recipe._id}>
          <h3>{recipe.name}</h3>
          <p>{recipe.ingredients}</p>
          <p>{recipe.category}</p>

          <button onClick={() => deleteRecipe(recipe._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;