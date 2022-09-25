import React from 'react'

function RecipeList(props) {

    const editRecipe = (recipe) => {
        props.editRecipe(recipe)
    }

  return (
    <div>
        {props.recipes && props.recipes.map(recipe => {
    return (
        <div key = {recipe.id}>
            <h2>{recipe.title}</h2>
            <p>{recipe.body}</p>
            <p>{recipe.date}</p>

            <div className = 'row'>
                <div className = 'col-md-1'>
                    <button className = 'btn btn-primary'
                    onClick={() => editRecipe(recipe)}
                    >Update</button>
                </div>

                <div className = 'col'>
                    <button className = 'btn btn-danger'>Delete</button>
                </div>

            </div>
        </div>
    )
    })}
    </div>
  )
}

export default RecipeList