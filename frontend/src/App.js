<<<<<<< HEAD
=======
const API_URL = "https://recipe-app-azgjcdgbddfccucj.germanywestcentral-01.azurewebsites.net";
>>>>>>> 692ea7e (fix: serve frontend from backend)
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
  const [darkMode, setDarkMode] = useState(false);

  const fetchRecipes = async () => {
  try {
    setLoading(true);
<<<<<<< HEAD
    const res = await axios.get("/recipes");
=======
    setError("");
    const res = await axios.get(`${API_URL}/recipes`);
>>>>>>> 692ea7e (fix: serve frontend from backend)
    setRecipes(res.data);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

const highlight = (text) => {
  if (!text) return ""; // ✅ prevent crash
  if (!search) return text;

  const parts = text.split(new RegExp(`(${search})`, "gi"));

  return parts.map((part, i) =>
    part.toLowerCase() === search.toLowerCase() ? (
      <span key={i} style={{ backgroundColor:  darkMode ? "#ff9800" : "#ffe066",
padding: "2px 4px",
    borderRadius: "4px"	  }}>
        {part}
      </span>
    ) : (
      part
    )
  );
};

  useEffect(() => {
    fetchRecipes();
  }, []);

  const addRecipe = async () => {
<<<<<<< HEAD
  if (!name || !ingredients) return alert("Fill all fields");
=======
if (!name || !ingredients) {
  alert("Please fill all fields");
  console.log("Search:", search);  
  return;
}
    await axios.post(`${API_URL}/recipes`, {
  name,
  ingredients,
  category,
});
  alert("Recipe added successfully!");
    setName("");
    setIngredients("");
    setCategory("");
    fetchRecipes();
  };
>>>>>>> 692ea7e (fix: serve frontend from backend)

  await axios.post("/recipes", { name, ingredients, category });

  setMessage("✅ Recipe added!");
  setTimeout(() => setMessage(""), 2000);

<<<<<<< HEAD
=======
  // delete recipe
  const deleteRecipe = async (id) => {
    await axios.delete(`${API_URL}/recipes/${id}`);
    fetchRecipes();
  };

const updateRecipe = async (id) => {
  await axios.put(`${API_URL}/recipes/${id}`, {
    name,
    ingredients,
    category,
  });
  setEditingId(null);
>>>>>>> 692ea7e (fix: serve frontend from backend)
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
const filteredRecipes = recipes
  .filter(recipe =>
    recipe.name.toLowerCase().includes(search.toLowerCase()) ||
    recipe.ingredients.toLowerCase().includes(search.toLowerCase())
  )
  .filter(r =>
    categoryFilter === "All" || r.category === categoryFilter
  );

  return (
  <div
    style={{
      background: darkMode
  ? "linear-gradient(135deg, #1e1e2f, #121212)"
  : "linear-gradient(135deg, #667eea, #764ba2)",
      minHeight: "100vh",
      padding: "40px"
    }}
  >
     <div style={{
   maxWidth: "650px",
  margin: "auto",
  background: darkMode ? "#1f1f1f" : "#ffffff",
color: darkMode ? "#f1f1f1" : "#000",
  padding: "30px",
  borderRadius: "20px",
  boxShadow: "0 12px 30px rgba(0,0,0,0.2)"
}}>

        <h1 style={{
  textAlign: "center",
  color: "#ff5722",
  marginBottom: "25px",
  fontSize: "28px",
  fontWeight: "bold"
}}>
  🍽 Recipe Manager
</h1>
<button
  onClick={() => setDarkMode(!darkMode)}
  style={{
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    background: darkMode
      ? "linear-gradient(to right, #444, #222)"
      : "linear-gradient(to right, #ffd369, #ffb347)",
    color: darkMode ? "white" : "black",
    fontWeight: "bold"
  }}
>
  {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
</button>

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
  placeholder="🔍 Search recipes..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "10px",
  border: "1px solid #555",
  backgroundColor: darkMode ? "#2c2c2c" : "#fff",
  color: darkMode ? "#fff" : "#000"
}}
onFocus={(e) => e.target.style.border = "1px solid #007bff"}
onBlur={(e) => e.target.style.border = "1px solid #555"}
/>


        {/* FILTER */}
 <select
  value={categoryFilter}
  onChange={(e) => setCategoryFilter(e.target.value)}
  style={{
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "10px",
  border: "1px solid #555",
  backgroundColor: darkMode ? "#2c2c2c" : "#fff",
  color: darkMode ? "#fff" : "#000"
}}
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
  borderRadius: "10px",
  border: "1px solid #555",
  backgroundColor: darkMode ? "#2c2c2c" : "#fff",
  color: darkMode ? "#fff" : "#000"
}}
onFocus={(e) => e.target.style.border = "1px solid #007bff"}
onBlur={(e) => e.target.style.border = "1px solid #555"}
        />

        <input
          placeholder="Ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
style={{
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "10px",
  border: "1px solid #555",
  backgroundColor: darkMode ? "#2c2c2c" : "#fff",
  color: darkMode ? "#fff" : "#000"
}}
onFocus={(e) => e.target.style.border = "1px solid #007bff"}
onBlur={(e) => e.target.style.border = "1px solid #555"}
        />

<select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  style={{
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "10px",
    border: "1px solid #555",
    backgroundColor: darkMode ? "#2c2c2c" : "#fff",
    color: darkMode ? "#fff" : "#000"
  }}
>
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
        <button
  onClick={() => setIsReversed(!isReversed)}
  style={{
    width: "100%",
    padding: "10px",
    background: "#6c63ff",
    color: "white",
    border: "none",
    borderRadius: "10px",
    marginBottom: "15px",
    cursor: "pointer"
  }}
>
  {isReversed ? "Newest First" : "Oldest First"}
</button>

   <h2>Recipes ({recipes.length})</h2>

{/* NO RESULTS */}
{filteredRecipes.length === 0 && (
  <p style={{ textAlign: "center", color: "#777" }}>
    🔍 No recipes found
  </p>
)}

{/* LIST */}
{(isReversed ? [...filteredRecipes].reverse() : filteredRecipes)
  .map(recipe => (
    <div
      key={recipe._id}
      style={{
        marginBottom: "15px",
  padding: "15px",
  borderRadius: "12px",
  backgroundColor: darkMode ? "#2a2a2a" : "#ffffff",
  color: darkMode ? "#f1f1f1" : "#000",
  border: darkMode ? "1px solid #444" : "1px solid #eee",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  transition: "all 0.3s ease"   // ✅ ADD THIS
      }}
	  onMouseEnter={(e) => {
  e.currentTarget.style.transform = "scale(1.03)";
  e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
}}
onMouseLeave={(e) => {
  e.currentTarget.style.transform = "scale(1)";
  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
}}
    >
      <h3>{highlight(recipe.name)}</h3>
      <p>{highlight(recipe.ingredients)}</p>

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
        fontSize: "12px"
      }}>
        {recipe.category || "General"}
      </p>

      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <button
          onClick={() => {
            setEditingId(recipe._id);
            setName(recipe.name);
            setIngredients(recipe.ingredients);
            setCategory(recipe.category || "");
          }}
          style={{
            flex: 1,
            background: "#007bff",
            color: "white",
            border: "none",
            padding: "8px",
            borderRadius: "8px"
          }}
        >
          Edit
        </button>

        <button
          onClick={() => deleteRecipe(recipe._id)}
          style={{
            flex: 1,
            background: "red",
            color: "white",
            border: "none",
            padding: "8px",
			transition: "0.2s",
			cursor: "pointer",
            borderRadius: "8px"
          }}
		  onMouseEnter={(e) => e.target.style.opacity = "0.8"}
		  onMouseLeave={(e) => e.target.style.opacity = "1"}
        >
          Delete
        </button>
      </div>
    </div>
))}
   </div>
    </div>
  );
}
  export default App;