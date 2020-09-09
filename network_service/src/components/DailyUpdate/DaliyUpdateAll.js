import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import TimeStamp from "react-timestamp";
import jwt_decode from "jwt-decode";
import { FaBellSlash } from "react-icons/fa";

const DaliyUpdateAll = () => {
  let token = localStorage.usertoken;
  let decoded = jwt_decode(token);

  const timees = new Date().toISOString().slice(0, 10);

  const [updateAll, setupdateAll] = useState([]);

  useEffect(() => {
    let token = localStorage.usertoken;
    let config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get("http://localhost:9090/dailyUpdate/viewNotification", config)
      .then((res) => {
        setupdateAll(res.data)
      }).catch((err) => console.error(err));
  }, []);

  const updates = () => {
    return updateAll.map((data, i) => {
      return (
        <Card className="innerCardAll">
          <CardBody>
            <p className="lastUpdate">"{data.notification}" - By <span className="dailyAdminName">
              {data.admin._id === decoded.id ? 'You' : `Mr.${data.admin.name}`}</span></p>
            <Row>
              <Col md={10}></Col>
              <Col md={2}>
                {console.log("dataTime", data.time.slice(0, 10))}
                {data.time.slice(0, 10) === timees ?
                  <TimeStamp relative date={data.time} autoUpdate /> :
                  <TimeStamp date={data.time} />}
              </Col>
            </Row>
          </CardBody>
        </Card>
      );
    });
  };

  return (
    <React.Fragment>
      <Row>
        <Col md={10}>
          <h5 className="recentUpdates">Daily Updates</h5>
        </Col>
        <Col md={2}>
          {decoded.userType === "admin" ? (
            <Button
              className="dailyUpdateCreateBtn"
              href={"/createDailyUpdate"}
            >
              Create Daily Update
            </Button>
          ) : null}
        </Col>
      </Row>
      {updateAll.length === 0 ? (
        <Card className="EmptyNotifiyCard">
          <CardBody>
            <FaBellSlash size="6rem" color={"#4dbb9f"} />
            <span className="NoNotificationText">No Daily Updates</span>
          </CardBody>
        </Card>
      ) : (
          updates()
        )}
    </React.Fragment>
  )
}


export default DaliyUpdateAll;
