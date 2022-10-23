import React, {useState, useEffect} from 'react'
import APIService from './APIService'
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function RecipeView(props) {
    const [title, setTitle] = useState(null)
    const [type, setType] = useState(null)
    const [description, setDescription] = useState(null)
    const [cookingTime, setCookingTime] = useState(null)
    const [instructions, setInstructions] = useState(null)
    const [ingredientList, setIngredientList] = useState([{ ingredient: "", amount: "", measurement: ""}]);


    useEffect(() => {
        fetchIngredients()
        setTitle(props.recipe[1])
        setDescription(props.recipe[2])
        props.recipe[3] ? setType(props.recipe[3]) : setType("Breakfest")
        setCookingTime(props.recipe[4])
        setInstructions(props.recipe[5])
    },[props.recipe])

    const fetchIngredients = () =>  {
        if(props.recipe[0]) {
            APIService.getRecipeIngredients(props.recipe[0])
            .then(response => {
                const list = []

                response.map((singleService, index) => {
                    list.push([{ ingredient: "", amount: "", measurement: ""}])
                    list[index]["ingredient"] = singleService[1];
                    list[index]["amount"] = singleService[2];
                    list[index]["measurement"] = singleService[3];
                })
                setIngredientList(list)
            })
        }
    }
 
    let navigate = useNavigate(); 
    const routeChange = () => { 
        let path = `/`; 
        navigate(path);
    }

  return (
    <div>
        {(
            <div className = "mb-3">
                <div>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control value = {title} placeholder="Please Enter Title" />
                    </Form.Group>

                    <Row className="mb-3">
                        <Form.Group as={Col} >
                        <Form.Label >Description</Form.Label>
                        <Form.Control placeholder="Short Description" value = {description} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Type</Form.Label>
                        <Form.Select value = {type} >
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
                        <Form.Control value = {cookingTime} placeholder="Enter estimated cooking time in minutes"/>
                        </Form.Group>
                    </Row>

                    <div className="form-field">
                    <label htmlFor="ingredient">Ingredient(s)</label>
                    {ingredientList.map((singleService, index) => (
                    <div key={index} className="ingredients">
                        <div className="first-division" style={{borderBottom: "1px solid gray", marginBottom:"20px"}}>
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
                                    required
                                />
                                </div>
                            </Form.Group>
                        </Row>
                        </div>
                    </div>
                    ))}
            </div>
                    <Form.Group className="mb-3">
                        <Form.Label>Instructions</Form.Label>
                        <Form.Control value = {instructions} placeholder="Enter Instructions" as="textarea" rows={5} />
                    </Form.Group>
                </Form>
                </div>
            </div>
        )}

    </div>
  )
}

export default RecipeView