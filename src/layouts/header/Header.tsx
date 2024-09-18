import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import './Header.css';

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
            <div className="user-info">
                <FontAwesomeIcon icon={faUserCircle} size="2x" />
                <span className="user-name">{userName}</span>
            </div>
        </header>
    );
};

export default Header;
