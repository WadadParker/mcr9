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
              
            default:
                return state;    
        }
    }

    const initialState={
        categories:categories,
        allVideos:videos,
        search:"",
    }


    const [state,dispatch]=useReducer(VideoReducer,initialState);

    const watchLaterCheck=()=>
    {
        return true;
    }

    return (
        <VideoContext.Provider value={{state, dispatch,  watchLaterCheck}}>
            {children}
        </VideoContext.Provider>
    )
}