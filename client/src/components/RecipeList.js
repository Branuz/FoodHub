import React from 'react'
import APIService from './APIService'
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";

function RecipeList(props) {

    let navigate = useNavigate(); 
    const routeChange = () => { 
        let path = `/recipes/create`; 
        navigate(path);
    }

    

    const editRecipe = (recipe) => {
        props.editRecipe(recipe)
        routeChange();
    }

    const deleteRecipe = (recipe) => {
        APIService.DeleteRecipe(recipe[0])
        .then(() => props.deleteRecipe(recipe))
    }

    const renderRecipe = (recipe) => {
        return (
            <div className="recipe-card" key = {recipe.id} >
                <Card style={{ width: '18rem' }} className="box">
                    <Card.Img variant="top" src="https://picsum.photos/300/" />
                    <Card.Body>
                        <Card.Title>{recipe[1]}</Card.Title>
                        <Card.Text>
                            {recipe[2]}
                        </Card.Text>
                        
                        <div className="d-grid gap-2 mt-4">
                        <button className = 'btn btn-primary'
                            onClick={() => editRecipe(recipe)}
                        >Update</button>

                        <button className = 'btn btn-danger'
                            onClick = {() => deleteRecipe(recipe)}
                        >Delete</button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        )
    }

    return (
        <div>
            <h1>Recipes</h1>
            <div className="row row-cols-1 row-cols-md-4">{props.recipes.map(renderRecipe)}</div>
        </div>)
}

export default RecipeList