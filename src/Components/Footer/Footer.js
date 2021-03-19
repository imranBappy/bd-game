import React from 'react';
import './footer.css'
import logo from '../../img/wins65.com.png'
const Footer = () => {
    return (
        <>
            <footer>
                <div style={{ textAlign: 'center', paddingTop: 20 }}>
                    <img src={logo} alt="" />
                </div>
                <p className="footer">Caution! We are strongly discourage to use this site who are not 18+ and also site administrator is not liable to any kind of issues created by user.</p>
            </footer>
        </>
    );
};

export default Footer;