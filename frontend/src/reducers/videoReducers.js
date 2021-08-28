import * as constants from "../constants/videoConstants";

export const videoUploadReducer = (state={}, action) => {
    switch(action.type){
        case constants.VIDEO_UPLOAD_REQUEST:
            return {
                loading:true
              }
        case constants.VIDEO_UPLOAD_SUCCESS:
            return {
                loading:false,
                success:true,
                video:action.payload
              }
        case constants.VIDEO_UPLOAD_FAILED:
            return {
                loading:false,
                error:action.payload
            }
        case constants.VIDEO_UPLOAD_RESET:
            return{}
        default:
            return state;
    }
} 

export const videoListReducer = (state={}, action) => {
    switch(action.type){
        case constants.VIDEO_LIST_REQUEST:
            return {
                loading:true,
                videos:[]
            }
        case constants.VIDEO_LIST_SUCCESS:
            return {
                loading:false,
                videos:action.payload.videos,
                page:action.payload.page,
                pages:action.payload.pages
            }
        case constants.VIDEO_LIST_FAILED:
            return {
                loading:false,
                error:action.payload
            }
        default:
            return state;
    }
}

export const videoDetailsReducer = (state={video:{}}, action) => {
    switch(action.type){
        case constants.VIDEO_DETAILS_REQUEST:
            return {
                loading:true,
                ...state
            }
        case constants.VIDEO_DETAILS_SUCCESS:
            return {
                loading:false,
                video:action.payload
            }
        case constants.VIDEO_DETAILS_FAILED:
            return {
                loading:false,
                error:action.payload
            }
        case constants.VIDEO_DETAILS_RESET:
            return {
                video:{}
            }
        default:
            return state;
    }
}

export const videoUpdateReducer = (state={message:{}}, action) => {
    switch(action.type){
        case constants.VIDEO_UPDATE_REQUEST:
            return {
                loading:true
              }
        case constants.VIDEO_UPDATE_SUCCESS:
            return {
                loading:false,
                success:true,
                message:action.payload
              }
        case constants.VIDEO_UPDATE_FAILED:
            return {
                loading:false,
                error:action.payload
            }
        case constants.VIDEO_UPDATE_RESET:
            return{
                message:{}
            }
        default:
            return state;
    }
}

export const videoDeleteReducer = (state={}, action) => {
    switch(action.type){
        case constants.VIDEO_DELETE_REQUEST:
            return {
                loading:true
              }
        case constants.VIDEO_DELETE_SUCCESS:
            return {
                loading:false,
                success:true
              }
        case constants.VIDEO_DELETE_FAILED:
            return {
                loading:false,
                error:action.payload
            }
        default:
            return state;
    }
}