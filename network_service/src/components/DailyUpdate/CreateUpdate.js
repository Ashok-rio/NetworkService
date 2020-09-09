import React from 'react'
import { Row, Col, CardBody, Card, Input, Button, Form } from "reactstrap";
import axios from 'axios';
import useForm from '../../hooks/useForm';

const CreateUpdate = () => {

    const [ values, handleChange ] = useForm();

    const createDailyUpdateSubmit = (e) =>{
        e.preventDefault();
        console.log(values);
        let config = {
          headers: {
            Authorization: localStorage.usertoken
          }
        };
          axios.post('http://localhost:9090/dailyUpdate/createDailyUpdate',values,config)
          .then(res=>{console.log(res);window.location.pathname = "/"}).catch(err=>console.log(err))
      }


    return (
        <React.Fragment>
        <Row>
          <Col md={10}>
            <h5 className="recentUpdates">Create Daily Update</h5>
          </Col>
        </Row>
        <br />
        <Card className="dailyUpdateCard">
          <CardBody>
          <Form onSubmit={createDailyUpdateSubmit}>
            <Row>
              <Col md={2}>
                <p className="UpdateLabel">Department</p>
              </Col>
              <Col md={8}>
                <Input
                  className="updateInputPanel"
                  type="select"
                  name="department"
                  value={values.department}
                  onChange={handleChange}
                >  
                  <option>Choose One...</option> 
                  <option value={'All'}>ALL</option>
                  <option value={"Bca"}>Bca</option>
                  <option value={"Bsc-it"}>Bsc-it</option>
                  <option value={"Bsc-cs"}>Bsc-cs</option>
                  <option value={"Mca"}>Mca</option>
                  <option value={"Msc-it"}>Msc-it</option>
                  <option value={"Msc-cs"}>Msc-cs</option>
                </Input>
              </Col>
            </Row>
            <br />
            <Row>
              <Col md={2}>
                <p className="UpdateLabel">Notification</p>
              </Col>
              <Col md={8}>
                <Input
                  className="updateInputPanel"
                  type="textarea"
                  name="notification"
                  value={values.notification}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <br/>
            <Row>
              <Col md={2}></Col>
              <Col md={6}>
                <Button className="createupdateBtn">Create Daily Update</Button>
              </Col>
            </Row>
            </Form>
          </CardBody>
        </Card>
      </React.Fragment>
    )
}

export default CreateUpdate
