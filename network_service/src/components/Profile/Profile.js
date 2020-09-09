import React, { useState, useEffect } from "react";
import { Card, CardBody, Row, Col, Input, Button, Form } from "reactstrap";
import axios from "axios";
import useForm from "../../hooks/useForm";

const Profile = () => {
  const [user, setuser] = useState({});

  const [btns, setbtns] = useState(false);

  const [editbtns, seteditbtns] = useState(true);

  const [disbled, setdisbled] = useState(false);

  const [values, handleChanger] = useForm();

  const showBtns = () => {
    setbtns(!btns);
    seteditbtns(!editbtns);
    setdisbled(!disbled);
  };

  const profileSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    let config = {
      headers: {
        Authorization: localStorage.usertoken,
      },
    };
    axios
      .put("http://localhost:9090/user/updateUser", values, config)
      .then((res) => {
        console.log(res);
        window.location.reload(false)
      })
      .catch((err) => console.log(err));
  };

  const saveAndCancelBtn = () => {
    if (btns === true) {
      return (
        <Row>
          <Col md={3}></Col>
          <Col md={2}>
            <Button className="saveAndCancelBtn" onClick={showBtns}>
              cancel
            </Button>
          </Col>
          <Col md={2}>
            <Button className="saveAndCancelBtn" onClick={profileSubmit}>
              save
            </Button>
          </Col>
          <Col md={5}></Col>
        </Row>
      );
    }
  };

  useEffect(() => {
    let token = localStorage.usertoken;
    let config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get("http://localhost:9090/user/getUser", config)
      .then((res) => setuser(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <React.Fragment>
      <Row>
        <Col md={10}>
          <h5 className="recentUpdates">My Profile</h5>
        </Col>
      </Row>
      <br />
      <Card className="profileCard">
        <CardBody>
          <Form>
            <Row>
              <Col md={10}></Col>
              <Col md={2}>
                {editbtns === true ? (
                  <Button className="profileEditBtn" onClick={showBtns}>
                    Edit
                  </Button>
                ) : null}
              </Col>
            </Row>
            <Row>
              <Col md={2}>
                <p className="profileLabel">Name</p>
              </Col>
              <Col md={6}>
                <Input
                  className="profileInputPanel"
                  type="text"
                  name="name"
                  value={disbled === false ? user.name : values.name}
                  disabled={disbled === false ? "disabled" : ""}
                  onChange={handleChanger}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col md={2}>
                <p className="profileLabel">Email</p>
              </Col>
              <Col md={6}>
                <Input
                  className="profileInputPanel"
                  type="email"
                  value={user.email}
                  disabled
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col md={2}>
                <p className="profileLabel">
                  {user.department ? "Department" : "Position"}
                </p>
              </Col>
              <Col md={6}>
                {user.department ? (
                  <Input
                    type="select"
                    name="department"
                    id="exampleSelect"
                    onChange={handleChanger}
                    value={
                      disbled === false ? user.department : values.department
                    }
                    disabled={disbled === false ? "disabled" : ""}
                  >
                    <option value={"Bca"}>Bca</option>
                    <option value={"Bsc-it"}>Bsc-it</option>
                    <option value={"Bsc-cs"}>Bsc-cs</option>
                    <option value={"Mca"}>Mca</option>
                    <option value={"Msc-it"}>Msc-it</option>
                    <option value={"Msc-cs"}>Msc-cs</option>
                  </Input>
                ) : (
                  <Input
                    type="select"
                    name="position"
                    value={disbled === false ? user.position : values.position}
                    id="exampleSelect"
                    onChange={handleChanger}
                    disabled={disbled === false ? "disabled" : ""}
                  >
                    <option value={"Network Engineer"}>Network Engineer</option>
                    <option value={"Network Maintenance"}>
                      Network Maintenance
                    </option>
                    <option value={"System Maintenance"}>
                      System Maintenance
                    </option>
                  </Input>
                )}
              </Col>
            </Row>
            <br />
            <Row>
              <Col md={2}>
                <p className="profileLabel">Phone</p>
              </Col>
              <Col md={6}>
                <Input
                  className="profileInputPanel"
                  type="tel"
                  value={user.phoneNumber}
                  disabled
                />
              </Col>
            </Row>
            <br />
            {saveAndCancelBtn()}
          </Form>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Profile;
