import React, {useState, useEffect} from 'react';
import Articles from "./Articles";
import Videos from "./Videos";

const SearchResults = ({history, match}) => {
    const [articlesPage, setArticlesPage] = useState(1);
    const [videosPage, setVideosPage] = useState(1)
    const keyword = history.location.search.split("=")[1];
    useEffect(() => {

    },[history.location.search])
    return (
        <div>
            <Articles history={history} pageNumber={articlesPage} setPage={setArticlesPage} keyword={keyword}/>
            <Videos history={history} pageNumber={videosPage} setPage={setVideosPage} keyword={keyword}/>
        </div>
    )
}

export default SearchResults
