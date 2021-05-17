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
    // Reveal the character if it was guessed correctly.
    guessedLetter = () => {
        return this.state.answer.split("")
            .map(letter => 
                this.state.guess.has(letter) ? letter : " _ "
            );
    }
    // Create a button for each letter of the English alphabet. Disable buttons which have had been clicked.
    generateKeyboard = () => {
        let alphabet = [...Array(26).keys()].map(i => String.fromCharCode(i + 97));
        console.log(alphabet);
        return alphabet.map(letter => 
            <button key={letter} value={letter}>{letter}</button>
        )
    }
    render() {
        const gameOver = this.state.mistakes >= this.props.maxMistakes;
        let keyboard = this.generateKeyboard();
        return(
            <div id="wrapper">
                <article id="hangman-container">
                    <h1 id="hangman-title">The Hangman</h1>
                    <p>Guess the word!</p>
                    <p>{gameOver ? `Correct word: ${this.state.answer}` : this.guessedLetter()}</p>
                    <p>{keyboard}</p>
                    {/* <p>{this.state.answer}</p> */}
                </article>
            </div>
        )
    }
}