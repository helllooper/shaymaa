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

export const listUsers = () => async(dispatch) => {
    try{
        dispatch({
            type:constants.USER_LIST_REQUEST
        })
        const {data} = await axios.get("/api/users")
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