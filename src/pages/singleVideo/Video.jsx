import styles from "./video.module.css";

import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock as solidClock , faBars, faFilePen} from "@fortawesome/free-solid-svg-icons";
import { faClock as regularClock } from "@fortawesome/free-regular-svg-icons";

import { VideoContext } from "../../context/VideoContext";
import { SideBar } from "../../components/sideBar/SideBar";

export const Video=()=>
{
    const {state, dispatch,watchLaterCheck, addToWatchLater, removeFromWatchLater}=useContext(VideoContext);
    const {allVideos}=state;
    const {videoId}=useParams();
    const navigate=useNavigate();

    const foundVideo=allVideos.find(({_id})=>_id==videoId);

    useEffect(()=>dispatch({type:"GET_WATCH_LATER_VIDEOS"}),[]);

    return (
        <div className={styles[`page-container`]}>
            <SideBar />  
            <main className={styles.main}>
                <iframe
                className={styles.video}
                width="560"   
                height="455"  
                src={foundVideo?.src}
                title="YouTube Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                ></iframe>
                <section className={styles[`description-container`]}>
                    <img className={styles.pfp} src="https://wallpapercave.com/wp/wp10197902.jpg" alt="profile" width={50} height={50} />
                    <strong>{foundVideo?.title}</strong>
                    <div className={styles[`icons-container`]}>
                        {watchLaterCheck(foundVideo?._id)
                        ?<FontAwesomeIcon icon={solidClock} className={styles.icon} onClick={()=>removeFromWatchLater(foundVideo?._id)}/>
                        :<FontAwesomeIcon icon={regularClock} className={styles.icon} onClick={()=>addToWatchLater(foundVideo)} />}
                        <FontAwesomeIcon icon={faBars} className={styles.icon}/>
                        <FontAwesomeIcon icon={faFilePen} className={styles.icon} />

                    </div>
                </section>
                <section>
                    <h1>My Notes</h1>
                </section>
            </main>  
            
            <footer className={styles.footer}>
                <h2>More Videos</h2>
                {allVideos.map(item=>(
                    <li key={item._id} className={styles[`list-item`]} onClick={()=>navigate(`/videos/${item._id}`)}>
                        <img src={item.thumbnail} alt="thumbnail" className={styles.thumbnail}/>
                        <strong>{item.title}</strong>
                        <small>{item.creator}</small>
                    </li>
                ))}

            </footer>

        </div>
    )
}