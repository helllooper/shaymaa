import axios from "axios";
import * as constants from "../constants/authorConstants";

export const createAuthor = (author) => async(dispatch, getState) => {
    try{
    dispatch({
        type:constants.AUTHOR_CREATE_REQUEST
    })
    const {userLogin:{userInfo}} = getState();
    const config = {
        headers:{
            Authorization:`Bearer ${userInfo.token}`
        }
    }
    const {data} = await axios.post("/api/authors", author, config)
    dispatch({
        type:constants.AUTHOR_CREATE_SUCCESS,
        payload:data
    })
    } catch(error){
        dispatch({
            type:constants.AUTHOR_CREATE_FAILED,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listAuthors = () => async dispatch => {
    try{
        dispatch({
            type:constants.AUTHOR_LIST_REQUEST
        });
        const {data} = await axios.get("/api/authors");
        dispatch({
            type:constants.AUTHOR_LIST_SUCCESS,
            payload:data
        })
    } catch(error){
        dispatch({
            type:constants.AUTHOR_LIST_FAILED,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
    
}

export const authorDetails = (id) => async dispatch => {
    try{
        dispatch({
            type:constants.AUTHOR_DETAILS_REQUEST
        });
        const {data} = await axios.get(`/api/authors/${id}`);
        dispatch({
            type:constants.AUTHOR_DETAILS_SUCCESS,
            payload:data
        })
    } catch(error){
        dispatch({
            type:constants.AUTHOR_DETAILS_FAILED,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
    
}

export const getLatestArticle = (id) => async dispatch => {
    try{
        dispatch({
            type:constants.LATEST_ARTICLE_REQUEST
        });
        const {data} = await axios.get(`/api/authors/${id}/latestArticle`);
        dispatch({
            type:constants.LATEST_ARTICLE_SUCCESS,
            payload:data
        })
    } catch(error){
        dispatch({
            type:constants.LATEST_ARTICLE_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
    
}

export const getAuthorsArticles = (id, pageNumber) => async dispatch => {
    try{
        dispatch({
            type:constants.AUTHOR_ARTICLES_REQUEST
        });
        const {data} = await axios.get(`/api/authors/${id}/articles?pageNumber=${pageNumber}`);
        dispatch({
            type:constants.AUTHOR_ARTICLES_SUCCESS,
            payload:data
        })
    } catch(error){
        dispatch({
            type:constants.AUTHOR_ARTICLES_FAILED,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
    
}

export const deleteAuthor = (id) => async(dispatch, getState) => {
    try{
        dispatch({
            type:constants.AUTHOR_DELETE_REQUEST
        })
        const {userLogin:{userInfo}} = getState();
        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }
         await axios.delete(`/api/authors/${id}`, config)
        dispatch({
            type:constants.AUTHOR_DELETE_SUCCESS
        })
    }catch(error){
        dispatch({
            type:constants.AUTHOR_DELETE_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message:error.message
        })
    }
}


