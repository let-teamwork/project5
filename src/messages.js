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
            <div>
                {this.props.messages.map((message) => {
                    return (
                        <div id={message.key} className="message-preview" onClick={this.viewMessage} >
                            <p id={message.key} >{message.from}</p>
                            <p id={message.key} >{message.displayDate}</p>
                        </div>
                    )
                })}
                {(this.state.viewSingleMessage) 
                ? (
                    <FullScreenMessage 
                    message={this.state.selectedMessageObject}
                    replyToMessage={this.props.replyToMessage}
                    recieveRestaurantResult={this.props.recieveRestaurantResult}
                    />
                ) : (
                    ""
                )   
                }
            </div>
            )
            
        

    }

} 

export default Messages