import * as constants from "../constants/authorConstants";

export const authorCreateReducer = (state={}, action) => {
    switch(action.type){
        case constants.AUTHOR_CREATE_REQUEST:
            return {
                loading:true
              }
        case constants.AUTHOR_CREATE_SUCCESS:
            return {
                loading:false,
                success:true
              }
        case constants.AUTHOR_CREATE_FAILED:
            return {
                loading:false,
                error:action.payload
            }
        case constants.AUTHOR_CREATE_RESET:
            return{}
        default:
            return state;
    }
} 

export const authorListReducer = (state={loading:false}, action) => {
    switch(action.type){
        case constants.AUTHOR_LIST_REQUEST:
            return {
                loading:true
            }
        case constants.AUTHOR_LIST_SUCCESS:
            return {
                loading:false,
                authors:action.payload.authors
            }
        case constants.AUTHOR_LIST_FAILED:
            return {
                loading:false,
                error:action.payload
            }

        case constants.AUTHOR_LIST_RESET:
            return {
                loading:false
            }
        default:
            return state;
    }
}

export const authorDetailsReducer = (state={author:{}}, action) => {
    switch(action.type){
        case constants.AUTHOR_DETAILS_REQUEST:
            return {
                loading:true
            }
        case constants.AUTHOR_DETAILS_SUCCESS:
            return {
                loading:false,
                author:action.payload.author
            }
        case constants.AUTHOR_DETAILS_FAILED:
            return {
                loading:false,
                error:action.payload
            }
        case constants.AUTHOR_DETAILS_RESET:
            return {
                author:{}
            }
        default:
            return state;
    }
}

export const latestArticleReducer = (state={}, action) => {
    switch(action.type){
        case constants.LATEST_ARTICLE_REQUEST:
            return {
                loading:true
            }
        case constants.LATEST_ARTICLE_SUCCESS:
            return {
                loading:false,
                article:action.payload.latestArticle
            }
        case constants.LATEST_ARTICLE_FAIL:
            return {
                loading:false,
                error:action.payload
            }
        case constants.LATEST_ARTICLE_RESET:
            return {}
        default:
            return state;
    }
}