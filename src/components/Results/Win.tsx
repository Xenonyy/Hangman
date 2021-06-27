import React, { ReactElement } from 'react';
import './Results.css';
import Img from './win.png';

export default function Win (): ReactElement {
    return(
        <div className="result-container">
            <img src={Img} alt="Win" className="result-image" />
            <p className="result">You've Won</p>
        </div>
    )
} 