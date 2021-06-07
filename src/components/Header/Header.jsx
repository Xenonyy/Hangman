import React from 'react';
import logo from '../Images/logo.png'
import './Header.css'

export default class Header extends React.Component {
    render() {
        return(
            <header id="header">
                <img src={logo} alt="Hangman logo" id="hangman-logo"/>
                <p style={{textTransform: "uppercase", filter: "invert(1)", fontWeight: "700"}}>Hangman</p>
            </header>
        )
    }
} 