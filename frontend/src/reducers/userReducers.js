import * as constants from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
    switch(action.type){
        case constants.USER_LOGIN_REQUEST:
            return {loading:true}
        case constants.USER_LOGIN_SUCCESS:
            return {loading:false,success:true, userInfo:action.payload}
        case constants.USER_LOGIN_FAIL:
            return {loading:false, error:action.payload}
        case constants.USER_LOGOUT :
            return {}
        default:
            return state
    }
}

export const userListReducer = (state={}, action) => {
    switch(action.type){
        case constants.USER_LIST_REQUEST:
            return{
                loading:true,
                users:[]
            }
        case constants.USER_LIST_SUCCESS:
            return {
                loading:false,
                users:action.payload
            }
        case constants.USER_LIST_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        case constants.USER_LIST_RESET:
            return {
                users:[]
            }
        default:
            return state;
    }
}

export const getUserReducer = (state={user:{articles:[],videos:[]}}, action) => {
    switch(action.type){
        case constants.USER_GET_REQUEST:
            return{
                loading:true,
                ...state
            }
        case constants.USER_GET_SUCCESS:
            return {
                loading:false,
                user:action.payload
            }
        case constants.USER_GET_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        case constants.USER_GET_RESET:
            return {user:{articles:[],videos:[]}}
        default:
            return state;
    }
}

export const userDeleteReducer = (state={}, action) => {
    switch(action.type){
        case constants.USER_DELETE_REQUEST:
            return{
                loading:true
            }
        case constants.USER_DELETE_SUCCESS:
            return {
                loading:false,
                success:true
            }
        case constants.USER_DELETE_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        default:
            return state;
    }
}