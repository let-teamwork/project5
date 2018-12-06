import { Route, Link } from 'react-router-dom';
import React, { Component } from 'react';
import firebase from './firebase'
import axios from 'axios';

class Main extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div className="Main">
                <h2>Im the main</h2>
            </div>
        )
    }
}

export default Main