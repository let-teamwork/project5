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
        // console.log(e.target.id);
        this.setState({
            // viewSingleMessage: true,
            selectedMessageKey: e.target.id
        }, () => {
            this.selectSingleMessage();
        })
    }   
    
    selectSingleMessage = () => {
        const selectedMessageArray = this.props.messages.filter((message) => {
            return (message.key === this.state.selectedMessageKey)
        });
        console.log(selectedMessageArray);
        this.setState({
            selectedMessageObject: selectedMessageArray[0]
        }, () => {
            this.setState({
                viewSingleMessage: true 
            })
            console.log(this.state.selectedMessageObject)
        });
    }
    
    

    render(){
        return (
            <div>
                {this.props.messages.map((message) => {
                    // console.log(message);
                    return (
                        <div key={message.key} className="message-preview">
                            <a id={message.key} onClick={this.viewMessage}>
                                <div>
                                    <p>{message.from}</p>
                                </div>
                                <div>
                                    <p>{message.displayDate}</p>
                                </div>
                            </a>
                        </div>
                    )
                })}
                {(this.state.viewSingleMessage) 
                ? (
                    <FullScreenMessage 
                    message={this.state.selectedMessageObject}
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