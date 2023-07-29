import styles from "./sideBar.module.css";

import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faCompass, faBars } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";

export const SideBar=()=> {

    return (
        <div className={styles[`sidebar-container`]}>
            <nav className={styles.nav}>

                <NavLink exact to="/" className={styles[`link-container`]} activeClassName={styles['active-link-container']}>
                    <FontAwesomeIcon icon={faHouse} />
                    <strong className={styles.link}>Home</strong>
                </NavLink>

                <NavLink to="/explore" className={styles[`link-container`]}>
                    <FontAwesomeIcon icon={faCompass} />
                    <strong className={styles.link}>Explore</strong>
                </NavLink>

                <NavLink to="/playlists" className={styles[`link-container`]}>
                    <FontAwesomeIcon icon={faBars} />
                    <strong className={styles.link}>Playlists</strong>
                </NavLink>

                <NavLink to="/watchlater" className={styles[`link-container`]}>
                    <FontAwesomeIcon icon={faClock} />
                    <strong className={styles.link}>Watch Later</strong>
                </NavLink>
        
            </nav>
        </div>
    )
}