import React from 'react'
import useForm from '../../hooks/useForm';
import { Row, Col, CardBody, Card, Input, Button, Form } from "reactstrap";
import axios from 'axios';

const  CreateIssue = () => {

    const [ values, handleChange ] = useForm();

    const createIssueSubmit = (e) =>{
        e.preventDefault();
        console.log(values);
        let config = {
          headers: {
            Authorization: localStorage.usertoken
          }
        };
          axios.post('http://localhost:9090/issue/createIssue',values,config)
          .then(res=>{console.log(res);window.location.pathname = "/myInquriy"}).catch(err=>console.log(err))
      }

    return (
        <React.Fragment>
      <Row>
        <Col md={10}>
          <h5 className="recentUpdates">Create Inquiry</h5>
        </Col>
      </Row>
      <br />
      <Card className="profileCard">
        <CardBody>
        <Form onSubmit={createIssueSubmit}>
          <Row>
            <Col md={2}>
              <p className="profileLabel">Issue Type</p>
            </Col>
            <Col md={6}>
              <Input
                className="profileInputPanel"
                type="select"
                name="issueType"
                value={values.issueType}
                onChange={handleChange}
              >
                  <option>Choose One..</option>
                  <option value={"No Internet"}>No Internet</option>
                  <option value={"Slow Internet"}>Slow Internet</option>
                  <option value={"System Maintenance"}>System Maintenance</option>
              </Input>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={2}>
              <p className="profileLabel">Location</p>
            </Col>
            <Col md={6}>
              <Input
                className="profileInputPanel"
                type="select"
                name="Location"
                value={values.Location}
                onChange={handleChange}
              >   
                  <option>Choose One..</option>
                  <option value={"Lab-1"}>Lab-1</option>
                  <option value={"Lab-2"}>Lab-2</option>
                  <option value={"Lab-3"}>Lab-3</option>
              </Input>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={2}>
              <p className="profileLabel">Description</p>
            </Col>
            <Col md={6}>
              <Input
                className="profileInputPanel"
                type="textarea"
                name="description"
                value={values.description}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <br/>
          <Row>
            <Col md={2}></Col>
            <Col md={6}>
              <Button className="createIssueBtn">Create Inquiry</Button>
            </Col>
          </Row>
          </Form>
        </CardBody>
      </Card>
    </React.Fragment>
    )
}

export default CreateIssue
