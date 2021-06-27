import React, { ReactElement } from 'react';
import './Results.css';
import Img from './lose.png';

export default function Lose (): ReactElement {
    return(
        <section className="result-container">
            <img src={Img} alt="Lose" className="result-image" />
            <p className="result" id="lose-text">You've Lost</p>
        </section>
    )
} 