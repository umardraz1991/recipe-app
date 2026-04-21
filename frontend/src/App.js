import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const fetchRecipes = async () => {
    const res = await axios.get("/recipes");
    setRecipes(res.data);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const addRecipe = async () => {
  if (!name || !ingredients) return alert("Fill all fields");

  await axios.post("/recipes", { name, ingredients, category });

  setMessage("✅ Recipe added!");
  setTimeout(() => setMessage(""), 2000);

  setName("");
  setIngredients("");
  setCategory("");
  fetchRecipes();
};

  const deleteRecipe = async (id) => {
    await axios.delete(`/recipes/${id}`);
    fetchRecipes();
  };

  const updateRecipe = async (id) => {
    await axios.put(`/recipes/${id}`, { name, ingredients, category });

    setEditingId(null);
    setName("");
    setIngredients("");
    setCategory("");
    fetchRecipes();
  };

  return (
    <div style={{ background: "#f4f6f8", minHeight: "100vh", padding: "40px" }}>
      <div style={{
        maxWidth: "600px",
        margin: "auto",
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
      }}>

        <h1 style={{ textAlign: "center" }}>🍽 Recipe Manager</h1>
		{editingId && (
  <p style={{ color: "blue", marginBottom: "10px" }}>
    ✏️ Editing: {name}
  </p>
)}
		{message && (
  <p style={{ color: "green", textAlign: "center" }}>
    {message}
  </p>
)}

        {/* SEARCH */}
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        {/* FILTER */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        >
          <option value="All">All Categories</option>
          <option value="Italian">Italian</option>
          <option value="Healthy">Healthy</option>
          <option value="Fast Food">Fast Food</option>
          <option value="Dessert">Dessert</option>
        </select>

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
{editingId && (
  <button
    onClick={() => {
      setEditingId(null);
      setName("");
      setIngredients("");
      setCategory("");
    }}
    style={{
      marginTop: "10px",
      backgroundColor: "#6c757d",
      color: "white"
    }}
  >
    Cancel Edit
  </button>
)}
        <hr />

        {/* SORT */}
        <button onClick={() => setIsReversed(!isReversed)}>
          {isReversed ? "Newest First" : "Oldest First"}
        </button>

        <h2>Recipes ({recipes.length})</h2>

        {recipes
          .filter(r =>
            r.name.toLowerCase().includes(search.toLowerCase()) ||
            r.ingredients.toLowerCase().includes(search.toLowerCase())
          )
          .filter(r =>
            categoryFilter === "All" || r.category === categoryFilter
          )
          .slice()
          [isReversed ? "reverse" : "sort"]((a, b) => 0)
          .map(recipe => (
            <div
  key={recipe._id}
  style={{
    marginBottom: "15px",
    padding: "15px",
    borderRadius: "12px",
    backgroundColor: "white",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "0.3s",
    cursor: "pointer"
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "scale(1.02)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)";
  }}
>
              <h3>{recipe.name}</h3>
              <p>{recipe.ingredients}</p>
              <p style={{
  display: "inline-block",
  padding: "5px 10px",
  borderRadius: "15px",
  backgroundColor:
    recipe.category === "Healthy" ? "green" :
    recipe.category === "Fast Food" ? "red" :
    recipe.category === "Dessert" ? "purple" :
    recipe.category === "Italian" ? "orange" :
    "#007bff",
  color: "white",
  fontSize: "12px",
  marginBottom: "10px"
}}>
  {recipe.category || "General"}
</p>

              <button onClick={() => {
                setEditingId(recipe._id);
                setName(recipe.name);
                setIngredients(recipe.ingredients);
                setCategory(recipe.category);
              }}>
                Edit
              </button>

              <button
                onClick={() => deleteRecipe(recipe._id)}
                style={{ marginLeft: "10px", background: "red", color: "white" }}
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;