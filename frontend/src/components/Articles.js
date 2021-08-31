import React , {useState, useEffect}from 'react'
import { Container } from "react-bootstrap"
import Article from "./Article";
import {useDispatch, useSelector} from "react-redux";
import {listArticles} from "../actions/articleActions";
import Loading from "./Loading";
import Message from "./Message";
import Paginate from "./Paginate";

const Articles = ({history, match, keyword, pageNumber, setPage}) => {
    const dispatch = useDispatch();
    if(!pageNumber){
      pageNumber = match.params.pageNumber || 1
    }
    const {loading, articles, error, page, count} = useSelector(state => state.articleList)
    const articleDelete = useSelector(state => state.articleDelete)
    useEffect(() => {
       if(!articleDelete.loading){
         dispatch(listArticles(pageNumber,keyword));
       }
    }
     ,[pageNumber, articleDelete.loading])
    return (
        <Container id="articles" className="position-relative">
            {loading || !articles ? <Loading />:articles.length > 0 ? (
                <div>
                  <h1 className="py-5">مقالات</h1>
                  {articles.map(article => <Article key={article._id} id={article._id} title={article.title} brief={article.brief} author={article.author} date={article.date} history={history}/>)}
                  <Paginate list="articles" count={count} page={page} history={history} setPage={setPage}/>
                </div>
            ):<Message variant="danger">عفوا لا توجد مقالات مطابقة للبحث</Message>}
        </Container>
    )
}

export default Articles
