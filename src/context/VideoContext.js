import { createContext, useReducer } from "react";

import {categories} from "../backend/Categories";
import {videos} from "../backend/Videos";

export const VideoContext=createContext();

export const VideoProvider=({children})=>
{
    const VideoReducer=(state,{type,payload,inputField})=>
    {
        const clearInput={name:"",description:""};
        switch(type)
        {
            case "SEARCH":
                return {...state,search:payload};

            case "GET_WATCH_LATER_VIDEOS":
                const videos=JSON.parse(localStorage.getItem("watchlist"));
                return {...state,watchLaterVideos:videos}

            case "ADD_TO_WATCH_LATER":
                return {...state,watchLaterVideos:payload};    

            case "INPUT_FIELDS":
                return {...state,input:{...state.input,[inputField]:payload}};
                
            case "TOGGLE_MODAL":
                return {...state,showModal:payload};    
                
            case "ADD":
                const newPlaylist=[...state.playlists,state.input];
                (localStorage.setItem("playlists",JSON.stringify(newPlaylist)));

                return {...state,playlists:newPlaylist,input:clearInput,showModal:false};  
                
            case "CLEAR_INPUT":
                return {...state,input:clearInput,showModal:false};     
            
            case "DELETE_PLAYLIST":
                return { ...state, playlists: payload };  

            case "GET_ALL_PLAYLISTS":
                const allPlaylists = JSON.parse(localStorage.getItem("playlists"));
                return { ...state, playlists: allPlaylists || [] };

            case "UPDATE_PLAYLIST":
                return {...state,playlists:payload};    
              
            default:
                return state;    
        }
    }

    const initialState={
        categories:categories,
        allVideos:videos,
        search:"",
        watchLaterVideos:[],
        showModal:false,
        playlists:[],
        input:{name:"",description:"",videos:[]},
    }


    const [state,dispatch]=useReducer(VideoReducer,initialState);
    const {watchLaterVideos, playlists}=state;

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

    const deletePlaylist=(playlistName)=>
    {
        const updatedPlaylist=playlists.filter(({name})=>name!==playlistName);

        dispatch({type:"DELETE_PLAYLIST",payload:updatedPlaylist});
        (localStorage.setItem("playlists",JSON.stringify(updatedPlaylist)));
    }

    const addToPlaylist=(name,description,videos)=>
    {
        const updatedPlaylist=[...playlists,{name,description,videos:[videos]}]
        dispatch({type:"UPDATE_PLAYLIST",payload:updatedPlaylist});
        localStorage.setItem("playlists",JSON.stringify(updatedPlaylist));

    }

    const removeFromPlaylist=(video,playlistName)=>
    {
        const updatedPlaylist=playlists.map((item)=>
        {
            if(item.name==playlistName)
            {
                const updatedVideoList=item.videos.filter(({_id})=>_id!==video._id);
                return {...item,videos:updatedVideoList}
            }
            return item;
        })
        dispatch({type:"UPDATE_PLAYLIST",payload:updatedPlaylist});
        localStorage.setItem("playlists",JSON.stringify(updatedPlaylist));
    }


    return (
        <VideoContext.Provider value={{state, dispatch, watchLaterCheck, addToWatchLater, removeFromWatchLater, deletePlaylist, addToPlaylist, removeFromPlaylist}}>
            {children}
        </VideoContext.Provider>
    )
}