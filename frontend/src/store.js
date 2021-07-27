import {createStore, combineReducers, applyMiddleware, } from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {articleListReducer, articleCreateReducer} from "./reducers/articleReducers"

const reducer = combineReducers({
    articleList:articleListReducer,
    articleCreate:articleCreateReducer
})


const initialState = {}

const middleWare = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleWare)))

export default store;