import styles from "./playlistModal.module.css"

import { useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { VideoContext } from "../../context/VideoContext";

export const PlaylistModal=()=>
{
    const {state,dispatch}=useContext(VideoContext);
    const { input = { name: "", description: "" } } = state;
    const { name, description } = input;

    return (
        <div className={styles.modal}>
            <div className={styles[`modal-container`]}>

                <FontAwesomeIcon icon={faXmark} className={styles.icon} onClick={()=>dispatch({type:"CLEAR_INPUT"})}/>

                <h1>Add to Playlist</h1>
                {/* input fields */}
                <main className={styles.main}>
                <label htmlFor="name">Name</label>
                <input id="name" value={name} placeholder="Enter Name" onChange={(e)=>dispatch({type:"INPUT_FIELDS",payload:e.target.value,inputField:"name"})}></input> 

                <label htmlFor="description">Description</label>
                <input className={styles.description} id="description" value={description} placeholder="Enter description" onChange={(e)=>dispatch({type:"INPUT_FIELDS",payload:e.target.value,inputField:"description"})}></input> 
                </main>

                <button className={styles.button} onClick={()=>dispatch({type:"ADD"})}>Create New Playlist</button>
            </div>
        </div>
    )
}