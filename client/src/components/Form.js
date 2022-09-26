import React, {useState, useEffect} from 'react'
import APIService from './APIService'
import { useNavigate } from "react-router-dom";

function Form(props) {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    useEffect(() => {
        setTitle(props.recipe.title)
        setBody(props.recipe.body)
    },[props.recipe])

    const updateRecipe = () => {
        APIService.UpdateRecipe(props.recipe.id, {title, body})
        .then(response => props.updatedRecipe(response))
        .catch(error => console.log(error));

        routeChange();
    }

    let navigate = useNavigate(); 
    const routeChange = () => { 
        let path = `/`; 
        navigate(path);
    }

    const insertRecipe = () => {
        APIService.InsertRecipe({title, body})
        .then(response => props.insertedRecipe(response))
        .catch(error => console.log(error));

        routeChange();
    }

  return (
    <div>
        {(
            <div className = "mb-3">

                <label htmlFor = "title" className = 'form-label'>Title</label>
                <input type = "text" className=''form='form-control'
                value = {title}
                placeholder = 'Please Enter Title'
                onChange={(e) => setTitle(e.target.value)}
                />
                
                <label htmlFor = "body" className = 'form-label'>Description</label>
                <textarea
                rows = "5"
                value = {body}
                onChange={(e) => setBody(e.target.value)}
                className = 'form-control'
                placeholder='Please Enter Description'
                />

                {
                    props.recipe.id ? <button
                    onClick={updateRecipe}
                    className='btn btn-success mt-3'
                    >Update</button>
                    :

                    <button
                    onClick={insertRecipe}
                    className='btn btn-success mt-3'
                    >Insert</button>
                } 

            </div>
        )}

    </div>
  )
}

export default Form