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
    handleGuess = (e) => {
        let letter = e.target.value;
        this.setState({
            guess: this.state.guess.add(letter),
            mistakes: this.state.mistakes + (this.state.answer.includes(letter) ? 0 : 1)
        });
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
            <button key={letter} value={letter} onClick={this.handleGuess} disabled={this.state.guess.has(letter)}>{letter}</button>
        )
    }
    render() {
        // Calculate the outcome of the game and display the state accordingly.
        const correctAnswer = this.guessedLetter().join("") === this.state.answer;
        const gameOver = this.state.mistakes >= this.props.maxMistakes;

        let result = `It's a ${this.state.answer.length} letter word`;
        // "An" edge-case
        if (this.state.answer.length === 8) result = `It's an ${this.state.answer.length} letter word`;
        if (correctAnswer) result = "You've won";
        if (gameOver) result = "You've lost";
        

        return(
            <div id="wrapper">
                <article id="hangman-container">
                    <h1 id="hangman-title">The Hangman</h1>
                    <p>{result}</p>
                    {/* <p>{this.state.answer}</p> */}
                    <p>{gameOver ? `Correct word: ${this.state.answer}` : this.guessedLetter()}</p>
                    <p id="keyboard-text">Play with a word</p>
                    <p id = "keyboard">{this.generateKeyboard()}</p>
                </article>
            </div>
        )
    }
}