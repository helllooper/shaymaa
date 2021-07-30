import axios from "axios";
import * as constants from "../constants/articleConstants";

export const listArticles = (pageNumber) => async dispatch => {
    try{
        dispatch({
            type:constants.ARTICLE_LIST_REQUEST
        });
        const {data} = await axios.get(`/api/articles?pageNumber=${pageNumber}`);
        dispatch({
            type:constants.ARTICLE_LIST_SUCCESS,
            payload:data
        })
    } catch(error){
        dispatch({
            type:constants.ARTICLE_LIST_FAILED,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
    
}

export const createArticle = (article) => async(dispatch) => {
    try{
    dispatch({
        type:constants.ARTICLE_CREATE_REQUEST
    })
    const {data} = await axios.post("/api/articles", article)
    dispatch({
        type:constants.ARTICLE_CREATE_SUCCESS,
        payload:data
    })
    } catch(error){
        dispatch({
            type:constants.ARTICLE_CREATE_FAILED,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}