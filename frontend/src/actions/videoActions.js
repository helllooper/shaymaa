import axios from "axios";
import * as constants from "../constants/videoConstants";

export const uploadVideo = (video, setUploadPercentage) => async(dispatch, getState) => {
    try{
    dispatch({
            type:constants.VIDEO_UPLOAD_REQUEST
    })
    const {userLogin:{userInfo}} = getState();
    const config = {
        headers:{
            "Content-Type":"multipart/form-data",
            Authorization:`Bearer ${userInfo.token}`
        },
        onUploadProgress:progressEvent => {
           setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100)/progressEvent.total)))
        }
    }
    const {data} = await axios.post("/api/videos", video, config)
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