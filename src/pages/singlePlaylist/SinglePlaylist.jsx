import styles from "./singlePlaylist.module.css";

import { useParams } from "react-router-dom";
import { useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { VideoContext } from "../../context/VideoContext";
import { SideBar } from "../../components/sideBar/SideBar";
import { VideoCard } from "../../components/videoCard/VideoCard";

export const SinglePlaylist=()=>
{
    const {state, removeFromPlaylist}=useContext(VideoContext);
    const {playlists}=state;
    const {playlistName}=useParams();

    const foundPlaylist=playlists.find(({name})=>name==playlistName);

    return (
        <div className={styles[`page-container`]}>
            <SideBar />  
            <main className={styles.main}>
                <h1>{foundPlaylist?.name}</h1>

                <ul className={styles[`videos-container`]}>
                    {foundPlaylist.videos.map(video=>(
                        <li key={video._id} className={styles[`video-list-container`]}>
                        <FontAwesomeIcon icon={faXmark} className={styles.icon} onClick={()=>removeFromPlaylist(video,foundPlaylist?.name)}/>
                        <VideoCard video={video} />
                        </li>
                    ))}
                </ul>
            </main>  
        </div>
    )
}