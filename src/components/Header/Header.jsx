import React from 'react';
import logo from '../Images/logo.png';
import email from '../Images/email.webp';
import github from '../Images/github.webp';
import linkedin from '../Images/linkedin.webp';
import './Header.css';

export default class Header extends React.Component {
    render() {
        return(
            <header id="header">
                <img src={logo} alt="Hangman logo" id="hangman-logo"/>
                <p style={{textTransform: "uppercase", fontWeight: "700"}}>Hangman</p>
                <section id="links">
                    <img src={email} alt="Email" id="email-icon" className="icon"/>
                    <p>gonda.armand@gmail.com</p>

                    <img src={linkedin} alt="LinkedIn" id="linkedin-icon" className="icon"/>
                    <a href="https://www.linkedin.com/in/armand-gonda-a72125205/" className="text-link">LinkedIn Profile</a>

                    <img src={github} alt="GitHub" id="github-icon" className="icon"/>
                    <a href="https://github.com/Xenonyy" className="text-link">GitHub Profile</a>
                </section>
            </header>
        )
    }
}