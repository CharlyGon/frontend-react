import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faTachometerAlt,
    faPiggyBank,
    faCog,
    faUserCog
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";
import { Link } from "react-router-dom";


interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

/**
 * Sidebar component that provides navigation links to different sections of the app.
 * Toggles between open and closed states, showing icons and optionally labels.
 *
 * @param {SidebarProps} props - Sidebar properties.
 * @param {boolean} props.isOpen - Determines if the sidebar is open (shows labels) or closed (only icons).
 * @param {Function} props.toggleSidebar - Function to toggle sidebar open/closed state.
 * @returns {JSX.Element} Sidebar with toggle button and navigation links.
 */
const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
    return (
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <div >
                <button className="toggle-button" onClick={toggleSidebar} aria-label="Toggle sidebar">
        <FontAwesomeIcon icon={faBars} />
    </button>
            </div>
            <ul>
                <li>
                    <Link to="/dashboard">
                        <FontAwesomeIcon icon={faTachometerAlt} />
                        {isOpen && <span>Dashboard</span>}
                    </Link>
                </li>
                <li>
                    <Link to="/funds">
                        <FontAwesomeIcon icon={faPiggyBank} />
                        {isOpen && <span>Funds</span>}
                    </Link>
                </li>
                <li>
                    <Link to="/settings-users">
                        <FontAwesomeIcon icon={faUserCog} />
                        {isOpen && <span>User's</span>}
                    </Link>
                </li>
                <li>
                    <Link to="/settings">
                        <FontAwesomeIcon icon={faCog} />
                        {isOpen && <span>Settings</span>}
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
