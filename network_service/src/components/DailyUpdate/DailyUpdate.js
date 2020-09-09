import React, { useState, useEffect } from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import axios from "axios";
import TimeStamp from "react-timestamp";
import jwt_decode from "jwt-decode";

const DailyUpdate = () => {
  let token = localStorage.usertoken;
  let decoded = jwt_decode(token);


  const [daily, setdaily] = useState([]);


  useEffect(() => {
    let token = localStorage.usertoken;
    let config = {
      headers: {
        Authorization: token,
      },
    };
    axios.get("http://localhost:9090/dailyUpdate/viewNotification", config)
      .then((res) => setdaily(res.data[0]))
      .catch((err) => console.error(err));
  }, [daily.time]);

  const todayTime = new Date().toISOString().slice(0, 10);
  const today = String(daily.time);
  const docTime = today.slice(0, 10);


  return (
    <React.Fragment>
      {daily ? (
        <React.Fragment>
          <Row>
            <Col md={10}>
              <h5 className="recentUpdates">Recent Daily Updates</h5>
            </Col>
            <Col md={2}>
              <p className="viewAllupdate">
                <a href="/dailyUpdate" className="viewAllLink">
                  View All >>
                </a>
              </p>
            </Col>
          </Row>
          <br />
          <Card className="innerCard">
            <CardBody>
              <p className="lastUpdate">"{daily.notification}"</p>
              <Row>
                <Col md={10}></Col>
                <Col md={2}>
                  {todayTime === docTime ?
                    <TimeStamp relative date={daily.time} autoUpdate /> :
                    <TimeStamp date={daily.time} />}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </React.Fragment>
      ) : (
          <Row>
            <Col lg={12} className="welcomePanel">
              <h5 className="welcomeText">Hello!&nbsp;{decoded.name}</h5>
              <p className="welcomeText2"><span className="websiteName">N</span>etwork{" "}
                <span className="websiteName">A</span>nd{" "}
                <span className="websiteName">M</span>aintenance</p>
              <hr />
            </Col>
          </Row>
        )}
    </React.Fragment>
  );
};

export default DailyUpdate;
