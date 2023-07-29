import styles from "./playlists.module.css";

import { useContext, useEffect } from "react";

import { VideoContext } from "../../context/VideoContext";
import { SideBar } from "../../components/sideBar/SideBar";
import { PlaylistCard } from "../../components/playlistCard/PlaylistCard";
import { PlaylistModal } from "../../components/playlistModal/PlaylistModal";


export const Playlists=()=>
{
    const {state,dispatch}=useContext(VideoContext);
    const {playlists,showModal}=state;

    useEffect(()=>dispatch({type:"GET_ALL_PLAYLISTS"}),[]);

    return (
        <>
        {showModal && <PlaylistModal />}
        <div className={styles[`page-container`]}>
            <SideBar />  
            <main className={styles.main}>
                <h1>Playlists</h1>
                <button className={styles.button} onClick={()=>dispatch({type:"TOGGLE_MODAL",payload:true})}>Add new Playlist</button>

                <ul className={styles[`videos-container`]}>
                    {playlists?.map((item,index)=>(
                        <PlaylistCard playlist={item} key={item.name} index={index}/>
                    ))}
                </ul>
            </main>  
        </div>
        </>
    )
}