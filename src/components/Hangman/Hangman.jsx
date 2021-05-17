import React from 'react';
import './Hangman.css'
import word from '../Words/Words';

export default class Hangman extends React.Component {
    static defaultProps = {
        maxMistakes: 6
    }
    constructor(props) {
        super(props);
        this.state = {
            mistakes: 0,
            answer: word(),
            guess: new Set([])
        }
    }
    guessedLetter = () => {
        this.state.answer.split("")
        .map(letter => 
            this.state.guess.has(letter) ? letter : " _ "
        );
    }
    render() {
        const gameOver = this.state.mistakes >= this.props.maxMistakes;
        return(
            <div id="wrapper">
                <article id="hangman-container">
                    <h1 id="hangman-title">The Hangman</h1>
                    <p>Guess the word!</p>
                    <p>{gameOver ? `Correct word: ${this.state.answer}` : this.guessedLetter()}</p>
                    {/* <p>{this.state.answer}</p> */}
                </article>
            </div>
        )
    }
}