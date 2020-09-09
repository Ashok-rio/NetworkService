import React, { useState } from 'react'
import { Card, CardBody, Form, Input, Col, Button, Row } from "reactstrap";
import useForm from "./../../../hooks/useForm";
import axios from 'axios';

const AdminRegister = () => {
  const [values, handlerChange] = useForm();
  const [message, setmessage] = useState({});

  const adminRegister = (e) => {
    e.preventDefault();
    let [name, email, password, position, phoneNumber] = [values.name, values.email, values.password, values.position, values.phoneNumber]
    if (name !== undefined) {
      if (name.length >= 5) {
        if (email !== "" && email !== undefined) {
          if (password !== "" && password.length >= 6 && password !== undefined) {

            if (position !== "" && position !== undefined) {
              if (phoneNumber !== '' && phoneNumber !== undefined) {
                console.log(phoneNumber);
                if (phoneNumber.length >= 10 || phoneNumber.length === 12) {
                  axios.post("http://localhost:9090/user/register", { ...values })
                    .then(res => {
                      console.log(res.data);
                      setmessage({errors:res.data.message});
                      if(res.data._id !== '' && res.data._id !== undefined){
                        window.location = '/';
                      }
                    })
                    .catch(err => console.log(err));
                } else {
                  setmessage({ message: "phone", error: 'phone number must have 10 digit' })
                }
              }
              else {
                setmessage({ message: "phone", error: 'please input phone to register' })
              }
            } else {
              setmessage({ message: "position", error: 'please select position' })
            }

          } else {
            setmessage({ message: "password", error: 'password must cotain 8 char' })
          }
        } else {
          setmessage({ message: "email", error: "please input email to register" })
        }
      }
      else {
        setmessage({ message: "name", error: "name must 5 char" })
      }
    }
    else {
      setmessage({ message: "name", error: 'please input name to register!' })
    }
  };

  return (
    <div className="userDiv">
      <Card className="userCard">
        <CardBody>
          <span className="ErrorMessagePanel">{message.errors?message.errors:null}</span>
          <Form className="userForm" onSubmit={adminRegister}>
            <Row>
              <Col className="userInputLabelColom">
                <p className="userInputLabel">Name</p>
              </Col>
              <Col md={8}>
              <span className="ErrorMessagePanel">{message.message === "name"?message.error:null}</span>
                <Input
                  className={message.message === "name" ? "ErrorInput" : "userInputPanel"}
                  type="text"
                  name="name"
                  value={values.name || ""}
                  onChange={handlerChange}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col className="userInputLabelColom">
                <p className="userInputLabel">Email</p>
              </Col>
              <Col md={8}>
              <span className="ErrorMessagePanel">{message.message === "email"?message.error:null}</span>
                <Input
                  className={message.message === "email" ? "ErrorInput" : "userInputPanel"}
                  type="email"
                  name="email"
                  value={values.email || ""}
                  onChange={handlerChange}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col className="userInputLabelColom">
                <p className="userInputLabel">Password</p>
              </Col>
              <Col md={8}>
              <span className="ErrorMessagePanel">{message.message === "password"?message.error:null}</span>
                <Input
                  className={message.message === "password" ? "ErrorInput" : "userInputPanel"}
                  type="password"
                  name="password"
                  value={values.password || ""}
                  id="examplePassword"
                  onChange={handlerChange}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col className="userInputLabelColom">
                <p className="userInputLabel">Position</p>
              </Col>
              <Col md={8}>
              <span className="ErrorMessagePanel">{message.message === "position"?message.error:null}</span>
                <Input
                  type="select"
                  className={message.message === "position" ? "ErrorInput" : "userInputPanel"}
                  name="position"
                  value={values.position || ""}
                  id="exampleSelect"
                  onChange={handlerChange}
                >
                  <option>Choose Position</option>
                  <option value={"Network Engineer"}>Network Engineer</option>
                  <option value={"Network Maintenance"}>Network Maintenance</option>
                  <option value={"System Maintenance"}>System Maintenance</option>
                </Input>
              </Col>
            </Row>
            <br />
            <Row>
              <Col className="userInputLabelColom">
                <p className="userInputLabel">Phone</p>
              </Col>
              <Col md={8}>
              <span className="ErrorMessagePanel">{message.message === "phone"?message.error:null}</span>
                <Input
                  className={message.message === "phone" ? "ErrorInput" : "userInputPanel"}
                  type="tel"
                  name="phoneNumber"
                  value={values.phoneNumber || ""}
                  onChange={handlerChange}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col className="userInputLabelColom">
                <p className="userInputLabel">User Type</p>
              </Col>
              <Col md={8}>
                <Input
                  className="userInputPanel"
                  type="text"
                  name="userType"
                  value={values.userType = "admin"}
                  disabled
                />
              </Col>
            </Row>
            <Row>
              <Col></Col>
              <Col md={8}>
                <div className="ButtonContainer">
                  <Row>
                    <Col>
                      <Button className="userButtons" href={'/register'} >Cancel</Button>
                    </Col>
                    <Col>
                      <Button className="userButtons">Register</Button>
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
}

export default AdminRegister
