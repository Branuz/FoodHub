import {useState, useEffect} from 'react';
import RecipeList from './components/RecipeList';
import Form from './components/Form';
import "./App.css";

function App() {

  const [recipes, setRecipes] = useState([])
  const [editedRecipe, setEditedRecipe] = useState(null)

  useEffect(() => {
    fetch("/get", {
      "method":"GET",
      headers: {
        "Content-Type":"application/json"
      }
    })
    .then(response => {
      if(response.status === 200) {
        return response.json()
      }
    })
    .then(response => setRecipes(response))
    .catch(error => console.log(error))
  }, [])

  const editRecipe = (recipe) => {
    setEditedRecipe(recipe)
  }

  const updatedRecipe = (recipe) => {
    const new_recipe = recipes.map(my_recipe => {
      if(my_recipe.id === recipe.id) {
        return recipe
      } else {
        return my_recipe
      }
    })
    setRecipes(new_recipe)
  }

  return (
    <div className="App">
      <h1>Reseptit</h1>

        <RecipeList recipes = {recipes} editRecipe = {editRecipe}/>

        {editedRecipe ? <Form recipe = {editedRecipe} updatedRecipe = {updatedRecipe}/> : null}
        
    </div>
  );
}

export default App