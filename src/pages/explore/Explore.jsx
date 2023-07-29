import styles from "./explore.module.css";

import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { VideoContext } from "../../context/VideoContext";
import { SideBar } from "../../components/sideBar/SideBar";
import { VideoCard } from "../../components/videoCard/VideoCard";

export const Explore=()=>
{
    const {state,dispatch}=useContext(VideoContext);
    const {search}=state;
    const {allVideos}=state;

    const searchedVideos=allVideos.filter(({title})=>title.toLowerCase().includes(search.toLowerCase()))

    return (
        <div className={styles[`page-container`]}>
            <SideBar />  
            <main className={styles.main}>
                <h1>Explore</h1>
                <input type="search" value={search} placeholder="Search video by Title" className={styles.seachbar} 
                onChange={(e)=>dispatch({type:"SEARCH",payload:e.target.value})}/>
                <ul className={styles[`videos-container`]}>
                    {searchedVideos?.map(video=>(
                        <VideoCard video={video} key={video._id}/>
                    ))}
                </ul>
            </main>  
        </div>
    )
}