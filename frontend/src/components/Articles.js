import React , {useState, useEffect}from 'react'
import { Container } from "react-bootstrap"
import Article from "./Article";
import {useDispatch, useSelector} from "react-redux";
import {listArticles} from "../actions/articleActions";
import Loading from "./Loading";
import Paginate from "./Paginate";

const Articles = ({history, match}) => {
    const []
    const dispatch = useDispatch();
    const pageNumber = match.params.pageNumber || 1
    const {loading, articles, error, page, count} = useSelector(state => state.articleList)
    const articleDelete = useSelector(state => state.articleDelete)
    useEffect(() => {
       if(!articleDelete.loading){
         dispatch(listArticles(pageNumber));
       }
    }
     ,[pageNumber, articleDelete.loading])
    return (
        <Container id="articles" className="position-relative">
            {loading  ? <Loading />:articles ? (
                <div>
                  <h1 className="py-5">مقالات</h1>
                  {articles.map(article => <Article key={article._id} id={article._id} title={article.title} brief={article.brief} author={article.author} date={article.date} history={history}/>)}
                  <Paginate count={count} page={page} history={history}/>
                </div>
            ):null}
        </Container>
    )
}

export default Articles
