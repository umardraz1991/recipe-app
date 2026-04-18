
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  // fetch recipes
  const fetchRecipes = async () => {
   try {
    setLoading(true);
    setError("");
    const res = await axios.get("http://localhost:5000/recipes");
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

  // add recipe
  const addRecipe = async () => {
if (!name || !ingredients) {
  alert("Please fill all fields");
  return;
}
    await axios.post("http://localhost:5000/recipes", {
      name,
      ingredients,
    });
    setName("");
    setIngredients("");
    fetchRecipes();
  };

  // delete recipe
  const deleteRecipe = async (id) => {
    await axios.delete(`http://localhost:5000/recipes/${id}`);
    fetchRecipes();
  };

const updateRecipe = async (id) => {
  await axios.put(`http://localhost:5000/recipes/${id}`, {
    name,
    ingredients,
  });
  setEditingId(null);
  setName("");
  setIngredients("");
  fetchRecipes();
};

  return (
    <div
     style={{
     minHeight: "100vh",
     backgroundColor: "#f4f6f8",
     padding: "40px"
     }}
    >
    <div
     style={{
     maxWidth: "500px",
     margin: "auto",
     backgroundColor: "white",
     padding: "25px",
     borderRadius: "10px",
     boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
     }}
    >    
  <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
  🍽 Recipe Manager
</h1>
  <h3 style={{ marginBottom: "10px" }}>
  Add / Edit Recipe
</h3>
	{editingId && (
  	 <p style={{ color: "blue", marginBottom: "10px" }}>
    	   ✏️ Editing existing recipe...
  	 </p>
	)}
<input
  placeholder="Search recipes..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    padding: "10px",
    width: "100%",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  }}
/>

<button
  onClick={() => setSearch("")}
  style={{
    marginBottom: "15px",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer"
  }}
>
  Clear Search
</button>
	<br /><br />

      <input
        placeholder="Recipe name"
  	value={name}
  	onChange={(e) => setName(e.target.value)}
  	style={{
    	padding: "10px",
    	width: "100%",
    	marginBottom: "10px",
    	borderRadius: "5px",
    	border: "1px solid #ccc"
       }}
      />
      <br /><br />

      <input
        placeholder="Ingredients (comma separated)"
  	value={ingredients}
  	onChange={(e) => setIngredients(e.target.value)}
  	style={{
    	padding: "10px",
    	width: "100%",
    	marginBottom: "15px",
    	borderRadius: "5px",
    	border: "1px solid #ccc"
       }}
      />
      <br /><br />

      <button
  	onClick={editingId ? () => updateRecipe(editingId) : addRecipe}
  	style={{
    	padding: "10px",
    	width: "100%",
    	backgroundColor: "#28a745",
    	color: "white",
    	border: "none",
    	borderRadius: "5px",
    	marginBottom: "20px",
    	cursor: "pointer",
    	fontWeight: "bold"
  	}}
       >	
  	{editingId ? "Update Recipe" : "Add Recipe"}
       </button>
	{editingId && (
  	 <button
   	  onClick={() => {
          setEditingId(null);
          setName("");
          setIngredients("");
        }}
   	 style={{
     	  marginTop: "10px",
      	  padding: "8px",
          width: "100%",
          backgroundColor: "#6c757d",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
    	}}
       >
          Cancel Edit
       </button>
)}
      <hr style={{ margin: "20px 0" }} />
      <h2 style={{ marginTop: "10px" }}>Recipes ({recipes.length})</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading recipes...</p>}
      {recipes.length === 0 && <p>No recipes found</p>}
      {recipes
  	.filter((recipe) =>
    	recipe.name.toLowerCase().includes(search.toLowerCase())
 	 )
 	 .map((recipe) => (
        <div
  	 key={recipe._id}
 	 style={{
   	 border: "1px solid #eee",
   	 padding: "15px",
   	 borderRadius: "10px",
   	 marginBottom: "15px",
   	 backgroundColor: "#fafafa",
   	 boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
  	}}
        >
          <h3 style={{ margin: "0 0 5px 0" }}>{recipe.name}</h3>
	  <p style={{ margin: "0 0 10px 0", color: "#555" }}>{recipe.ingredients}</p>
          <button
  	    onClick={() => {
    	    setEditingId(recipe._id);
    	    setName(recipe.name);
    	    setIngredients(recipe.ingredients);
	}}
	>
  	Edit
	</button>
          <button
            onClick={() => deleteRecipe(recipe._id)}
            style={{ backgroundColor: "red", color: "white" }}
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