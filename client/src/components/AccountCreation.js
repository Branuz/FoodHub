import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import APIService from "./APIService";
import "../css/Login.css";

function AccountCreation() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRe, setPasswordRe] = useState("");
  

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  const createAccount= () => {
    APIService.CreateAccount({username, email, password})
    .catch(error => console.log(error));
}

  return (
    <div className="Login">
    <Form onSubmit={handleSubmit}>
    <Form.Group size="lg" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control
          autoFocus
          type="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
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
        <Form.Label>Password confirmation</Form.Label>
        <Form.Control
          type="password"
          value={passwordRe}
          onChange={(e) => setPasswordRe(e.target.value)}
        />
      </Form.Group>
      <div className="d-grid gap-2 mt-4">
          <Button variant="success" disabled={!validateForm()} onClick={createAccount}>Register</Button>{' '}
      </div>
    </Form>
  </div>
  )
}

export default AccountCreation