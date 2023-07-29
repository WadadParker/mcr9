import styles from "./watchLater.module.css";

import { useContext } from "react";

import { VideoContext } from "../../context/VideoContext";
import { SideBar } from "../../components/sideBar/SideBar";
import { VideoCard } from "../../components/videoCard/VideoCard";

export const WatchLater=()=>
{
    const {state,dispatch}=useContext(VideoContext);
    const {watchLaterVideos}=state;
    return (
        <div className={styles[`page-container`]}>
            <SideBar />  
            <main className={styles.main}>
                <h1>Watch Later</h1>
                <ul className={styles[`videos-container`]}>
                    {watchLaterVideos?.map(video=>(
                        <VideoCard video={video} key={video._id}/>
                    ))}
                </ul>
            </main>  
        </div>
    )
}