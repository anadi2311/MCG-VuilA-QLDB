import React from "react";
import "./modal.css";
import PropTypes from "prop-types";

import axios from 'axios';

// reactstrap components
import { FormGroup, Form, Input,Container, Row, Col,Button } from "reactstrap";
import { withAuthenticator, AmplifySignOut} from '@aws-amplify/ui-react';
import { Auth } from "aws-amplify";
import NotificationMessage from "../Notification/NotificationMessage";



let user;
let jwtToken;

class InitiateShipmentDistributorModal extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
        Operation: "INITIATE_SHIPMENT_FOR_DISTRIBUTOR",
        PersonId: this.props.qldbPersonId,
        PurchaseOrderId: '',
        TransportType: '',
        CarrierCompanyId: '',

        notificationOpen: false,
        notificationType: "success",
        message: ""
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOnChange = event => {
    this.setState({ [event.target.name] : event.target.value });
  }



    showNotification(message, type){
        this.setState({
            message:message,
            notificationType:type
        })
        setTimeout(function(){
            this.setState({
                notificationOpen:true,
            })
        }.bind(this),5000);
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
    axios.post(`https://adpvovcpw8.execute-api.us-west-2.amazonaws.com/testMCG/mcgsupplychain`, { Operation: "INITIATE_SHIPMENT_FOR_DISTRIBUTOR",
    PersonId: this.props.qldbPersonId,
    PurchaseOrderId: this.state.PurchaseOrderId,
    TransportType: parseInt(this. state.TransportType),
    CarrierCompanyId: this.state.CarrierCompanyId
    
}
     )
      .then(res => {

        console.log(res);
        console.log(res.data);
        alert("INITIATE SHIPMENT FOR DISTRIBUTOR sucessfull")
        console.log("MCGRequestId",res.data.body);
        
        //this.setState({ qldbPersonId: res.data.body.PersonId });
        //this.props.LinkCognito_QLDBUser(this.state.qldbPersonId);
          this.showNotification("Initiated shipment for distributor", "success")

      })

      this.showNotification("Error! Cannot initiate shipment for distributor", "error")
  }
    
  render(){
      const{PersonId,PurchaseOrderId,TransportType,CarrierCompanyId} = this.state
      const formNotCompleted = PurchaseOrderId.length===0||TransportType.length===0||CarrierCompanyId.length===0

      const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
    return (
      <div className={showHideClassName}>
          <NotificationMessage notificationOpen={this.state.notificationOpen}
                               message={this.state.message} type={this.state.notificationType}/>
          <div className="modal-dialog modal-dialog-scrollable modal-lg" >
              <div className="modal-content">
                  <div className="modal-header">
                      <h2 className="modal-title" id="exampleModalLabel">INITIATE SHIPMENT FOR DISTRIBUTOR</h2>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.handleClose}>
                          <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
        <Form onSubmit={this.handleSubmit}>
          <Container>
            <Row>
            <Col>
          <FormGroup>
            <label
              className="form-control-label"
              htmlFor="PurchaseOrderId_id"
            >
              Purchase Order Id
            </label>
            <Input
              id="PurchaseOrderId_id"
              type="select"
              name="PurchaseOrderId"
              
              onChange={this.handleOnChange}              
            >
               <option value="0">-Select-</option>
              {this.props.purchaseOrderIds.map((result) => (<option value={result}>{result}</option>))}

              </Input>
          </FormGroup>


          <FormGroup>
            <label
              className="form-control-label"
              htmlFor="TransportType_id"
            >
              Transport Type
            </label>
            <Input
              id="TransportType_id"
              type="select"
              name="TransportType"
              onChange={this.handleOnChange}              
            >
              <option value="0">-Select-</option>
              <option value="1">Air</option>
              <option value="2">Ocean</option>
              <option value="3">Road</option>
             
              </Input>
          </FormGroup>


          <FormGroup>
            <label
              className="form-control-label"
              htmlFor="CarrierCompanyId_id"
            >
             Carrier CompanyId
            </label>
            <Input
              id="CarrierCompanyId_id"
              type="select"
              name="CarrierCompanyId"
              onChange={this.handleOnChange}
            >

              <option value="0">-Select-</option>
              {this.props.filterCarrierEntityData.map((result) => (<option value={result.id}>{result.text}</option>))}


              </Input>
          </FormGroup>

              </Col>          
            </Row>
          </Container>
            <div className={"modal-footer"}>
                <Row>
                    <Col className={"align-items-center"}>

                    <Button
                      className="float-right"
                      color="default"
                      
                      onClick={this.props.handleClose}
                      size="xl"
                    >
                      Close
                    </Button>
                    </Col>
                    <Col>
                    <Button className="btn-fill" color="primary" type="submit" disabled={formNotCompleted}>
                    Initiate Shipment Distributor
                  </Button>
                    </Col>

                </Row>
            </div>

        </Form>
          
        </div>
          </div>
      </div>
    );
  }
}

export default InitiateShipmentDistributorModal;