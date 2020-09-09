import React, { useState, useEffect } from "react";
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  CardBody,
  Card,
  Button,
} from "reactstrap";
import { FaBell, FaUserCircle, FaAngleDown } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import axios from "axios";


const Header = () => {
  

  const [User, setUser] = useState({});

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    let token = localStorage.usertoken;
    let config = {
      headers: {
        Authorization:token
      }
    }
    axios.get("http://localhost:9090/user/getUser",config)
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));

  }, []);


  const profileCard = () => {
    if (isOpen === true) {
      return (
        <Card className="ProfileCard">
          <CardBody>
            <div className="userRoundIcon">{User.name.charAt(0)}</div>
            <h5 className="userName">{User.name}</h5>
            <p className="userEmail">{User.email}</p>
            <Button
              className="userProfileCardBtn"
              onClick={() => {
                localStorage.removeItem("usertoken");
                window.location.pathname = '/';
              }}
            >
              <FiLogIn size="2rem" />
              <span className="logOut">Logout</span>
            </Button>
          </CardBody>
        </Card>
      );
    } else {
      return null;
    }
  };
  return (
    <React.Fragment>
      <Navbar className="headerBar" expand="md">
        <NavbarBrand href="/">
          <img className="brandImg" src="https://bit.ly/2Xad5vL" alt="" />
          <span className="brandName">Network and Maintenance</span>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Nav className="mr-auto" id="navsBar">
          <NavItem className="navsOne">
            <FaBell size="2rem" color="black" />
          </NavItem>
          <NavItem className="navsTwo">
            <FaUserCircle size="2rem" color="black" />
          </NavItem>
          <NavItem className="navsThree" onClick={toggle}>
            Welcome,&nbsp;{User.name}
            <FaAngleDown size={"2rem"} />
          </NavItem>
        </Nav>
      </Navbar>
      <br />
      {profileCard()}
    </React.Fragment>
  );
};

export default Header;
