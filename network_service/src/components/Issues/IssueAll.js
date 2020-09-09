import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, CardBody, Card, Input, Button } from "reactstrap";
import jwt_decode from "jwt-decode";
import { FaWhmcs } from "react-icons/fa";


const IssueAll = () => {
  let token = localStorage.usertoken;
  let decoded = jwt_decode(token);


  const [issueAll, setissueAll] = useState([]);

  useEffect(() => {
    let token = localStorage.usertoken;
    let config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get("http://localhost:9090/issue/getIssue", config)
      .then((res) => setissueAll(res.data))
      .catch((err) => console.log(err));
  }, []);

  const issueRender = () => {
    return issueAll.map((data, i) => {
      const statusBtnColor = () => {
        let status = data.InquiryStatus;
        if (status === "Not Assigned") {
          return "danger";
        } else if (status === "Inprogress") {
          return "warning";
        } else if (status === "Closed") {
          if (decoded.userType === "admin") {
            return "danger";
          } else {
            return "warning";
          }
        } else {
          return "success";
        }
      };

      return (
        <Card className="inquiryOutterCardAll" key={i}>
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
                              value={data.issueType}
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
                              value={data.Location}
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
                                data.taskAssignedTo
                                  ? `Mr.${data.taskAssignedTo.name}`
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
                              value={data.time}
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
                              value={data.description}
                              disabled
                            />
                          </Col>
                        </Row>
                        <br />
                        {decoded.userType === "admin" ? (
                          <Row>
                            <Col md={4}>Issue-By :</Col>
                            <Col md={8}>
                              <div className="issuby">
                                <p>Name&nbsp;:&nbsp;{data.user.name}</p>
                                <p>Email&nbsp;:&nbsp;{data.user.email}</p>
                                <p>Phone&nbsp;:&nbsp;{data.user.phoneNumber}</p>
                              </div>
                            </Col>
                          </Row>
                        ) : data.taskAssignedTo ? (
                          <Row>
                            <Col md={4}>Assigned-By :</Col>
                            <Col md={8}>
                              <div className="issuby">
                                <p>
                                  Name&nbsp;:&nbsp;{data.taskAssignedTo.name}
                                </p>
                                <p>
                                  Email&nbsp;:&nbsp;{data.taskAssignedTo.email}
                                </p>
                                <p>
                                  Phone&nbsp;:&nbsp;
                                  {data.taskAssignedTo.phoneNumber}
                                </p>
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
              </Col>
              <Col md={4}>
                <Row>
                  <Col md={2}></Col>
                  <Col>
                    <Button className="statusBtn" color={statusBtnColor()}>
                      {data.InquiryStatus === "Closed"
                        ? decoded.userType === "admin"
                          ? data.InquiryStatus
                          : "Inprogress"
                        : data.InquiryStatus}
                    </Button>
                  </Col>
                  <Col md={4}>
                    {data.taskAssignedTo ? (
                      data.taskAssignedTo._id === decoded.id ? (
                        data.InquiryStatus === "Completed" ||
                        data.InquiryStatus === "Closed" ? null : (
                          <Button
                            color={"danger"}
                            onClick={(e) => {
                              let token = localStorage.usertoken;
                              let btnData = {
                                id: e.target.value,
                                InquiryStatus: "Closed",
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
                            value={data._id}
                          >
                            Closed
                          </Button>
                        )
                      ) : null
                    ) : data.InquiryStatus === "Not Assigned" ? (
                      decoded.userType === "admin" ? (
                        <Button
                          color={"success"}
                          onClick={(e) => {
                            let token = localStorage.usertoken;
                            let btnData = {
                              id: e.target.value,
                              InquiryStatus: "Inprogress",
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
                          value={data._id}
                        >
                          Assign
                        </Button>
                      ) : null
                    ) : null}
                  </Col>
                </Row>
                <br />
                {data.InquiryStatus === "Closed" &&
                decoded.userType === "user" ?(
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
                              value={data._id}
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
      );
    });
  };

  return (
    <React.Fragment>
      <Row>
        <Col md={10}>
          <h5 className="recentUpdates">
            {decoded.userType === "admin" ? "All Inquires" : "My Inquires"}
          </h5>
        </Col>
        <Col md={2}>
          {decoded.userType === "user" ? (
            <Button className="addInquiryBtnAll" href={"/createInquriy"}>
              Add Inquiry
            </Button>
          ) : null}
        </Col>
      </Row>
      {issueAll.length === 0 ? (
        <Card className="EmptyIssueCard">
          <CardBody>
            <FaWhmcs size="6rem" color={"#4dbb9f"} />
            <span className="NoInquiryText">No Inquiry</span>
          </CardBody>
        </Card>
      ) : (
        issueRender()
      )}
    </React.Fragment>
  );
};

export default IssueAll;
