import React from "react";
import "./modal.css";
import PropTypes from "prop-types";

import axios from 'axios';

// reactstrap components
import { FormGroup, Form, Input,Container, Row, Col,Button } from "reactstrap";
import { withAuthenticator, AmplifySignOut} from '@aws-amplify/ui-react';
import { Auth } from "aws-amplify"; 



let user;
let jwtToken;

class ConnectUserModal extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
        Operation: "REGISTER_NEW_USER_AND_SCENTITY",
        EmployeeId: '',
        FirstName: '',
        LastName: '',
        isSuperAdmin: false,
        isAdmin: false,
        Email: this.props.userEmail,
        Phone: this.props.userPhone,
        Address: '',

        ScEntityName: '',
        ScEntityContact_Email: '',
        ScEntityContact_Address:'',
        ScEntityContact_Phone: '',

        isApprovedBySuperAdmin: true,
        ScEntityTypeCode: "2",
        PersonIds:[],
        JoiningRequests:[],
        PickUpRequests:[],
        ScEntityIdentificationCode: '',
        ScEntityIdentificationCodeType: '',
        qldbPersonId: ''
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmployeeIdChange = this.handleEmployeeIdChange.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);


    this.handleScEntityNameChange = this.handleScEntityNameChange.bind(this);
    this.handleScEntityContact_EmailChange = this.handleScEntityContact_EmailChange.bind(this);
    this.handleScEntityContact_AddressChange = this.handleScEntityContact_AddressChange.bind(this);
    this.handleScEntityContact_PhoneChange = this.handleScEntityContact_PhoneChange.bind(this);
    this.handleScEntityTypeCodeChange = this.handleScEntityTypeCodeChange.bind(this);
    this.handleScEntityIdentificationCodeChange = this.handleScEntityIdentificationCodeChange.bind(this);
    this.handleScEntityIdentificationCodeTypeChange = this.handleScEntityIdentificationCodeTypeChange.bind(this);


  }

  handleEmployeeIdChange = event => {
    this.setState({ EmployeeId: event.target.value });
  }


  handleFirstNameChange = event => {
    this.setState({ FirstName: event.target.value });
  }
  handleLastNameChange = event => {
    this.setState({ LastName: event.target.value });
  }
  handleEmailChange = event => {
    this.setState({ Email: event.target.value });
  }
  handlePhoneChange = event => {
    this.setState({ Phone: event.target.value });
  }
  handleAddressChange = event => {
    this.setState({ Address: event.target.value });
  }




  handleScEntityNameChange = event => {
    this.setState({ ScEntityName: event.target.value });
  }
  handleScEntityContact_EmailChange = event => {
    this.setState({ ScEntityContact_Email: event.target.value });
  }
  handleScEntityContact_AddressChange = event => {
    this.setState({ ScEntityContact_Address: event.target.value });
  }
  handleScEntityContact_PhoneChange = event => {
    this.setState({ ScEntityContact_Phone: event.target.value });
  }
  handleScEntityTypeCodeChange = event => {
    this.setState({ ScEntityTypeCode: event.target.value });
  }
  handleScEntityIdentificationCodeChange = event => {
    this.setState({ ScEntityIdentificationCode: event.target.value });
  }
  handleScEntityIdentificationCodeTypeChange = event => {
    this.setState({ ScEntityIdentificationCodeType: event.target.value });
  }
 




  

  //handleIsCompanyRegisteredChange = event => {
  //  this.setState({ isCompanyRegistered: event.target.value });
  //}
  async componentDidMount(){
    console.log("Loading Auth token")
    user = await Auth.currentAuthenticatedUser();
     jwtToken = user.signInUserSession.idToken.jwtToken; 
     //this.setState({Email: user.attributes.email});
     //console.log(user.attributes.email);
     console.log(user)   
  }

  handleSubmit = event => {
    event.preventDefault();

    /*
    const company = {
    Operation: "POST",
    Comp_ID: this.state.Comp_ID,
    companyType: this.state.companyType,
    companyName: this.state.companyName,
    companyIC: this .state.companyIC,
    isCompanyRegistered: false
    };
    */

    /*
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");
    */
    axios.post(`https://adpvovcpw8.execute-api.us-west-2.amazonaws.com/testMCG/mcgsupplychain`, { Operation: "REGISTER_NEW_USER_AND_SCENTITY",
    Person:{
      EmployeeId: this.state.EmployeeId,
      FirstName: this.state.FirstName,
      LastName: this.state.LastName,
      isSuperAdmin: this.state.isSuperAdmin,

      PersonContact:{
        Email: this.state.Email,
        Phone: this.state.Phone,
        Address: this.state.Address
      }

    },
    ScEntity:{
      ScEntityName: this.state.ScEntityName,
      ScEntityContact:{
        Email: this.state.ScEntityContact_Email,
        Address: this.state.ScEntityContact_Address,
        Phone: this.state.ScEntityContact_Phone
      },
      isApprovedBySuperAdmin: this.state.isApprovedBySuperAdmin,
      ScEntityTypeCode: this.state.ScEntityTypeCode,
      PersonIds: this.state.PersonIds,
      JoiningRequests: this.state.JoiningRequests,
      PickUpRequests: this.state.PickUpRequests,
      ScEntityIdentificationCode: this.state.ScEntityIdentificationCode,
      ScEntityIdentificationCodeType: this.state.ScEntityIdentificationCodeType
    }
  }
     )
      .then(res => {

        console.log(res);
        console.log(res.data);
        alert("User Created in ledger")
        console.log("QLDBUser ID",res.data.body.PersonId);
        this.setState({ qldbPersonId: res.data.body.PersonId });
        this.props.LinkCognito_QLDBUser(this.state.qldbPersonId);

      })
  }
    
  render(){
    const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
        <Form onSubmit={this.handleSubmit}>
          <Container>
            <Row>
              <Col>
              <h2>Register User and Entity</h2>
              <FormGroup>
            <label
              className="form-control-label"
              htmlFor="EmployeeId_id"
            >
              Employee Id
            </label>
            <Input
              id="EmployeeId_id"
              type="text"
              name="EmployeeId"
              onChange={this.handleEmployeeIdChange}              
            />
          </FormGroup>
          <FormGroup>
            <label
              className="form-control-label"
              htmlFor="FirstName_id"
            >
              First Name
            </label>
            <Input
              id="FirstName_id"
              type="text"
              name="FirstName"
              onChange={this.handleFirstNameChange}              
            />
          </FormGroup>
          <FormGroup>
            <label
              className="form-control-label"
              htmlFor="LastName_id"
            >
              Last Name
            </label>
            <Input
              id="LastName_id"
              type="text"
              name="LastName"
              onChange={this.handleLastNameChange}              
            />
          </FormGroup>
          <FormGroup>
            <label
              className="form-control-label"
              htmlFor="Email_id"
            >
              Email
            </label>
            <Input
              id="Email_id"
              type="text"
              name="Email"
              value={this.props.userEmail}
              onChange={this.handleEmailChange}              
            />
          </FormGroup>
          <FormGroup>
            <label
              className="form-control-label"
              htmlFor="Phone_id"
            >
              Phone
            </label>
            <Input
              id="Phone_id"
              type="text"
              name="Phone"
              value={this.props.userPhone}
              onChange={this.handlePhoneChange}              
            />
          </FormGroup>

          <FormGroup>
            <label
              className="form-control-label"
              htmlFor="Address_id"
            >
              Address
            </label>
            <Input
              id="Address_id"
              type="text"
              name="Address"
              onChange={this.handleAddressChange}              
            />
          </FormGroup>




          
              </Col>




              <Col>
              <FormGroup>
            <label
              className="form-control-label"
              htmlFor="ScEntityName_id"
            >
              Entity Name
            </label>
            <Input
              id="ScEntityName_id"
              type="text"
              name="ScEntityName"
              onChange={this.handleScEntityNameChange}              
            />
          </FormGroup>

          
          <FormGroup>
            <label
              className="form-control-label"
              htmlFor="ScEntityContact_Email_id"
            >
              Entity Email
            </label>
            <Input
              id="ScEntityContact_Email_id"
              type="text"
              name="ScEntityContact_Email"
              onChange={this.handleScEntityContact_EmailChange}              
            />
          </FormGroup>

          <FormGroup>
            <label
              className="form-control-label"
              htmlFor="ScEntityContact_Address_id"
            >
              Entity Address
            </label>
            <Input
              id="ScEntityContact_Address_id"
              type="text"
              name="ScEntityContact_Address"
              onChange={this.handleScEntityContact_AddressChange}              
            />
          </FormGroup>

          
          <FormGroup>
            <label
              className="form-control-label"
              htmlFor="ScEntityContact_Phone_id"
            >
              Entity Phone
            </label>
            <Input
              id="ScEntityContact_Phone_id"
              type="text"
              name="ScEntityContact_Phone"
              onChange={this.handleScEntityContact_PhoneChange}              
            />
          </FormGroup>

          <FormGroup>
            <label
              className="form-control-label"
              htmlFor="ScEntityTypeCode_id"
            >
              Entity Type Code
            </label>
            <Input
              id="ScEntityTypeCode_id"
              type="text"
              name="ScEntityTypeCode"
              onChange={this.handleScEntityTypeCodeChange}              
            />
          </FormGroup>


          <FormGroup>
            <label
              className="form-control-label"
              htmlFor="ScEntityIdentificationCode_id"
            >
              Entity Identification Code
            </label>
            <Input
              id="ScEntityIdentificationCode_id"
              type="text"
              name="ScEntityIdentificationCode"
              onChange={this.handleScEntityIdentificationCodeChange}              
            />
          </FormGroup>

          <FormGroup>
            <label
              className="form-control-label"
              htmlFor="ScEntityIdentificationCodeType_id"
            >
              Entity Identification Code Type
            </label>
            <Input
              id="ScEntityIdentificationCodeType_id"
              type="text"
              name="ScEntityIdentificationCodeType"
              onChange={this.handleScEntityIdentificationCodeTypeChange}              
            />
          </FormGroup>

              </Col>
            </Row>
          </Container>
        
          
          {/*
          <FormGroup>
            <label
              className="form-control-label"
              htmlFor="example-search-input"
            >
              Search
            </label>
            <Input
              defaultValue="Tell me your secret ..."
              id="example-search-input"
              type="search"
            />
          </FormGroup>
          <FormGroup>
            <label
              className="form-control-label"
              htmlFor="example-email-input"
            >
              Email
            </label>
            <Input
              defaultValue="argon@example.com"
              id="example-email-input"
              type="email"
            />
          </FormGroup>
          <FormGroup>
            <label className="form-control-label" htmlFor="example-url-input">
              URL
            </label>
            <Input
              defaultValue="https://www.creative-tim.com"
              id="example-url-input"
              type="url"
            />
          </FormGroup>
          <FormGroup>
            <label className="form-control-label" htmlFor="example-tel-input">
              Phone
            </label>
            <Input
              defaultValue="40-(770)-888-444"
              id="example-tel-input"
              type="tel"
            />
          </FormGroup>
          <FormGroup>
            <label
              className="form-control-label"
              htmlFor="example-password-input"
            >
              Password
            </label>
            <Input
              defaultValue="password"
              id="example-password-input"
              type="password"
            />
          </FormGroup>
          <FormGroup>
            <label
              className="form-control-label"
              htmlFor="example-number-input"
            >
              Number
            </label>
            <Input
              defaultValue="23"
              id="example-number-input"
              type="number"
            />
          </FormGroup>
          <FormGroup>
            <label
              className="form-control-label"
              htmlFor="example-datetime-local-input"
            >
              Datetime
            </label>
            <Input
              defaultValue="2018-11-23T10:30:00"
              id="example-datetime-local-input"
              type="datetime-local"
            />
          </FormGroup>
          <FormGroup>
            <label
              className="form-control-label"
              htmlFor="example-date-input"
            >
              Date
            </label>
            <Input
              defaultValue="2018-11-23"
              id="example-date-input"
              type="date"
            />
          </FormGroup>
          <FormGroup>
            <label
              className="form-control-label"
              htmlFor="example-month-input"
            >
              Month
            </label>
            <Input
              defaultValue="2018-11"
              id="example-month-input"
              type="month"
            />
          </FormGroup>
          <FormGroup>
            <label
              className="form-control-label"
              htmlFor="example-week-input"
            >
              Week
            </label>
            <Input
              defaultValue="2018-W23"
              id="example-week-input"
              type="week"
            />
          </FormGroup>
          <FormGroup>
            <label
              className="form-control-label"
              htmlFor="example-time-input"
            >
              Time
            </label>
            <Input
              defaultValue="10:30:00"
              id="example-time-input"
              type="time"
            />
          </FormGroup>
          <FormGroup>
            <label
              className="form-control-label"
              htmlFor="example-color-input"
            >
              Color
            </label>
            <Input
              defaultValue="#5e72e4"
              id="example-color-input"
              type="color"
            />
          </FormGroup>
          */}
          <Button
                      className="float-right"
                      color="default"
                      
                      onClick={this.props.handleClose}
                      size="xl"
                    >
                      Close
                    </Button>
                    <br></br>
                    <Button className="btn-fill" color="primary" type="submit">
                    Connect User
                  </Button>
                  
        </Form>
          
        </section>
      </div>
    );
  }
}

export default ConnectUserModal;