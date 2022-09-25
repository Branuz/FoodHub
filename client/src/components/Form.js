import React, {useState, useEffect} from 'react'


function Form(props) {
    const [title, setTitle] = useState(props.recipe.title)
    const [body, setBody] = useState(props.recipe.body)

    const updateRecipe = () => {
        
    }

  return (
    <div>
        {props.recipe  ? (
            <div className = "mb-3">

                <label htmlForm = "title" className = 'form-label'>Title</label>
                <input type = "text" className=''form='form-control'
                value = {title}
                placeholder = 'Please Enter Title'
                onChange={(e) => setTitle(e.target.value)}
                />

                <label htmlForm = "body" className = 'form-label'>Description</label>
                <textarea
                rows = "5"
                value = {body}
                onChange={(e) => setBody(e.target.value)}
                className = 'form-control'
                placeholder='Please Enter Description'
                />
                <button
                onClick={updateRecipe}
                className='btn btn-success mt-3'
                >Update</button>
            </div>
        ):null}

    </div>
  )
}

export default Form