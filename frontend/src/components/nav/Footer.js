// footer
import { Button } from "@mui/material";
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { Typography } from "@mui/material";

export default function Footer() {
    return (
        <div className='footer-container'>
                <div className="footer-content">
                    <div className="footer-logo">
                    <img src="assets/planet.png" width="60" height="50" alt="pill" />
                        <Typography>PLANEAT</Typography>
                    </div>
                    <Typography>Copyright© SSAFY 7th Seoul A701. All rights reserved.</Typography>
                </div>

        </div>
    )
}