import React from "react";
import "../../assets/css/modal.css";

import axios from 'axios';

// reactstrap components
import {Button, Col, Container, Form, FormGroup, Input, Row} from "reactstrap";
import {Auth} from "aws-amplify";
import NotificationMessage from "../Notification/NotificationMessage";


let user;
let jwtToken;

class LinkIOTModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Operation: "INITIATE_SHIPMENT_FOR_DISTRIBUTOR",
            PersonId: this.props.qldbPersonId,
            IOTId: '',
            ContainerId:"",
            notificationOpen: false,
            notificationType: "success",
            message: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }





    handleOnChangeSelect = event => {
        this.setState({ [event.target.name] : event.target.value });
        console.log(event.target.name, event.target.value)
    }
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
        axios.post(process.env.REACT_APP_API_URL, {
                Operation: "ASSIGN_IOT",
                PersonId: this.props.qldbPersonId,
                IotId: this.state.IotId,
                ContainerId: this.state.ContainerId
            }
        )
            .then(res => {
                console.log(res.data.statusCode)
                if(res.data.statusCode===200){
                    this.showNotification("IOT device linked", "success")
                }else{
                    this.showNotification("Error: "+ res.data.body,"error")
                }
            })
            .catch((error) => {
                this.showNotification("Error: "+JSON.stringify(error.message),"error")
            })

    }
    showNotification(message, type){
        this.setState({
            message:message,
            notificationType:type,
            notificationOpen:true,
        })
        setTimeout(function(){
            this.setState({
                notificationOpen:false,
            })
        }.bind(this),7000);
    }


    render(){
        const{IOTId, ContainerId} = this.state
        const formNotCompleted = IOTId.length===0 || ContainerId.length===0

        const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
        return (
            <div className={showHideClassName}>
                <NotificationMessage notificationOpen={this.state.notificationOpen}
                                     message={this.state.message} type={this.state.notificationType}/>
                <div className="modal-dialog modal-dialog-scrollable modal-lg" >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title" id="exampleModalLabel">Link IOT with Container</h2>
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
                                                htmlFor="IOTId"
                                            >
                                                Select IOT Device
                                            </label>
                                            <Input
                                                id="IOTId"
                                                type="select"
                                                name="IOTId"
                                                onChange={this.handleOnChangeSelect}
                                            >
                                                <option value={1}>-select-</option>
                                                {this.props.containers ? this.props.containers.map((result) => (<option value={result.id}>{result.name}</option>)) : null}
                                                {/*{this.props.filterProductData.map((result) => (<option value={result.id}>{result.text}</option>))}*/}
                                            </Input>
                                        </FormGroup>

                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="ContainerId_id"
                                            >
                                                Select Container
                                            </label>
                                            <Input
                                                id="ContainerId_id"
                                                type="select"
                                                name="ContainerId"
                                                onChange={this.handleOnChangeSelect}
                                            >
                                                <option value={1}>-select-</option>
                                                {this.props.containers ? this.props.containers.map((result) => (<option value={result.id}>{result.name}</option>)) : null}
                                                {/*{this.props.filterProductData.map((result) => (<option value={result.id}>{result.text}</option>))}*/}


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
                                            Link IOT Device To Container
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

export default LinkIOTModal;