import React, { useEffect, useState } from "react";
import { Row, Col, CardBody, Card, Input, Button } from "reactstrap";
import axios from "axios";
import jwt_decode from "jwt-decode";


const Issue = () => {
  const [issue, setissue] = useState({});

  let token = localStorage.usertoken;
  let decoded = jwt_decode(token);

  // console.log(issue);

  useEffect(() => {
    let token = localStorage.usertoken;
    let config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get("http://localhost:9090/issue/getIssue", config)
      .then((res) => {
        setissue(res.data[0])
      })
      .catch((err) => console.log(err));
  }, []);

  const statusBtnColor = () => {
    let status = issue.InquiryStatus;
    if (status === "Not Assigned") {
      return "danger";
    } else if (status === "Inprogress") {
      return "warning";
    } else if (status === "Closed") {
      return "warning";
    } else {
      return "success";
    }
  };

  return (
    <React.Fragment>
      {issue ? (
        <React.Fragment>
          <Row>
            <Col md={10}>
              <h5 className="recentUpdates">
                {decoded.userType === "admin"
                  ? "Recent Inquiry"
                  : "Your Recent Inquiry"}
              </h5>
            </Col>
          </Row>
          <br />
          <Card className="inquiryOutterCard">
            <CardBody>
              <Row>
                <Col md={8}>
                  <Card className="inquriyInnerCard">
                    <CardBody>
                      <Row>
                        <Col>
                          <Row>
                            <Col md={4}>Issue Type :</Col>
                            <Col md={8}>
                              <Input
                                type="text"
                                className="issueContent"
                                value={issue.issueType}
                                disabled
                              />
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col md={4}>Location :</Col>
                            <Col md={8}>
                              <Input
                                type="text"
                                className="issueContent"
                                value={issue.Location}
                                disabled
                              />
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col md={4}>Assigned to :</Col>
                            <Col md={8}>
                              <Input
                                type="text"
                                className="issueContent"
                                value={
                                  issue.taskAssignedTo
                                    ? "Assigned"
                                    : "Not Assigned"
                                }
                                disabled
                              />
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col md={4}>Reporting at :</Col>
                            <Col md={8}>
                              <Input
                                type="text"
                                className="issueContent"
                                value={issue.time}
                                disabled
                              />
                            </Col>
                          </Row>
                        </Col>
                        <Col>
                          <Row>
                            <Col md={4}>Description :</Col>
                            <Col md={8}>
                              <Input
                                type="textarea"
                                className="issueContent"
                                value={issue.description}
                                disabled
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col md={4}>
                  <Row>
                    <Col md={2}></Col>
                    <Col>
                      <Button className="statusBtn" color={statusBtnColor()}>
                        {issue.InquiryStatus === "Closed"
                          ? "Inprogress"
                          : issue.InquiryStatus}
                      </Button>
                    </Col>
                    <Col md={4}></Col>
                  </Row>
                  <br />
                  {issue.InquiryStatus === "Closed" && decoded.userType === "user" ? (
                    <Row className="closeIssueRasiedQuesRow">
                      <Col md={2}></Col>
                      <Col md={6}>
                        <div className="closeIssueDiv">
                          <p>Did Maintenance Team Complited this Inquiry </p>
                          <Row>
                            <Col md={4}></Col>
                            <Col md={8}>
                              <Button
                                className="confirmBtn"
                                value={issue._id}
                                onClick={(e) => {
                                  let token = localStorage.usertoken;
                                  let btnData = {
                                    id: e.target.value,
                                    InquiryStatus: "Completed",
                                  };
                                  let config = {
                                    headers: {
                                      Authorization: token,
                                    },
                                  };
                                  axios
                                    .put(
                                      "http://localhost:9090/issue/updateIssue",
                                      btnData,
                                      config
                                    )
                                    .then((res) => {
                                      console.log(res);
                                      window.location.reload(true);
                                    })
                                    .catch((err) => console.log(err));
                                }}
                              >
                                Confirm
                              </Button>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  ) : (
                    <></>
                  )}
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Row>
            <Col md={10}></Col>
            <Col md={2} className="AddInquiryBtnColom">
              {decoded.userType === "admin" ? null : (
                <Button className="addInquiryBtn" href={"/createInquriy"}>
                  Add Inquiry
                </Button>
              )}
            </Col>
          </Row>
        </React.Fragment>
      ) : (
        <div className="noIssueDiv">
          <Row>
            <Col md={4}></Col>
            <Col md={2} className="NoIssueColom">
              <p className="noIssueText">***No Issue Found***</p>
            </Col>
          </Row>
          <Row>
            <Col md={4}></Col>
            <Col md={2} className="AddInquiryBtnColom">
              {decoded.userType === "admin" ? null : (
                <Button className="addInquiryBtn" href={"/createInquriy"}>
                  Add Inquiry
                </Button>
              )}
            </Col>
          </Row>
        </div>
      )}
    </React.Fragment>
  );
};

export default Issue;
