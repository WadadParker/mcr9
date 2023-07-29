import { createContext, useReducer } from "react";

import {categories} from "../backend/Categories";
import {videos} from "../backend/Videos";

export const VideoContext=createContext();

export const VideoProvider=({children})=>
{
    const VideoReducer=(state,{type,payload})=>
    {
        switch(type)
        {
            case "SEARCH":
                return {...state,search:payload};

            case "GET_WATCH_LATER_VIDEOS":
                const videos=JSON.parse(localStorage.getItem("watchlist"));
                return {...state,watchLaterVideos:videos}

            case "ADD_TO_WATCH_LATER":
                return {...state,watchLaterVideos:payload};    
              
            default:
                return state;    
        }
    }

    const initialState={
        categories:categories,
        allVideos:videos,
        search:"",
        watchLaterVideos:[],
    }


    const [state,dispatch]=useReducer(VideoReducer,initialState);
    const {watchLaterVideos}=state;

    const watchLaterCheck=(id)=> watchLaterVideos?.find(({_id})=>_id==id);

    const addToWatchLater=(video)=>
    {
        const updatedWatchList=[...watchLaterVideos,video]
        dispatch({type:"ADD_TO_WATCH_LATER",payload:updatedWatchList});
        localStorage.setItem("watchlist",JSON.stringify(updatedWatchList));
        
    }

    const removeFromWatchLater=(videoId)=>
    {
        const updatedWatchList=watchLaterVideos.filter(({_id})=>_id!==videoId);
        dispatch({type:"ADD_TO_WATCH_LATER",payload:updatedWatchList});
        localStorage.setItem("watchlist",JSON.stringify(updatedWatchList));

    }


    return (
        <VideoContext.Provider value={{state, dispatch, watchLaterCheck, addToWatchLater, removeFromWatchLater}}>
            {children}
        </VideoContext.Provider>
    )
}