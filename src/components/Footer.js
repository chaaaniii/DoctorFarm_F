import React from 'react'
import './Footer.css';
import github from './img/github.png'
import linkedin from './img/linkedin.png'
import { Link } from "react-router-dom";



export default function Footer() {
    return (
        <div className='footer-container'>
            <div className='footer-links'>
                <div className='footer-icon'>
                    <a href="https://www.linkedin.com/in/gabriel-e-l-machado/" className="contact-link">
                        <img src={linkedin} alt='linkedin'></img>
                    </a>
                </div>
                <div className='footer-icon'>
                    <Link to="/1">
                        <img src={github} alt='github'></img>
                    </Link>
                </div>

                </div>
            </div>
    )
}
