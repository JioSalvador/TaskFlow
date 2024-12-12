import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <div className="header-container">
            <div className="left">
                <h3 className="title">TaskFlow</h3>
            </div>
            <div className="right">
                <span>User</span>
                <img className="user-img" src="https://placehold.co/28x28/png" alt="User" />
            </div>
        </div>
    );
}

export default Header;
