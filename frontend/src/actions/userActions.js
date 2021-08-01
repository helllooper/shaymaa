import * as constants from "../constants/userConstants";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type:constants.USER_LOGIN_REQUEST
        })
        const {data} = await axios.post("/api/users/login", {email, password})
        dispatch({
            type:constants.USER_LOGIN_SUCCESS,
            payload:data
        })
        localStorage.setItem("userInfo", JSON.stringify(data))
    } catch(error) {
        dispatch({
            type:constants.USER_LOGIN_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message:error.message
        })
    }
}

export const logout = () => dispatch => {
    localStorage.removeItem("userInfo");
    dispatch({
        type:constants.USER_LOGOUT
    })
    dispatch({
        type:constants.USER_LIST_RESET
    })
}


export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type:constants.USER_LOGIN_REQUEST
        })
        const {data} = await axios.post("/api/users/signup", {name, email, password})
        dispatch({
            type:constants.USER_LOGIN_SUCCESS,
            payload:data
        })
        localStorage.setItem("userInfo", JSON.stringify(data))
    } catch(error) {
        dispatch({
            type:constants.USER_LOGIN_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message:error.message
        })
    }
}

export const listUsers = () => async(dispatch, getState) => {
    try{
        dispatch({
            type:constants.USER_LIST_REQUEST
        })
        const {userLogin:{userInfo}} = getState();
        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get("/api/users", config)
        dispatch({
            type:constants.USER_LIST_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type:constants.USER_LIST_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message:error.message
        })
    }
}

export const getUser = (id) => async(dispatch, getState) => {
    try{
        dispatch({
            type:constants.USER_GET_REQUEST
        })
        const {userLogin:{userInfo}} = getState();
        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/users/admin/${id}`, config)
        dispatch({
            type:constants.USER_GET_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type:constants.USER_GET_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message:error.message
        })
    }
}