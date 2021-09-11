import * as constants from "../constants/articleConstants";

export const articleListReducer = (state={loading:false}, action) => {
    switch(action.type){
        case constants.ARTICLE_LIST_REQUEST:
            return {
                loading:true
            }
        case constants.ARTICLE_LIST_SUCCESS:
            return {
                loading:false,
                articles:action.payload.articles,
                page:action.payload.page,
                count:action.payload.count
            }
        case constants.ARTICLE_LIST_FAILED:
            return {
                loading:false,
                error:action.payload
            }

        case constants.ARTICLE_LIST_RESET:
            return {
                loading:false
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

export const articleDetailsReducer = (state={article:{}}, action) => {
      switch(action.type){
          case constants.ARTICLE_DETAILS_REQUEST:
              return {
                  loading:true
              }
          case constants.ARTICLE_DETAILS_SUCCESS:
              return {
                  loading:false,
                  article:action.payload
              }
          case constants.ARTICLE_DETAILS_FAILED:
              return {
                  loading:false,
                  error:action.payload
              }
          case constants.ARTICLE_DETAILS_RESET:
              return {
                  article:{}
              }
          default:
              return state;
      }
  }

  export const latestArticlesReducer = (state={}, action) => {
    switch(action.type){
        case constants.LATEST_ARTICLES_REQUEST:
            return {
                loading:true
            }
        case constants.LATEST_ARTICLES_SUCCESS:
            return {
                loading:false,
                articles:action.payload
            }
        case constants.LATEST_ARTICLES_FAIL:
            return {
                loading:false,
                error:action.payload
            }
        case constants.LATEST_ARTICLES_RESET:
            return {}
        default:
            return state;
    }
}

export const articleDeleteReducer = (state={}, action) => {
    switch(action.type){
        case constants.ARTICLE_DELETE_REQUEST:
            return {
                loading:true
              }
        case constants.ARTICLE_DELETE_SUCCESS:
            return {
                loading:false,
                success:true
              }
        case constants.ARTICLE_DELETE_FAILED:
            return {
                loading:false,
                error:action.payload
            }
        default:
            return state;
    }
}

export const articleUpdateReducer = (state={article:{}}, action) => {
    switch(action.type){
        case constants.ARTICLE_UPDATE_REQUEST:
            return {
                loading:true
              }
        case constants.ARTICLE_UPDATE_SUCCESS:
            return {
                loading:false,
                success:true,
                article:action.payload
              }
        case constants.ARTICLE_UPDATE_FAILED:
            return {
                loading:false,
                error:action.payload
            }
        case constants.ARTICLE_UPDATE_RESET:
            return{
                article:{}
            }
        default:
            return state;
    }
}