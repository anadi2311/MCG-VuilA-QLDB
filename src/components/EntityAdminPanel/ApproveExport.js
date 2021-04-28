import React, { Component } from 'react';
import "./ApprovalTable.css";
import axios from 'axios';
import ViewContainerModal from './ViewContainerModal';
import NotificationMessage from "../Notification/NotificationMessage";



class ApproveExport extends Component {

    constructor(props){
        super(props);
        this.state = {
          showContainer: false,
          container:[],
          notificationOpen: false,
          notificationType: "success",
          message: ""
         
        }
        this.showContainerModal = this.showContainerModal.bind(this);
        this.hideContainerModal = this.hideContainerModal.bind(this);

    }
    showContainerModal = () => {
        this.setState({ showContainer: true });
      };

      hideContainerModal = () => {
        this.setState({ showContainer: false });
      };

      showNotification(message, type){
        this.setState({
            message:message,
            notificationType:type
        })
        setTimeout(function(){
            this.setState({
                notificationOpen:true,
            })
        }.bind(this),2000);
    }


     renderHeader = () => {
        let headerElement = ['PurchaseOrderIds', 'Container', 'Operation']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    viewContainers = (purchaseOrderId) => {
        axios.post(`https://adpvovcpw8.execute-api.us-west-2.amazonaws.com/testMCG/mcgsupplychain`, { Operation: "GET_PURCHASE_ORDER",
  
        PersonId: localStorage.getItem("qldbPersonId"),
        PurchaseOrderId: purchaseOrderId
      
      } ,
        {
          headers: {
            //'Authorization': jwtToken
          }})
        .then(res => {
            console.log(res);
            console.log(res.data);
            console.log(res.data.body);
            if(res.data.statusCode == 200){
                console.log(res.data.body);
                this.setState({container: res.data.body.HighestPackagingLevelIds})
            this.showContainerModal()
            }
            else{
             this.showNotification("Sorry! No Container available", "error")

              console.log("No container available")
            }
        })
      
    }


     
     renderBody = () => {
        if (this.props.purchaseOrderIds.length >0){
         const filterEntity = this.props.purchaseOrderIds//.filter(request => request.isAccepted == false)//.filter(entity => entity.ScEntityTypeCode != 1 )
       
            return (
                <tr key={filterEntity[0]}>
                    <td>{filterEntity[0]}</td>
                    <td> <button className='buttonInvoice' onClick={this.viewContainers.bind(this,filterEntity[0])}>Container</button></td>
                    <ViewContainerModal show={this.state.showContainer} handleClose={this.hideContainerModal} container={this.state.container}>
          <p>View Invoice Modal</p>
        </ ViewContainerModal>
                    <td className='operation'>
                        <button className='buttonApproval' onClick={this.props.approveExport.bind(this, filterEntity[0])}>Approve</button>
                        <button className='buttonDeny' onClick={this.props.denyExport.bind(this, filterEntity[0])}>Deny</button>
                    </td>
                </tr>
            )
        }
        else{
            return(<tr><td>No Approve Export </td></tr>)
        }
        
    }



     render(){
        return (
            <>
             <NotificationMessage notificationOpen={this.state.notificationOpen}
                               message={this.state.message} type={this.state.notificationType}/>
                <h1 id='title'>Approval Export Table</h1>
                <table id='employee'>
                    <thead>
                        <tr>{this.renderHeader()}</tr>
                    </thead>
                    <tbody>
                        {this.renderBody()}
                    </tbody>
                </table>
            </>
        )
    }
}

export default ApproveExport
