import {createStore, combineReducers, applyMiddleware, } from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {articleListReducer, articleCreateReducer} from "./reducers/articleReducers";
import { userLoginReducer } from "./reducers/userReducers";
import { userListReducer } from "./reducers/userReducers";


const reducer = combineReducers({
    articleList:articleListReducer,
    articleCreate:articleCreateReducer,
    userLogin:userLoginReducer,
    userList:userListReducer
})

const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")):null

const initialState = {
    userLogin :{ userInfo: userInfoFromStorage }
}

const middleWare = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleWare)))

export default store;