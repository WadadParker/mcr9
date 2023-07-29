import styles from "./videoListing.module.css";

import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";

import { VideoContext } from "../../context/VideoContext";
import { SideBar } from "../../components/sideBar/SideBar";

export const VideoListing=()=>
{
    const {state}=useContext(VideoContext);
    const {allVideos}=state;
    const {category:selectedCategory}=useParams();
    const navigate=useNavigate();

    const foundVideos=allVideos.filter(({category})=>category===selectedCategory);

    return (
        <h1>This is video Listing Page</h1>
    )
}