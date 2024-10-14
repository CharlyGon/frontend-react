import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import logoPellegrini from "../../assets/logoPellegrini.png";
import { Link } from "react-router-dom";
import { HeaderProps } from "../../interfaces/interfaces";

import styles from "./styles/Header.module.css";

/**
 * Header component that displays user information and adjusts its layout
 * based on the sidebar's open or closed state.
 *
 * @param {HeaderProps} props - Props containing the state of the sidebar (open/closed).
 * @returns {JSX.Element} Header component with user information.
 */
const Header: React.FC<HeaderProps> = ({ isSidebarOpen }: HeaderProps): JSX.Element => {
    const userName = "Gonzalo Fernandez"; // Nombre del usuario conectado

    return (
        <header className={`${styles.header} ${isSidebarOpen ? styles.headerSidebarOpen : styles.headerSidebarClosed}`}>
            <div className={styles.logoContainer}>
                <Link to="/">
                    <img
                        src={logoPellegrini}
                        alt="Company Logo"
                        className={styles.companyLogo}
                    />
                </Link>
            </div>

            <div className={styles.userInfo}>
                <FontAwesomeIcon
                    icon={faUserCircle}
                    className={styles.userIcon}
                />
                <span className={styles.userName}>
                    {userName}
                </span>
            </div>
        </header>
    );
};

export default Header;
