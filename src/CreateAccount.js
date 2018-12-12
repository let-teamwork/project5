import { Link, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import {
  faCoffee,
  faBicycle,
  faBus,
  faWalking,
  faWineGlassAlt,
  faCar,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';


class CreateAccount extends Component{

  constructor(){
    super()

  }
  componentDidMount(){
    // this.props.handleClickCreateAccount()
  }
  
  render(){
    if (this.props.toMain){
      return(
        <Redirect to='/Main' />
      )
    }
    return(
      <div className="createAccount">
        <header className="createAccount__header">
          <h2 className="createAccount__subtitle">Middl.</h2>
        </header>
        <div className="header__background">
          <div className="createAccount__background wrapper">
              <p className="createAccount__text">
               <span className="createAccount__span">{`Hey ${this.props.user.displayName}! `}</span>You're only a few steps away before finding a perfect destination for your date. This app will provide recommendations at the exact <strong>Middl</strong> point between you and your date! 
              </p>
            <main>
              <form onSubmit={this.props.handleSubmit}
                  className="createAccount__form"
              >
                  <label htmlFor="userNameForm" 
                    className="createAccount__label"
                    
                  >User name </label>
                <input 
                
                  className="app__input"
                  type="text"
                  id="userNameForm"
                  onChange={this.props.handleChange}
                  value={this.props.userNameForm}
                  placeholder = "ex. Elvis"
                />
                <label 
                  className = "createAccount__label"
                htmlFor="userLocationForm">Address
                   
                </label>
                
                <input
                  className="app__input"
                  type="text"
                  id="userLocationForm"
                  onChange={this.props.handleChange}
                  value={this.props.userLocationForm}
                  placeholder="ex. 123 Queen st w"
                />
                  <p className="createAccount__label">Mode of Transportation</p>
                        <div className="mainForm__inputLabel--displayFlex">
                            <div className="mainForm__inputLabel--column">
                                <label className={`app__radioLabel ${(this.props.userMOT === "walking") ? "activeLabel" : ""}`} htmlFor="walkUser"><FontAwesomeIcon className="app__font-awesome" icon={faWalking} /></label>
                                <input className="activeInput" name="userMOT" type="radio" value="walking" id="walkUser" onChange={this.props.handleMOTChange}/>
                            </div>

                            <div className="mainForm__inputLabel--column">
                                <label className={`app__radioLabel ${(this.props.userMOT === "bicycling") ? "activeLabel" : ""}`} htmlFor="bikeUser"> <FontAwesomeIcon className="app__font-awesome" icon={faBicycle} /></label>
                                <input className="activeInput" name="userMOT" type="radio" value="bicycling" id="bikeUser" onChange={this.props.handleMOTChange}/>
                            </div>
                            
                            <div className="mainForm__inputLabel--column">
                                <label className={`app__radioLabel ${(this.props.userMOT === "driving") ? "activeLabel" : ""}`} htmlFor="carUser"><FontAwesomeIcon className="app__font-awesome" icon={faCar} /></label>
                                <input className="activeInput" name="userMOT" type="radio" value="driving" id="carUser" onChange={this.props.handleMOTChange}/>
                            </div>
                            
                            <div className="mainForm__inputLabel--column">
                                <label className={`app__radioLabel ${(this.props.userMOT === "transit") ? "activeLabel" : ""}`} htmlFor="publicUser"><FontAwesomeIcon className="app__font-awesome" icon={faBus} /></label>
                                <input className="activeInput" name="userMOT" type="radio" value="transit" id="publicUser" onChange={this.props.handleMOTChange}/>
                            </div>
                        </div>
                <label htmlFor ="createAccount__submit" className="visuallyhidden"> submit address </label>
                  <input
                    className="createAccount__submit app__button"
                    type="submit"
                    value="Submit Address"
                  />
              </form>
            </main>
          </div>
        </div>
      </div>
    )
  }
}

export default CreateAccount;