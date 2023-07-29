import styles from "./video.module.css";

import { useParams, useNavigate  } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock as solidClock , faBars, faFilePen, faXmark} from "@fortawesome/free-solid-svg-icons";
import { faClock as regularClock } from "@fortawesome/free-regular-svg-icons";

import { VideoContext } from "../../context/VideoContext";
import { SideBar } from "../../components/sideBar/SideBar";

export const Video=()=>
{
    const {state, dispatch,watchLaterCheck, addToWatchLater, removeFromWatchLater,addToPlaylist,deletePlaylist}=useContext(VideoContext);
    const {allVideos,playlists}=state;
    const {videoId}=useParams();
    const navigate=useNavigate();

    const [showPlaylists,setShowPlaylists]=useState(false);
    const [input,setInput]=useState({name:"",description:""});

    const foundVideo=allVideos.find(({_id})=>_id==videoId);

    useEffect(()=>dispatch({type:"GET_WATCH_LATER_VIDEOS"}),[]);
    useEffect(()=>dispatch({type:"GET_ALL_PLAYLISTS"}),[]);

    const clickHandler=()=>
    {
        addToPlaylist(input.name,input.description,foundVideo);
        const clearText={name:"",description:""}
        setInput(clearText);
    }

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
                        <FontAwesomeIcon icon={faBars} className={styles.icon} onClick={()=>setShowPlaylists(true)}/>
                        <FontAwesomeIcon icon={faFilePen} className={styles.icon} />

                        {showPlaylists && 
                        <div className={styles[`playlists-container`]}>
                            <FontAwesomeIcon icon={faXmark} className={styles.xicon} onClick={()=>setShowPlaylists(false)}/>
                            <h3>Add Playlist</h3>
                            <input className={styles.text} placeholder="Enter Titile of your playlist" value={input.name} onChange={(e)=>setInput(prev=>({...prev,name:e.target.value}))}></input>
                            <input className={styles.text} placeholder="Write a description" value={input.description} onChange={(e)=>setInput(prev=>({...prev,description:e.target.value}))}></input>
                            <button className={styles.button} onClick={()=>clickHandler()}>Create New Playlist</button>
                            <section className={styles[`delete-playlists`]}>
                            {playlists.map((item)=>(
                                <li key={item.name} className={styles[`delete-list-item`]}>
                                    <span>{item.name}</span>
                                    <FontAwesomeIcon icon={faXmark} className={styles[`delete-icon`]} onClick={()=>deletePlaylist(item.name)} />
                                </li>
                            ))}
                            </section>
                        </div>}
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