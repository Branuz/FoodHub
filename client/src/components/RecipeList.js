import React from 'react'
import APIService from './APIService'
import Card from 'react-bootstrap/Card';

function RecipeList(props) {

    const editRecipe = (recipe) => {
        props.editRecipe(recipe)
    }

    const deleteRecipe = (recipe) => {
        APIService.DeleteRecipe(recipe.id)
        .then(() => props.deleteRecipe(recipe))
    }

    const renderRecipe = (recipe) => {
        return (
            <div className="recipe-card" key = {recipe.id} >
                <Card style={{ width: '18rem' }} className="box">
                    <Card.Img variant="top" src="https://picsum.photos/300/" />
                    <Card.Body>
                        <Card.Title>{recipe.title}</Card.Title>
                        <Card.Text>
                            {recipe.body}
                        </Card.Text>
                        
                        <button className = 'btn btn-primary'
                            onClick={() => editRecipe(recipe)}
                        >Update</button>

                        <button className = 'btn btn-danger'
                            onClick = {() => deleteRecipe(recipe)}
                        >Delete</button>
                    </Card.Body>
                </Card>
            </div>
        )
    }

    return <div class="row row-cols-1 row-cols-md-4">{props.recipes.map(renderRecipe)}</div>
}

export default RecipeList