import styles from "./videoCard.module.css";
import {useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock as solidClock } from "@fortawesome/free-solid-svg-icons";
import { faClock as regularClock } from "@fortawesome/free-regular-svg-icons";

import { VideoContext } from "../../context/VideoContext";

export const VideoCard=({video})=>
{
    const navigate=useNavigate();
    const {dispatch, watchLaterCheck, addToWatchLater, removeFromWatchLater}=useContext(VideoContext);

    useEffect(()=>dispatch({type:"GET_WATCH_LATER_VIDEOS"}),[]);

    return (
        <div className={styles[`video-card-container`]}>
            <img className={styles.thumbnail} src={video?.thumbnail} alt="thumbnail" width={300} height={150} />
            {watchLaterCheck(video?._id)
            ?<FontAwesomeIcon icon={solidClock} className={styles.icon} onClick={()=>removeFromWatchLater(video?._id)}/>
            :<FontAwesomeIcon icon={regularClock} className={styles.icon} onClick={()=>addToWatchLater(video)} /> }

            <main className={styles.main} onClick={()=>navigate(`/videos/${video._id}`)}>
                <img className={styles.pfp} src="https://wallpapercave.com/wp/wp10197902.jpg" alt="profile" width={40} height={40} />
                <strong>{video?.title}</strong>
                <strong>{video?.category}</strong>
                <small>{video?.views} views | {video?.creator}</small>
            </main>
        </div>
    )
}