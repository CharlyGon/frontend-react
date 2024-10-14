import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faTachometerAlt,
    faPiggyBank,
    faClipboardList,
    faSearch,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { SidebarProps } from "../../interfaces/interfaces";

import styles from "./styles/Sidebar.module.css";

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
        <>
            <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
                <div>
                    <button
                        className={styles.toggleButton}
                        onClick={toggleSidebar}
                    >
                        <FontAwesomeIcon
                            icon={isOpen ? faTimes : faBars}
                            className={`${styles.iconToggle} ${isOpen ? styles.iconRotate : ""}`}
                        />
                    </button>
                </div>

                <ul className={styles.menuList}>
                    <li className={styles.menuItem}>
                        <Link to="/dashboard" className={styles.menuLink}>
                            <FontAwesomeIcon
                                icon={faTachometerAlt}
                                className={styles.menuIcon}
                            />
                            {isOpen && <span className={styles.menuText}>Dashboard</span>}
                        </Link>
                    </li>

                    <li className={styles.menuItem}>
                        <Link to="/funds" className={styles.menuLink}>
                            <FontAwesomeIcon
                                icon={faPiggyBank}
                                className={styles.menuIcon}
                            />
                            {isOpen && <span className={styles.menuText}>Funds</span>}
                        </Link>
                    </li>

                    <li className={styles.menuItem}>
                        <Link to="/logs" className={styles.menuLink}>
                            <FontAwesomeIcon
                                icon={faClipboardList}
                                className={styles.menuLogs}
                            />
                            {isOpen && <span className={styles.menuText}>Logs</span>}
                        </Link>
                    </li>

                    <li className={styles.menuItem}>
                        <Link to="/search-transactions" className={styles.menuLink}>
                            <FontAwesomeIcon
                                icon={faSearch}
                                className={styles.menuIcon}
                            />
                            {isOpen && <span className={styles.menuText}>Search<br />Transactions</span>}
                        </Link>
                    </li>
                </ul>
            </div>

            {isOpen && window.innerWidth <= 768 && (
                <button
                    className={styles.overlay}
                    onClick={toggleSidebar}
                ></button>
            )}
        </>
    );
};

export default Sidebar;
