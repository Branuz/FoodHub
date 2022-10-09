import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate} from "react-router-dom";
import APIService from "./APIService";
import "../css/Login.css";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate(); 
  const routeChange = () => { 
      let path = `/`; 
      navigate(path);
  }

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  const verifyAccount= () => {
    APIService.VerifyAccount({email, password})
    .then(response => {
        if(response.status === 200) {
           var userkey = parseFloat(response.headers.get("UserKey"))
           localStorage.setItem("token", userkey) 
        }
    })
    
    props.setLoginStatus("Logout")
    routeChange()
}

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="d-grid gap-2 mt-4">
            <Button variant="success" disabled={!validateForm()} onClick={verifyAccount}>Login</Button>{' '}
            <div>
                Not registered? <Link to="/create-account">Create Account</Link>
            </div>
        </div>
      </Form>
    </div>
  );
}