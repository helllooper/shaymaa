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

export const createArticle = (article) => async(dispatch, getState) => {
    try{
    dispatch({
        type:constants.ARTICLE_CREATE_REQUEST
    })
    const {userLogin:{userInfo}} = getState();
    const config = {
        headers:{
            Authorization:`Bearer ${userInfo.token}`
        }
    }
    const {data} = await axios.post("/api/articles", article, config)
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

export const articleDetails = (id) => async dispatch => {
    try{
        dispatch({
            type:constants.ARTICLE_DETAILS_REQUEST
        });
        const {data} = await axios.get(`/api/articles/${id}`);
        dispatch({
            type:constants.ARTICLE_DETAILS_SUCCESS,
            payload:data
        })
    } catch(error){
        dispatch({
            type:constants.ARTICLE_DETAILS_FAILED,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
    
}

export const getLatestArticles = () => async dispatch => {
    try{
        dispatch({
            type:constants.LATEST_ARTICLES_REQUEST
        });
        const {data} = await axios.get("/api/articles/latest");
        dispatch({
            type:constants.LATEST_ARTICLES_SUCCESS,
            payload:data
        })
    } catch(error){
        dispatch({
            type:constants.LATEST_ARTICLES_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
    
}

export const deleteArticle = (id) => async(dispatch, getState) => {
    try {
        dispatch({
            type:constants.ARTICLE_DELETE_REQUEST
        })
        const {userLogin:{userInfo}} = getState()
        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        await axios.delete(`/api/articles/${id}`, config)
        dispatch({
            type:constants.ARTICLE_DELETE_SUCCESS
        })
    } catch(error){
        dispatch({
            type:constants.ARTICLE_DELETE_FAILED,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}