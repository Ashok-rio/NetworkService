import React from "react";
import Header from "../Header/Header";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import SidePanel from "../SidePanel/SidePanel";
import DailyUpdate from "../DailyUpdate/DailyUpdate";
import DailyUpdateAll from "../DailyUpdate/DaliyUpdateAll";
import Issue from "../Issues/Issue";
import IssueAll from "../Issues/IssueAll";
import Profile from "../Profile/Profile";
import CreateIssue from "../Issues/CreateIssue";
import CreateUpdate from "../DailyUpdate/CreateUpdate";

const Render = () => {
    const path = window.location.pathname;

    const dailyUpdate = () =>{
      if(path === '/'){
        return <DailyUpdate/>
      }else if(path === '/dailyUpdate'){
        return <DailyUpdateAll />
      }else if(path === '/createDailyUpdate'){
        return <CreateUpdate />
      }else{
        return <></>
      }
    }

    const issue = () =>{
      if(path === '/'){
        return <Issue />
      }else if(path === '/myInquriy'){
        return <IssueAll />
      }else if(path === '/createInquriy'){
        return <CreateIssue />
      }
      else{
        return <></>
      }
    }

    const profile = () =>{
      if(path === '/profile'){
        return <Profile/>
      }else return <></>
    }

  return (
    <div className="renderComponents">
      <Header />
      <Container fluid={true}>
        <Row>
          <Col lg={2}>
            <SidePanel />
          </Col>
          <Col lg={10}>
            <Card className="renderCard">
              <CardBody>
                {profile()}
                {dailyUpdate()}
                <br/>
                {issue()}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Render;
