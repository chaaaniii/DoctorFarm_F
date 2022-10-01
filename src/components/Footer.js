import React from 'react'
import './Footer.css';
import github from './img/github.png'
import linkedin from './img/linkedin.png'
import { Link } from "react-router-dom";
import logo from "./img/Dr.Farmlog.png";
import DisabledContext from 'antd/lib/config-provider/DisabledContext';



export default function Footer() {
    return (
        <div className='footer-container'>
            <img className='logo-img' src={logo}/>
            <div className='introduce'>
                <div>
                    <h2 className='font_color'><b>NO Risk High Return</b></h2>
                    <span>YEONGCHAN JO [Front-End] / chan95@gmail.com</span>
                    <span>SUNGHOON KIM [YOLOv5] / hooni@gmail.com</span>
                    <span>MINJE SUNG [AI , ML] / alswpdlek@naver.com </span>
                    <span>HONGJUN CHOI [Back-End] / bbannoooo@gmail.com</span>
                    <span>HYUNJI JUNG [Data pre-processing] /corngang@naver.com </span>
                    <span>작업기간 : 2022.08 ~ 2022.09</span>
                    <h2 className='font_color'>©Dr.Farm(주). All Rights Reserved</h2>
                </div>
            </div>
            {/* <div className='footer-links'>
                <div className='footer-icon'>
                    <a href="https://www.linkedin.com/in/gabriel-e-l-machado/" className="contact-link">
                        <img src={linkedin} alt='linkedin'></img>
                    </a>
                </div>
                <div className='footer-icon'>
                    <Link to="/">
                        <img src={github} alt='github'></img>
                    </Link>
                </div>

            </div> */}
        </div>
    )
}
