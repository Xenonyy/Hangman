import React from 'react';
import './Hangman.css'
import word from '../Words/Words';

export default class Hangman extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mistakes: 0,
            answer: word()
        }
    }
    render() {
        return(
            <div id="wrapper">
                <article id="hangman-container">
                    <h1 id="hangman-title">The Hangman</h1>
                    <p>{this.state.answer}</p>
                </article>
            </div>
        )
    }
}