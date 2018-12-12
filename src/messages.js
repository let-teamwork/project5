import React, { Component } from 'react';
import FullScreenMessage from './FullScreenMessage'


class Messages extends Component {
    constructor(){
        super();
        this.state = {
            viewSingleMessage: false,
            selectedMessageKey: "",
            selectedMessageObject: {}
        }
    }

    viewMessage = (e) => {
        e.preventDefault();
        console.log(e.target.id);
        this.setState({
            // viewSingleMessage: true,
            selectedMessageKey: e.target.id
        }, () => {
            this.selectSingleMessage();
            this.props.selectMessageForReply(this.state.selectedMessageKey);
        })
    }   
    
    selectSingleMessage = () => {
        const selectedMessageArray = this.props.messages.filter((message) => {
            return (message.key === this.state.selectedMessageKey)
        });
        console.log("sma", selectedMessageArray);
        this.setState({
            selectedMessageObject: selectedMessageArray[0]
        }, () => {
            this.setState({
                viewSingleMessage: true 
            })
            console.log("yo", this.state.selectedMessageObject)
        });
    }
    
    

    render(){
        // console.log("key", this.props.messages[0].key)
        return (
            <div className="messages">
                <div className="messages__inbox">
                    {/* <div>
                        <button className="app__button">Home</button>
                    </div> */}
                    {this.props.messages.map((message) => {
                        return (
                            <button id={message.key} className="messages__preview" onClick={this.viewMessage} >
                                <div className="wrapper">
                                    <p className="messages__previewFrom" id={message.key} >{message.from}</p>
                                    <p className="messages__previewDate" id={message.key} >{message.displayDate}</p>                     
                                </div>
                            </button>
                        )
                    })}
                    {(this.state.viewSingleMessage) 
                    ? (
                        <FullScreenMessage 
                        message={this.state.selectedMessageObject}
                        replyToMessage={this.props.replyToMessage}
                        recieveRestaurantResult={this.props.recieveRestaurantResult}
                        userName={this.props.userName}
                        />
                    ) : (
                        ""
                    )   
                    }
                    </div>
            </div>
            )
            
        

    }

} 

export default Messages