import React from 'react';
import './Hangman.css'
import word from '../Words/Words';
import arrow from '../Images/right-arrow.png';
import Header from '../Header/Header';
import Win from '../Results/Win';
import Lose from '../Results/Lose';

import { ReactComponent as State0 } from '../Images/0.svg';
import { ReactComponent as State1 } from '../Images/1.svg';
import { ReactComponent as State2 } from '../Images/2.svg';
import { ReactComponent as State3 } from '../Images/3.svg';
import { ReactComponent as State4 } from '../Images/4.svg';
import { ReactComponent as State5 } from '../Images/5.svg';
import { ReactComponent as State6 } from '../Images/6.svg';
import { ReactComponent as CompleteHangman } from '../Images/CompleteHangman.svg';

export default class Hangman extends React.Component {
    static defaultProps = {
        maxMistakes: 6
    }
    constructor(props) {
        super(props);
        this.state = {
            mistakes: 0,
            answer: word.getRandom(),
            guess: new Set([])
        }
    }
    // Handle the correctness of the guess and update state accordingly.
    handleGuess = (e) => {
        let letter = e.target.value;
        this.setState({
            guess: this.state.guess.add(letter),
            mistakes: this.state.mistakes + (this.state.answer.includes(letter) ? 0 : 1)
        });
    }
    // Reveal the character if it was guessed correctly.
    guessedLetter = () => this.state.answer.split("").map(letter => this.state.guess.has(letter) ? letter : " _ ");

    // Create a button for each letter of the English alphabet. Disable buttons which have had been clicked.
    generateKeyboard = () => {
        let alphabet = [...Array(26).keys()].map(i => String.fromCharCode(i + 97));
        // console.log(alphabet);
        return alphabet.map(letter => 
            <button 
            key={letter} 
            value={letter} 
            onClick={this.handleGuess} 
            disabled={this.state.guess.has(letter)}
            >{letter}</button>
        )
    }

    // Reset the game and go back to the starting page.
    endGame = () => {
        this.setState({
            mistakes: 0,
            guess: new Set([]),
            answer: word.getRandom()
        })
        document.querySelector("#hangman-game").classList.add("hide");
        document.querySelector("#hangman-newgame").classList.remove("hide");
    }

    // Reset the game with a random word.
    resetGame = () => {
        this.setState({
            mistakes: 0,
            guess: new Set([]),
            answer: word.getRandom()
        })
    }
    // Make the user able to select the length of the word and update state.
    handleWordLength = (e) => {
        let length = e.target.value;
        console.log(length, this.state.answer.length)
        let correctLength = [];
        // console.log(word.getFullArr)
        // Will throw an error with strict equal!
        word.getFullArr.map(word => word.length == length ? correctLength.push(word) : word); // eslint-disable-line
        console.log(correctLength)
        // console.log(findLength, correctLength)
        const findRandom = () => correctLength[Math.floor(Math.random() * correctLength.length)];
        // console.log(findRandom)
        this.setState({
            answer: findRandom()
        });
        // console.log(this.state.answer)
    }

    // Generate the buttons based on the min and max length of the words array.
    generateWordLength = () => {
        let length = [...Array(7).keys()];
        return length.map(i =>
            <button 
            key={word.getMinLenght + i} 
            value={word.getMinLenght + i} 
            id={`btn-${i}`} 
            onClick={this.handleWordLength}
            >{word.getMinLenght + i}</button>
        )
    }

    // Hide the starting page and show the game.
    startGame = () => {
        document.querySelector("#hangman-game").classList.toggle("hide");
        document.querySelector("#hangman-newgame").classList.toggle("hide");
    }

    // Hide the starting and game pages and show the instructions.
    showInstructions = () => {
        document.querySelector("#hangman-game").classList.add("hide");
        document.querySelector("#hangman-newgame").classList.add("hide");
        document.querySelector("#hangman-instructions").classList.remove("hide");
        document.querySelector("#instructions").classList.add("hide");
    }

    //Hide the instructions and show the game page.
    hideInstructions = () => {
        document.querySelector("#hangman-game").classList.remove("hide");
        document.querySelector("#hangman-newgame").classList.remove("hide");
        document.querySelector("#hangman-instructions").classList.add("hide");
        document.querySelector("#instructions").classList.remove("hide");
    }
    render() {
        // Calculate the outcome of the game and display the state accordingly.
        const correctAnswer = this.guessedLetter().join("") === this.state.answer;
        const gameOver = this.state.mistakes >= this.props.maxMistakes;

        let result = `It's a ${this.state.answer.length} letter word`;
        // "An" edge-case
        if (this.state.answer.length === 8) result = `It's an ${this.state.answer.length} letter word`;
        if (correctAnswer) result = <Win />;
        if (gameOver) result = <Lose />;

        // Conditional rendering of hangman SVG components based on the number of mistakes made.
        let hangmanState;
        switch (this.state.mistakes) {
            case 0: hangmanState = <State0 />; break;
            case 1: hangmanState = <State1 />; break;
            case 2: hangmanState = <State2 />; break;
            case 3: hangmanState = <State3 />; break;
            case 4: hangmanState = <State4 />; break;
            case 5: hangmanState = <State5 />; break;
            case 6: hangmanState = <State6 />; break;
            default:hangmanState = <State6 />; break;
        }
        return(
            <div id="wrapper">
                <Header/>
                <section id="instructions" >
                    Instructions
                    <img src={arrow} alt="Arrow" id="right-arrow" onClick={this.showInstructions}/>
                </section>
                <article className="hangman-container hide" id="hangman-instructions">
                    <h1 className="hangman-title">The Hangman</h1>
                    <div id="instructions-container">
                        <CompleteHangman />
                        <p id="instruction-title"><b>Game Instructions</b></p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. <br /> <br />
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        <p></p>
                        <button id="instruction-btn" onClick={this.hideInstructions}>Got it!</button>
                    </div>
                </article>

                <article className="hangman-container" id="hangman-newgame">
                    <h1 className="hangman-title">The Hangman</h1>
                    <div id="new-game-container">
                        <p>Let's play <b>Hangman!</b></p>
                        <p>How many letters do you want in your word?</p>
                    </div>
                    <div id="word-select-container">
                        <p>{this.generateWordLength()}</p>
                        <button id="play-btn" value={this.state.answer.length} onClick={() => {this.startGame();}}>Let's play!</button>
                    </div>
                </article>

                <article className="hangman-container hide" id="hangman-game">
                    {hangmanState}
                    <section id="hangman-main-container">
                        <h1 className="hangman-title">The Hangman</h1>
                        <p style={{WebkitTextStrokeWidth:"medium"}}>{result}</p>
                        <p>{gameOver ? `Correct word: ${this.state.answer}` : this.guessedLetter()}</p>
                        <p id="keyboard-text">Play with a word</p>
                        <p id = "keyboard">{this.generateKeyboard()}</p>
                        <p id="mistakes">Number of <b>wrong</b> guesses: {this.state.mistakes} (out of {this.props.maxMistakes})</p>
                        <div id="button-container">
                            <button className="game-btn" onClick={this.endGame}>End Game</button>
                            <button className="game-btn" id ="new-game-btn" onClick={this.resetGame}>Start New Game</button>
                        </div>
                    </section>
                </article>
            </div>
        )
    }
}