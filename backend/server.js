import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [error, setError] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [recipes, setRecipes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [isReversed, setIsReversed] = useState(false);

  // ✅ FETCH
  const fetchRecipes = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get("/recipes");
      setRecipes(res.data);
    } catch (err) {
      setError("Failed to fetch recipes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  // ✅ ADD
  const addRecipe = async () => {
    if (!name || !ingredients) {
      alert("Please fill all fields");
      return;
    }

    await axios.post("/recipes", {
      name,
      ingredients,
      category,
    });

    setName("");
    setIngredients("");
    setCategory("");
    fetchRecipes();
  };

  // ✅ DELETE
  const deleteRecipe = async (id) => {
    await axios.delete(`/recipes/${id}`);
    fetchRecipes();
  };

  // ✅ UPDATE
  const updateRecipe = async (id) => {
    await axios.put(`/recipes/${id}`, {
      name,
      ingredients,
      category,
    });

    setEditingId(null);
    setName("");
    setIngredients("");
    setCategory("");
    fetchRecipes();
  };

  return (
    <div style={{ padding: "40px", background: "#f4f6f8", minHeight: "100vh" }}>
      <div style={{ maxWidth: "500px", margin: "auto", background: "white", padding: "20px", borderRadius: "10px" }}>

        <h1>🍽 Recipe Manager</h1>

        {/* SEARCH */}
        <input
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={() => setSearch("")}>Clear Search</button>

        {/* FORM */}
        <input
          placeholder="Recipe name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="Italian">Italian</option>
          <option value="Healthy">Healthy</option>
          <option value="Fast Food">Fast Food</option>
          <option value="Dessert">Dessert</option>
        </select>

        <button onClick={editingId ? () => updateRecipe(editingId) : addRecipe}>
          {editingId ? "Update Recipe" : "Add Recipe"}
        </button>

        <hr />

        {/* SORT */}
        <button onClick={() => setIsReversed(!isReversed)}>
          {isReversed ? "Show Newest First" : "Show Oldest First"}
        </button>

        <h2>Recipes ({recipes.length})</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {loading && <p>Loading...</p>}

        {recipes
          .filter(r =>
            r.name.toLowerCase().includes(search.toLowerCase()) ||
            r.ingredients.toLowerCase().includes(search.toLowerCase())
          )
          .slice()
          [isReversed ? "reverse" : "sort"]((a, b) => 0)
          .map((recipe) => (
            <div key={recipe._id}>
              <h3>{recipe.name}</h3>
              <p>{recipe.ingredients}</p>
              <p>{recipe.category}</p>

              <button onClick={() => {
                setEditingId(recipe._id);
                setName(recipe.name);
                setIngredients(recipe.ingredients);
                setCategory(recipe.category);
              }}>
                Edit
              </button>

              <button onClick={() => deleteRecipe(recipe._id)}>
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;