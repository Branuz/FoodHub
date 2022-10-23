import React, {useState, useEffect} from 'react'
import APIService from './APIService'
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function RecipeForm(props) {
    const [title, setTitle] = useState(null)
    const [type, setType] = useState(null)
    const [description, setDescription] = useState(null)
    const [cookingTime, setCookingTime] = useState(null)
    const [instructions, setInstructions] = useState(null)
    const [error, setError] = useState('')
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
 
    const updateRecipe = () => {
        APIService.UpdateRecipe(props.recipe[0], {title, description, type, cookingTime, instructions, ingredientList })
        .then(response => props.insertedRecipe(response))
        .catch(error => console.log(error));
        routeChange();
    }

    let navigate = useNavigate(); 
    const routeChange = () => { 
        let path = `/`; 
        navigate(path);
    }

    const insertRecipe = () => {
        if (title==null || description==null || type==null | cookingTime==null | instructions==null ) {
            setError("You need to fill all the fields!")
        } else {
            APIService.InsertRecipe({title, description, type, cookingTime, instructions, ingredientList })
            .then(response => props.insertedRecipe(response))
    
            routeChange();
        }
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
                <h3 style={{color: "red"}}>{error}</h3>
                <div>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control value = {title}  onChange={(e) => setTitle(e.target.value)} placeholder="Please Enter Title" />
                    </Form.Group>

                    <Row className="mb-3">
                        <Form.Group as={Col} >
                        <Form.Label >Description</Form.Label>
                        <Form.Control placeholder="Short Description" value = {description}  onChange={(e) => setDescription(e.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Type</Form.Label>
                        <Form.Select value = {type} onChange={(e) => setType(e.target.value)} >
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
                        <Form.Control value = {cookingTime}  onChange={(e) => setCookingTime(e.target.value)} placeholder="Enter estimated cooking time in minutes"/>
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
                        <Form.Control value = {instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="Enter Instructions" as="textarea" rows={5} />
                    </Form.Group>
                </Form>
                </div>

                {
                    props.recipe[0]? <button
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