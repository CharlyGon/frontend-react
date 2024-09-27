import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faTachometerAlt,
    faPiggyBank,
    faCog,
    faClipboardList,
    faSearch,
    faTimes,
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
const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }: SidebarProps): JSX.Element => {
    return (
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <div >
                <button
                    className="toggle-button"
                    onClick={toggleSidebar}
                >
                    <FontAwesomeIcon
                        icon={isOpen ? faTimes : faBars}
                        className={`icon-toggle ${isOpen ? 'rotate' : ''}`}
                    />
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
                    <Link to="/logs">
                        <FontAwesomeIcon
                            icon={faClipboardList}
                            className="menu-logs"
                        />
                        {isOpen && <span className="span-logs">Logs</span>}
                    </Link>
                </li>

                <li>
                    <Link to="/search-transactions">
                        <FontAwesomeIcon icon={faSearch} />
                        {isOpen && <span >Search<br />Transactions</span>}
                    </Link>
                </li>

                <li className="settings">
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
