import styles from "./home.module.css";

import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { VideoContext } from "../../context/VideoContext";
import { SideBar } from "../../components/sideBar/SideBar";

export const Home=()=>
{
    const {state}=useContext(VideoContext);
    const {categories}=state;
    const navigate=useNavigate();

    return (
        <div className={styles[`page-container`]}>
            <SideBar />  
            <main className={styles.main}>
                <h1>Categories</h1>

                <ul className={styles[`categories-container`]}>
                    {categories.map(({_id,thumbnail,category})=>(
                        <li key={_id} className={styles[`category-list-item`]} onClick={()=>navigate(`/categories/${category}`)}>
                            <img src={thumbnail} alt="thumbnail" width={300} height={200}/>
                            <strong>{category}</strong>
                        </li>
                    ))}
                </ul>
            </main>  
        </div>
    )
}