import styles from "./videoCard.module.css";
import {useContext} from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock as solidClock } from "@fortawesome/free-solid-svg-icons";
import { faClock as regularClock } from "@fortawesome/free-regular-svg-icons";

import { VideoContext } from "../../context/VideoContext";

export const VideoCard=({video})=>
{
    const navigate=useNavigate();
    const {watchLaterCheck}=useContext(VideoContext);

    return (
        <div className={styles[`video-card-container`]}>
            <img className={styles.thumbnail} src={video?.thumbnail} alt="thumbnail" width={300} height={150} />
            {watchLaterCheck()
            ?<FontAwesomeIcon icon={regularClock} className={styles.icon} />
            :<FontAwesomeIcon icon={solidClock} className={styles.icon}/>}

            <main className={styles.main} onClick={()=>navigate(`/videos/${video._id}`)}>
                <img className={styles.pfp} src="https://wallpapercave.com/wp/wp10197902.jpg" alt="profile" width={40} height={40} />
                <strong>{video?.title}</strong>
                <strong>{video?.category}</strong>
                <small>{video?.views} views | {video?.creator}</small>
            </main>
        </div>
    )
}