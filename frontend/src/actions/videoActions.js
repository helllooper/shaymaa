import axios from "axios";
import * as constants from "../constants/videoConstants";

export const uploadVideo = (video, type, setUploadPercentage) => async(dispatch, getState) => {
    try{
    dispatch({
            type:constants.VIDEO_UPLOAD_REQUEST
    })
    const {userLogin:{userInfo}} = getState();
    if(type === "cloudinary"){
        const config = {
            headers:{
                "Content-Type":"multipart/form-data",
                Authorization:`Bearer ${userInfo.token}`
            },
            onUploadProgress:progressEvent => {
               setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100)/progressEvent.total)))
            }
        }
        var {data} = await axios.post("/api/videos", video, config)
    } else if (type === "youtube") {
        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        var {data} = await axios.post("/api/videos/youtube", video, config)
    }
    dispatch({
        type:constants.VIDEO_UPLOAD_SUCCESS,
        payload:data
    })
    } catch(error){
        console.log(error);
        dispatch({
            type:constants.VIDEO_UPLOAD_FAILED,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listVideos = (pageNumber) => async dispatch => {
    try{
        dispatch({
            type:constants.VIDEO_LIST_REQUEST
        });
        const {data} = await axios.get(`/api/videos?pageNumber=${pageNumber}`);
        dispatch({
            type:constants.VIDEO_LIST_SUCCESS,
            payload:data
        })
    } catch(error){
        dispatch({
            type:constants.VIDEO_LIST_FAILED,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
    
}

export const videoDetails = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type:constants.VIDEO_DETAILS_REQUEST
        });
        const {userLogin:{userInfo}} = getState();
        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/videos/${id}`,config);
        dispatch({
            type:constants.VIDEO_DETAILS_SUCCESS,
            payload:data
        })
    } catch(error){
        dispatch({
            type:constants.VIDEO_DETAILS_FAILED,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
    
}