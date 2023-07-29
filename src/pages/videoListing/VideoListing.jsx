import styles from "./videoListing.module.css";

import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";

import { VideoContext } from "../../context/VideoContext";
import { SideBar } from "../../components/sideBar/SideBar";
import { VideoCard } from "../../components/videoCard/VideoCard";

export const VideoListing=()=>
{
    const {state}=useContext(VideoContext);
    const {allVideos}=state;
    const {category:selectedCategory}=useParams();

    const foundVideos=allVideos.filter(({category})=>category===selectedCategory);

    return (
        <div className={styles[`page-container`]}>
            <SideBar />  
            <main className={styles.main}>
                <h1>{selectedCategory}</h1>

                <ul className={styles[`videos-container`]}>
                    {foundVideos?.map(video=>(
                        <VideoCard video={video} key={video._id}/>
                    ))}
                </ul>
            </main>  
        </div>
    )
}