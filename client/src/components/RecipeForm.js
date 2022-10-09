import React, {useState, useEffect} from 'react'
import APIService from './APIService'
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function RecipeForm(props) {
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
                <div>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control value = {title}  onChange={(e) => setTitle(e.target.value)} placeholder="Please Enter Title" />
                    </Form.Group>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label >Description</Form.Label>
                        <Form.Control placeholder="Short Description"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Type</Form.Label>
                        <Form.Select defaultValue="Choose...">
                            <option>Breakfest</option>
                            <option>Lunch</option>
                            <option>Dinner</option>
                            <option>Dessert</option>
                            <option>Coctail</option>
                            <option>Snack</option>
                        </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Cooking time</Form.Label>
                        <Form.Control placeholder="Enter estimated cooking time "/>
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label>Instructions</Form.Label>
                        <Form.Control value = {body} onChange={(e) => setBody(e.target.value)} placeholder="Enter Instructions" as="textarea" rows={5} />
                    </Form.Group>
                </Form>

                </div>

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

export default RecipeForm