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
            case "":
                return {...state};
              
            default:
                return state;    
        }
    }

    const initialState={
        categories:categories,
        allVideos:videos,
    }


    const [state,dispatch]=useReducer(VideoReducer,initialState);

    return (
        <VideoContext.Provider value={{state}}>
            {children}
        </VideoContext.Provider>
    )
}