
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
  console.log("Search:", search);  
  return;
}
    await axios.post("http://localhost:5000/recipes", {
      name,
      ingredients,
      category,
    });
  alert("Recipe added successfully!");
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
    category,
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
    	   ✏️ Editing: {name} ({category})
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


{/* ✅ ADD DROPDOWN EXACTLY HERE */}
<select
  value={categoryFilter}
  onChange={(e) => setCategoryFilter(e.target.value)}
  style={{
    padding: "10px",
    width: "100%",
    marginBottom: "15px",
    borderRadius: "5px"
  }}
>
  <option value="">Select Category</option>
  <option value="Italian">Italian</option>
  <option value="Healthy">Healthy</option>
  <option value="Fast Food">Fast Food</option>
  <option value="Dessert">Dessert</option>
</select>
	<br /><br />

      <input
        placeholder="Recipe name"
	autoFocus
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

<select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  style={{
    padding: "10px",
    width: "100%",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc"
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
	disabled={!name || !ingredients}
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
<button
  onClick={() => setIsReversed(!isReversed)}
  style={{
    marginBottom: "10px",
    padding: "8px",
    borderRadius: "5px",
    cursor: "pointer"
  }}
>
  {isReversed ? "Show Newest First" : "Show Oldest First"}
</button>
      <h2 style={{ marginTop: "10px" }}>Recipes ({recipes.length})</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading recipes...</p>}
      {recipes.filter(r =>
  r.name.toLowerCase().includes(search.toLowerCase())
).length === 0 && (
  <p>No matching recipes found</p>
)}


      {recipes
	.filter((recipe) =>
    	 recipe.name?.toLowerCase().includes(search.toLowerCase())
 	 )
        .slice() // copy array
        .filter((recipe) => {
  const matchesSearch = recipe.name?.toLowerCase().includes(search.toLowerCase()) ||
  recipe.ingredients?.toLowerCase().includes(search.toLowerCase());

  const matchesCategory =
    categoryFilter === "All" ||
    recipe.category === categoryFilter;

  return matchesSearch && matchesCategory;
})
.slice()
[isReversed ? "reverse" : "sort"]((a, b) => 0)
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
	  <p style={{ 
display: "inline-block",
    padding: "5px 10px",
    backgroundColor:      
      recipe.category === "Healthy" ? "green" :
      recipe.category === "Fast Food" ? "red" :
      recipe.category === "Dessert" ? "purple" :
      recipe.category === "Italian" ? "orange" : 
      "#007bff",
    color: "white",
    borderRadius: "15px",
    fontSize: "12px",
    marginBottom: "10px"
  }}
>
  {recipe.category || "General"}
</p>


          <button
  	    onClick={() => {
    	    setEditingId(recipe._id);
    	    setName(recipe.name);
    	    setIngredients(recipe.ingredients);
	    setCategory(recipe.category || "");
	}}
	>
  	Edit
	</button>
          <button
            onClick={() => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      deleteRecipe(recipe._id);
    }
  }}
            style={{ backgroundColor: "red", color: "white" }}
          >
            Delete
          </button>
        </div>
      ))}
<hr />

<p
  style={{
    textAlign: "center",
    marginTop: "20px",
    color: "#777",
    fontSize: "14px"
  }}
>
  © 2026 Recipe App | Built with React & Node.js
</p>
    </div>
    </div>
  );
}

export default App;