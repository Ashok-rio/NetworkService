import React from "react";
import Login from "./Login/Login";
import UserRegister from "./Register/UserRegister";
import AdminRegister from "./Register/AdminRegister";
import { Card, CardBody, Row, Col, Button } from "reactstrap";
import { FiLogIn } from "react-icons/fi";

const Home = () => {
  const path = window.location.pathname;

  const renderComponent = () => {
    if (path === "/" || path === "/profile") {
      return <Login />
    } else if (path === "/user/register") {
      return <UserRegister />;
    } else if (path === "/admin/register") {
      return <AdminRegister />;
    } else if(path === "/register"){
        return (
            <React.Fragment>
              <div className="HomeDiv">
                <Card className="HomeCard">
                  <CardBody>
                    <Row>
                      <Col lg={4} className="registerTypeColom">
                        <span>Please select</span>
                        <h4 className="registerTypeLabel">Register Type</h4>
                      </Col>
                      <Col lg={8}>
                        <Row>
                          <Col md={6}>
                            <Button className="adminBtn" href={'/admin/register'} >Admin</Button>
                          </Col>
                          <Col md={6}>
                            <Button className="userBtn" href={'/user/register'}  >User</Button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={10}></Col>
                      <Col><a href={'/'} className={"loginLink"}>Login <FiLogIn size="2rem" color={"#4dbb9f"} /></a></Col>
                    </Row>
                  </CardBody>
                </Card>
              </div>
            </React.Fragment>
          );
    }
  };
  return (
    <div>
      <img
        className="backgroudImage"
        src="https://bit.ly/39Mf7Vv"
        alt="Hello"
      />
      {renderComponent()}
    </div>
  );
};

export default Home;
