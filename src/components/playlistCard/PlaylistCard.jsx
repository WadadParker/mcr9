import styles from './playlistCard.module.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { useContext } from "react";
import { useNavigate } from 'react-router-dom';

import { VideoContext } from "../../context/VideoContext";

export const PlaylistCard=({playlist, index})=>
{
    const {state,dispatch, deletePlaylist}=useContext(VideoContext);
    const navigate=useNavigate();

    return (
        <div className={styles[`playlist-container`]}>
            <FontAwesomeIcon icon={faXmark} className={styles.icon} onClick={()=>deletePlaylist(playlist?.name)}/>
            <img className={styles.pfp} src="https://picsum.photos/300/174" alt='playlist head' onClick={()=>navigate(`/playlists/${playlist?.name}`)}/>
            <strong>{playlist?.name}</strong>
            <small>{playlist?.description}</small>
        </div>
    )
}