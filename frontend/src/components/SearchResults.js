import React, {useState, useEffect} from 'react';
import Articles from "./Articles";
import Videos from "./Videos";
import Message from "./Message";
import {ARTICLE_LIST_RESET} from "../constants/articleConstants"
import {VIDEO_LIST_RESET} from "../constants/videoConstants";
import {useDispatch, useSelector} from "react-redux";
import usePrevious from "./usePrevious"
const SearchResults = ({history, match}) => {
    const dispatch = useDispatch();
    const [articlesPage, setArticlesPage] = useState(1);
    const [videosPage, setVideosPage] = useState(1);
    const [noResultsArticles, setNoResultsArticles] = useState(false);
    const [noResultsVideos, setNoResultsVideos] = useState(false);
    const keyword = history.location.search.split("=")[1];
    const prevKeyword = usePrevious(keyword);
    useEffect(() => {
      // console.log(noResultsArticles + " === " + noResultsVideos)
         if(keyword !== prevKeyword){
           setNoResultsArticles(false);
           setNoResultsVideos(false);
         }
         return () => {
           dispatch({type:ARTICLE_LIST_RESET})
           dispatch({type:VIDEO_LIST_RESET})
         }
    },[ noResultsArticles,noResultsVideos, keyword])
    return (
      <>
      { noResultsArticles && noResultsVideos ? <div id="noResults" className="position-relative"><Message variant="danger">عفوا لا توجد مقالات أو فيديوهات مطابقة للبحث</Message></div>:(
      <div>
        <Articles history={history} pageNumber={articlesPage} setPage={setArticlesPage} keyword={keyword} setNoResults={setNoResultsArticles}/>
        <Videos history={history} pageNumber={videosPage} setPage={setVideosPage} keyword={keyword} setNoResults={setNoResultsVideos}/>
      </div>
      )}
      </>
    )
}

export default SearchResults
