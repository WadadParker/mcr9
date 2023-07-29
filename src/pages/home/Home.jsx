import styles from "./home.module.css";

import { SideBar } from "../../components/sideBar/SideBar";

export const Home=()=>
{
    return (
        <div className={styles[`page-container`]}>
            <SideBar />    
            <h1>This is Home</h1>
        </div>
    )
}