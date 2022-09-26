import React, {useState, useEffect} from 'react';
import RecipeList from './components/RecipeList';
import Form from './components/Form';
import "./App.css";
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {

  const [recipes, setRecipes] = useState([])
  const [editedRecipe, setEditedRecipe] = useState([])

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

  const insertedRecipe = (recipe) => {
    const new_recipes = [...recipes, recipe]
    setRecipes(new_recipes)
  }

  const deleteRecipe = (recipe) => {
    const new_recipes = recipes.filter(myrecipe => {
      if(myrecipe.id === recipe.id) {
        return false;
      }
      return true
    })

    setRecipes(new_recipes)
  }

  return (
    <>
    <Header/>
    <Router>
      <main>
        <div className="App">
          <Routes>
            <Route path="/" element={<RecipeList recipes = {recipes} editRecipe = {editRecipe} deleteRecipe = {deleteRecipe}/>}>
            </Route>
            
            <Route path="/recipes/create/"  element={editedRecipe ?  <Form recipe = {editedRecipe} updatedRecipe = {updatedRecipe} insertedRecipe = {insertedRecipe}/> : null}>
            </Route>
          </Routes>
            
        </div>
      </main>
    </Router>
    <Footer/>
    </>
  );
}

export default App