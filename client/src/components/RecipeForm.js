import React, {useState, useEffect} from 'react'
import APIService from './APIService'
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function RecipeForm(props) {
    const [title, setTitle] = useState('')
    //const [type, setType] = useState('')
    const [cookingTime, setCookingTime] = useState('')
    const [body, setBody] = useState('')
    const [ingredientList, setIngredientList] = useState([{ ingredient: "", amount: "", measurement: ""}]);


    useEffect(() => {
        //setType(props.recipe.type)
        setTitle(props.recipe.title)
        setBody(props.recipe.body)
        setCookingTime(props.recipe.cooking_time)
    },[props.recipe])

    const updateRecipe = () => {
        APIService.UpdateRecipe(props.recipe.id, {title, body, cookingTime})
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
        APIService.InsertRecipe({title, body, cookingTime})
        .then(response => props.insertedRecipe(response))
        .catch(error => console.log(error));

        routeChange();
    }

    const handleIngredientChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...ingredientList];
        list[index][name] = value;
        setIngredientList(list);
      };

      const handleIngredientRemove = (index) => {
        const list = [...ingredientList];
        list.splice(index, 1);
        setIngredientList(list);
      };

      const handleIngredientAdd = () => {
        setIngredientList([...ingredientList, { ingredient: "", amount: "", measurement: "" }]);
      };


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
                        <Form.Group as={Col} >
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

                        <Form.Group as={Col}>
                        <Form.Label>Cooking time</Form.Label>
                        <Form.Control value = {cookingTime}  onChange={(e) => setCookingTime(e.target.value)} placeholder="Enter estimated cooking time "/>
                        </Form.Group>
                    </Row>

                    <div className="form-field">
                    <label htmlFor="ingredient">Ingredient(s)</label>
                    {ingredientList.map((singleService, index) => (
                        
                    <div key={index} className="ingredients">
                        <div className="first-division">
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridZip">
                                <div className="input-group mb-3">
                                    <input
                                    placeholder="Place ingredient name"
                                    className="form-control"
                                    name="ingredient"
                                    type="text"
                                    id="ingredient"
                                    value={singleService.ingredient}
                                    onChange={(e) => handleIngredientChange(e, index)}
                                    required
                                />
                                </div>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridZip">
                                <div className="input-group mb-3">
                                    <input
                                    placeholder="Place ingredient amount"
                                    className="form-control"
                                    name="amount"
                                    type="text"
                                    id="amount"
                                    value={singleService.amount}
                                    onChange={(e) => handleIngredientChange(e, index)}
                                    required
                                />
                                </div>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridZip">
                                <div className="input-group mb-3">
                                    <input
                                    placeholder="Measuring type ml, l, tbs etc..."
                                    className="form-control"
                                    name="measurement"
                                    type="text"
                                    id="measurement"
                                    value={singleService.measurement}
                                    onChange={(e) => handleIngredientChange(e, index)}
                                    required
                                />
                                        <button className="btn btn-danger" onClick={() => handleIngredientRemove(index)} type="button" id="button-addon2">Remove</button>
                                </div>
                            </Form.Group>
                        </Row>
                        </div>
                    </div>
                    ))}
            </div>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <button className="btn btn-success" type="button" id="button-addon2" onClick={handleIngredientAdd} >New ingreadent</button>
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
                    >Create</button>
                } 

            </div>
        )}

    </div>
  )
}

export default RecipeForm