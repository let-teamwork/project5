import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


class FullScreenMessage extends Component {
    constructor() {
        super();
        this.state = {
            messageReply: "",
        }
    }



    handleReplySubmit = (e) => {
        e.preventDefault();
        this.props.replyToMessage(this.props.message.from, this.props.message.sendingUID, this.state.messageReply)
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render(){
<<<<<<< HEAD
        return(
=======
        console.log("my resto", this.props.message.restaurantSuggestion.restaurantName)
        if(this.props.showFindInvite === true){
            return ( < Redirect to = '/FindInvite' / > )
        }else{
        return (
>>>>>>> bd7731c86468e8c7f830b7f621998a7bd4abf7e8
            <div className="fullScreenMessage">
                <div className="fullScreenMessage__messageBody">
                    {
                    this.props.message.message.map((oneMessage) => {
                        return(
                            <div className={oneMessage[2] === this.props.userName ? "fullScreenMessage__message fullScreenMessage__message--sent" : "fullScreenMessage__message fullScreenMessage__message--received"} >
                                <p className={oneMessage[2] === this.props.userName ? "fullScreenMessage__messageContent fullScreenMessage__messageContent--sent" : "fullScreenMessage__messageContent fullScreenMessage__messageContent--received"} >{oneMessage[0]}</p>
                            </div>
                        )
                    })
                    }
                </div>
                {this.props.message.restaurantSuggestion ? 
                <div>
                    <button onClick={()=>{this.props.recieveRestaurantResult(
                        this.props.message.restaurantSuggestion.restaurantName,
                        this.props.message.restaurantSuggestion.restaurantCoordinates,
                        this.props.message.restaurantSuggestion.restaurantPhone,
                        this.props.message.restaurantSuggestion.restaurantImage,
                        this.props.message.restaurantSuggestion.restaurantID
                    )}}>See your date invite!</button>
                </div>: ""}
                <div className="fullScreenMessage__reply">
                    <form onSubmit={this.handleReplySubmit} action="">
                        <label htmlFor="messageReply"></label>
                        <input onChange={this.handleChange} type="text" id="messageReply"/>
                        <button>Send</button>
                    </form>
                </div>
            </div>
        )
        }

    }
}

export default FullScreenMessage