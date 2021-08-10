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
                videos:action.payload.articles,
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