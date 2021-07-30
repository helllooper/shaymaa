import * as constants from "../constants/articleConstants";

export const articleListReducer = (state={}, action) => {
    switch(action.type){
        case constants.ARTICLE_LIST_REQUEST:
            return {
                loading:true,
                articles:[]
            }
        case constants.ARTICLE_LIST_SUCCESS:
            return {
                loading:false,
                articles:action.payload.articles,
                page:action.payload.page,
                pages:action.payload.pages
            }
        case constants.ARTICLE_LIST_FAILED:
            return {
                loading:false,
                error:action.payload
            }
        default:
            return state;
    }
}

export const articleCreateReducer = (state={}, action) => {
    switch(action.type){
        case constants.ARTICLE_CREATE_REQUEST:
            return {
                loading:true
              }
        case constants.ARTICLE_CREATE_SUCCESS:
            return {
                loading:false,
                success:true,
                article:action.payload
              }
        case constants.ARTICLE_CREATE_FAILED:
            return {
                loading:false,
                error:action.payload
            }
        case constants.ARTICLE_CREATE_RESET:
            return{}
        default:
            return state;
    }
} 