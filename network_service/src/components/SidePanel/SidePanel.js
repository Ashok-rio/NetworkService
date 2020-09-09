import React from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import { FaHome, FaTools, FaDesktop, FaLink } from "react-icons/fa";
import jwt_decode from 'jwt-decode';

const SidePanel = () => {
  let token = localStorage.usertoken;
  let decoded = jwt_decode(token);

  let path = window.location.pathname;
  return (
    <React.Fragment>
      <Card className="SideNavCard">
        <CardBody>
          <Row className="sideNavsRow">
            <Col className="sideNavs" md={3}>
              <FaHome size={"2rem"} />
            </Col>
            <Col className="sideNavs" md={9}>
              <h6 className={path === "/" ? "pathColor" : "Nocolor"}>
                <a
                  href={"/"}
                  className={
                    path === "/" ? "SideALink" : "SideALinkUnClick"
                  }
                >
                  Home
                </a>
              </h6>
            </Col>
          </Row>
          <Row className="sideNavsRow">
            <Col className="sideNavs" md={3}>
              <FaTools size={"2rem"} />
            </Col>
            <Col className="sideNavs2" md={9}>
              <h6 className={path === "/profile" ? "pathColor" : "Nocolor"}>
                <a
                  href={"/profile"}
                  className={
                    path === "/profile" ? "SideALink" : "SideALinkUnClick"
                  }
                >
                  Profile
                </a>
              </h6>
            </Col>
          </Row>
          <Row className="sideNavsRow">
            <Col className="sideNavs" md={3}>
              <FaDesktop size={"2rem"} />
            </Col>
            <Col className="sideNavs2" md={9}>
              <h6 className={path === "/myInquriy" || path === '/createInquriy' ? "pathColor" : "Nocolor"}>
                <a
                  href={"/myInquriy"}
                  className={
                    path === "/myInquriy" ? "SideALink" : "SideALinkUnClick"
                  }
                >
                  {decoded.userType === "admin"?'All Inquires':'My Inquires'}
                </a>
              </h6>
            </Col>
          </Row>
          <Row className="sideNavsRow">
            <Col className="sideNavs" md={3}>
              <FaLink size={"2rem"} />
            </Col>
            <Col className="sideNavs2" md={9}>
              <h6 className={path === "/dailyUpdate" ? "pathColor" : "Nocolor"}>
                <a
                  href={"/dailyUpdate"}
                  className={
                    path === "/dailyUpdate" ? "SideALink" : "SideALinkUnClick"
                  }
                >
                  Daily Updates
                </a>
              </h6>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default SidePanel;
