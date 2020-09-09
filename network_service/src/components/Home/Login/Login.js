import React, { useState } from "react";
import { Card, CardBody, Form, Input, Col, Button, Row } from "reactstrap";
import axios from 'axios';
import useForm from "./../../../hooks/useForm";
import { toast } from 'react-toastify';
toast.configure();

const Login = () => {
  const [values, handlerChange] = useForm();
  const [message,setmessage] = useState({})
  
  const login = (e) => {
    e.preventDefault();
    console.log(values);
    axios.post("http://localhost:9090/user/login", { ...values })
      .then(res => {
        if (res.data.token) {
          localStorage.setItem("usertoken", res.data.token);
          if (localStorage) {
            window.location = '/'
          } else {
            window.location.reload(true);
          }
        }
        else{
          setmessage({message:res.data.message});
        }
      }).catch(err => console.log(err.data));
  };

  return (
    <div className="LoginDiv">
      <Card className="loginCard">
        <CardBody>
        {message.message?<p className="errorMessage">{message.message}</p>:null}
          <Form className="LoginForm" onSubmit={login}>
            <Row>
              <Col>
                <p className="LoginInputLabel">Phone | Email</p>
              </Col>
              <Col md={8}>
                <Input
                  className="LoginInputPanel"
                  type={isNaN(values.email) ? 'email' : 'tel'}
                  name={isNaN(values.email) ? 'email' : 'phoneNumber'}
                  value={isNaN(values.email) ? values.email : values.phoneNumber}
                  onChange={handlerChange}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <p className="LoginInputLabel">Password</p>
              </Col>
              <Col md={8}>
                <Input
                  className="LoginInputPanel"
                  type="password"
                  name="password"
                  value={values.password || ""}
                  id="examplePassword"
                  onChange={handlerChange}
                />
              </Col>
            </Row>
            <Row>
              <Col></Col>
              <Col md={8}>
                <div className="ButtonContainer">
                  <Row>
                    <Col>
                      <Button className="LoginButtons">Cancel</Button>
                    </Col>
                    <Col>
                      <Button className="LoginButtons">Login</Button>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col>
                      <p className="createAccountLink">
                        Create New Account ?&nbsp;
                        <span className="LoginRegisterLink">
                          <a className="LoginFormRegisterLink" href={'/register'}>Register</a>
                        </span>
                      </p>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
