import {createStore, combineReducers, applyMiddleware, } from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {articleListReducer, articleCreateReducer, articleDetailsReducer, latestArticlesReducer, articleDeleteReducer, articleUpdateReducer} from "./reducers/articleReducers";
import { userLoginReducer, userListReducer, getUserReducer, userDeleteReducer } from "./reducers/userReducers";
import { videoDeleteReducer ,videoUploadReducer, videoListReducer, videoDetailsReducer } from "./reducers/videoReducers"
import {authorCreateReducer, authorListReducer, authorDetailsReducer, latestArticleReducer, authorDeleteReducer, authorsArticlesReducer} from "./reducers/authorReducers"

const reducer = combineReducers({
    articleList:articleListReducer,
    articleCreate:articleCreateReducer,
    userLogin:userLoginReducer,
    userList:userListReducer,
    articleDetails:articleDetailsReducer,
    latestArticles:latestArticlesReducer,
    userDetails:getUserReducer,
    articleDelete:articleDeleteReducer,
    deleteUser:userDeleteReducer,
    articleUpdate:articleUpdateReducer,
    videoUpload:videoUploadReducer,
    videoList:videoListReducer,
    videoDetails:videoDetailsReducer,
    videoDelete:videoDeleteReducer,
    authorCreate:authorCreateReducer,
    authorList:authorListReducer,
    authorDetails:authorDetailsReducer,
    latestArticle:latestArticleReducer,
    authorsArticles:authorsArticlesReducer,
    deleteAuthor:authorDeleteReducer
})

const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")):null

const initialState = {
    userLogin :{ userInfo: userInfoFromStorage }
}

const middleWare = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleWare)))

export default store;