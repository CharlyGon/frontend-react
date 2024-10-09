import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import logoPellegrini from "../../assets/logoPellegrini.png";
import { Link } from "react-router-dom";

interface HeaderProps {
    isSidebarOpen: boolean;
}

/**
 * Header component that displays user information and adjusts its layout
 * based on the sidebar's open or closed state.
 *
 * @param {HeaderProps} props - Props containing the state of the sidebar (open/closed).
 * @returns {JSX.Element} Header component with user information.
 */
const Header: React.FC<HeaderProps> = ({ isSidebarOpen }: HeaderProps): JSX.Element => {
    const userName = "Gonzalo Fernandez"; // Name of the logged-in user

    return (
        <header className={`header ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
            <div className="logo-container">
                <Link to="/dashboard">
                    <img
                        src={logoPellegrini}
                        alt="Company Logo"
                        className="company-logo"
                    />
                </Link>
            </div>

            <div className="user-info">
                <FontAwesomeIcon
                    icon={faUserCircle}
                    className="user-icon"
                />
                <span className="user-name">
                    {userName}
                </span>
            </div>
        </header>
    );
};

export default Header;
