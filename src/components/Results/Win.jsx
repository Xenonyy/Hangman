import React from 'react';
import './Results.css';
import Img from './win.png';

export default class Win extends React.Component {
    render() {
        return(
            <div className="result-container">
                <img src={Img} alt="Win" className="result-image" />
                <p className="result">You've Won</p>
            </div>
        )
    }
} 