import React , {useEffect}from 'react'
import { Container } from "react-bootstrap"
import Article from "./Article";
import {useDispatch, useSelector} from "react-redux";
import {listArticles} from "../actions/articleActions";
import Loading from "./Loading";
import Paginate from "./Paginate";

const Articles = ({history, match}) => {
    const dispatch = useDispatch();
    const pageNumber = match.params.pageNumber || 1
    console.log(pageNumber);
    const {loading, articles, error, page, pages} = useSelector(state => state.articleList)
    useEffect(() => {
        dispatch(listArticles(pageNumber));
     }
     ,[pageNumber])
    return (
        <Container id="articles" className="position-relative">
            {loading ? <Loading />:articles ? (
                <div>
                  <h1 className="py-5">مقالات</h1>
                  {articles.map(article => <Article key={article._id} id={article._id} title={article.title} brief={article.brief} author={article.author} date={article.date}/>)}
                  <Paginate page={page} pages={pages}/>
                </div>
            ):null}
        </Container>
    )
}

export default Articles
