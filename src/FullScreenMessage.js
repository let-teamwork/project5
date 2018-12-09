import React, { Component } from 'react';

const FullScreenMessage = (props) => {
    return(
        <div className="fullScreenMessage">
            <div className="fullScreenMessage__header">
                <div className="fullScreenMessage__messageDate">
                    <p>{props.message.displayDate}</p>
                </div>
                <div className="fullScreenMessage__from">
                    <p>{props.message.from}</p>
                </div>
            </div>
            <div className="fullScreenMessage__messageBody">
                <div className="fullScreenMessage__messageBodyContents">
                    <p>{props.message.message}</p>
                </div> 
            </div>
            <div className="fullScreenMessage__reply">
                <form action="">
                    <label htmlFor="messageReply"></label>
                    <input type="text" id="messageReply"/>
                    <button>Send</button>
                </form>
            </div>
            


        </div>
    )






}

export default FullScreenMessage