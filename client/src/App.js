import React, {useState, useEffect} from 'react';
import RecipeList from './components/RecipeList';
import Form from './components/RecipeForm';
import RecipeView from './components/RecipeView';
import "./css/App.css";
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import AccountCreation from './components/AccountCreation';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import APIService from './components/APIService';

function App() {

  const [recipes, setRecipes] = useState([])
  const [editedRecipe, setEditedRecipe] = useState([])
  const [loginStatus, setLoginStatus] = useState(localStorage.getItem("token") ? "Logout" : "Sign in")



  useEffect(() => {
   APIService.getAllRecipes()
   .then(response => {
      setRecipes(response)
   })

  }, [])

  const editRecipe = (recipe) => {
    setEditedRecipe(recipe)
  }

  const insertedRecipe = (response) => {
    APIService.getAllRecipes()
    .then(response => {
       setRecipes(response)
    })
  }

  const deleteRecipe = (recipe) => {
    const new_recipes = recipes.filter(myrecipe => {
      if(myrecipe[0] === recipe[0]) {
        return false;
      }
      return true
    })

    setRecipes(new_recipes)
  }

  return (
    <>
    <Header loginStatus={loginStatus}/>
    <Router>
      <main>
        <div className="App">
          <Routes>
            <Route path="/" element={<RecipeList recipes = {recipes} editRecipe = {editRecipe} deleteRecipe = {deleteRecipe}/>}>
            </Route>
            
            <Route path="/recipes/create/"  element={editedRecipe ?  <Form recipe = {editedRecipe} insertedRecipe = {insertedRecipe}/> : null}>
            </Route>

            <Route path="/recipes/view/"  element={editedRecipe ?  <RecipeView recipe = {editedRecipe} insertedRecipe = {insertedRecipe}/> : null}>
            </Route>

            <Route path="/login" element={<Login setLoginStatus={setLoginStatus}/>} />

            <Route path="/create-account" element={<AccountCreation />} />
          </Routes>
          
            
        </div>
      </main>
    </Router>
    <Footer/>
    </>
  );
}

export default App