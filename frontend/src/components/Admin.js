import React , {useState, useEffect}from 'react';
import { Container} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux"
import Article from "./Article";
import {getUser} from "../actions/userActions";
import Loading from "./Loading";

const Admin = ({history, match}) => {
    const dispatch = useDispatch();
    const {loading, user, error} = useSelector(state => state.userDetails)
    const [articles, setArtilces] = useState([]);
    useEffect(async() => {
       await dispatch(getUser(match.params.id))
       console.log(user)
       setArtilces(user.articles);
    },[])
    return (
        <Container id="admin" className="py-5 position-relative text-start">
            {console.log(articles)}
            {loading || articles.length === 0 ? <Loading />: (
               <div>
                   <h4>Articles:</h4>
                       {articles.map(article => <Article id={article._id} title={article.title} brief={article.brief} date={article.date} author={article.author}/>)}
                   <h4 className="py-5">Videos:</h4>
               </div>
            )}
        </Container>
    )
}

export default Admin
