import React, {useState, useEffect} from 'react';
import Articles from "./Articles";
import Videos from "./Videos";

const SearchResults = () => {
    const [articlesPage, setArticlesPage] = useState(1);
    const [videosPage, setVideosPage] = useState(1)
    return (
        <div>
            <Articles pageNumber={articlesPage} setPage={setArticlesPage}/>
            <Videos pageNumber={videosPage} setPage={setVideosPage}/>
        </div>
    )
}

export default SearchResults
