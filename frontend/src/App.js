import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);

  // fetch recipes
  const fetchRecipes = async () => {
    const res = await axios.get("http://localhost:5000/recipes");
    setRecipes(res.data);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  // add recipe
  const addRecipe = async () => {
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

  return (
    <div style={{ padding: "20px" }}>
      <h1>Recipe App</h1>

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

      <button onClick={addRecipe}>Add Recipe</button>

      <h2>Recipes</h2>

      {recipes.map((recipe) => (
        <div key={recipe._id} style={{ marginBottom: "10px" }}>
          <h3>{recipe.name}</h3>
          <p>{recipe.ingredients}</p>

          <button
            onClick={() => deleteRecipe(recipe._id)}
            style={{ backgroundColor: "red", color: "white" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;