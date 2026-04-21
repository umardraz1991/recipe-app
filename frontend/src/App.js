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
  const [loading, setLoading] = useState(false);

  const fetchRecipes = async () => {
  try {
    setLoading(true);
    const res = await axios.get("/recipes");
    setRecipes(res.data);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
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
  <div
    style={{
      background: "linear-gradient(135deg, #667eea, #764ba2)",
      minHeight: "100vh",
      padding: "40px"
    }}
  >
     <div style={{
  maxWidth: "600px",
  margin: "auto",
  background: "#ffffff",
  padding: "25px",
  borderRadius: "20px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
}}>

        <h1 style={{
  textAlign: "center",
  color: "#ff5722",
  marginBottom: "20px"
}}>
  🍽 Recipe Manager
</h1>
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
          style={{
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none"
  }}
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
		  style={{
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none"
  }}
        />

        <input
          placeholder="Ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
		  style={{
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none"
  }}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="Italian">Italian</option>
          <option value="Healthy">Healthy</option>
          <option value="Fast Food">Fast Food</option>
          <option value="Dessert">Dessert</option>
        </select>

        <button
  onClick={editingId ? () => updateRecipe(editingId) : addRecipe}
  style={{
    width: "100%",
    padding: "12px",
    background: "linear-gradient(to right, #28a745, #218838)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px"
  }}
>
  {editingId ? "Update Recipe" : "Add Recipe"}
</button>

        <hr />

        {/* SORT */}
        <button onClick={() => setIsReversed(!isReversed)}>
          {isReversed ? "Newest First" : "Oldest First"}
        </button>

        <h2>Recipes ({recipes.length})</h2>
		{loading && (
  <div style={{ textAlign: "center", marginTop: "20px" }}>
    <div style={{
      width: "40px",
      height: "40px",
      border: "5px solid #ccc",
      borderTop: "5px solid #007bff",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
      margin: "auto"
    }} />
  </div>
)}

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

      <button
  onClick={() => {
    setEditingId(recipe._id);
    setName(recipe.name);
    setIngredients(recipe.ingredients);
    setCategory(recipe.category || "");
  }}
  style={{
    background: "linear-gradient(to right, #007bff, #0056b3)",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    marginRight: "10px"
  }}
>
  Edit
</button>

      <button
  onClick={() => deleteRecipe(recipe._id)}
  style={{
    background: "linear-gradient(to right, #ff4b2b, #ff416c)",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "8px",
    cursor: "pointer"
  }}
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