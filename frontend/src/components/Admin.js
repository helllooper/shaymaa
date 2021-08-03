import React , {useState, useEffect}from 'react';
import { Container} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux"
import Article from "./Article";
import {getUser} from "../actions/userActions";
import Loading from "./Loading";
import {USER_GET_RESET} from "../constants/userConstants"

const Admin = ({history, match}) => {
    const dispatch = useDispatch();
    const {loading, user, error} = useSelector(state => state.userDetails)
    const {loadingDelete ,success, errorDelete} = useSelector(state => state.articleDelete)
    useEffect(() => {
       dispatch(getUser(match.params.id))
       return () => {
           dispatch({type:USER_GET_RESET});
       }
    },[loadingDelete, success])
    return (
        <Container id="admin" className="py-5 position-relative text-start">
            {loading ? <Loading />: (
               <div>
                   <h4>Articles:</h4>
                       {user.articles.map(article => <Article id={article._id} title={article.title} brief={article.brief} date={article.date} author={article.author} history={history}/>)}
                   <h4 className="py-5">Videos:</h4>
               </div>
            )}
        </Container>
    )
}

export default Admin
