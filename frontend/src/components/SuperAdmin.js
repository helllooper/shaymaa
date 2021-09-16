import React, {useEffect, useState} from 'react';
import { Container, Nav , Button, Form} from "react-bootstrap";
import { useDispatch, useSelector} from "react-redux";
import {listUsers} from "../actions/userActions"
import {listAuthors} from "../actions/authorActions"
import Loading from "./Loading";
import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {deleteUser} from "../actions/userActions"
import {deleteAuthor} from "../actions/authorActions"
import axios from "axios";

const SuperAdmin = () => {
    const dispatch = useDispatch()
    const [secretWord , setSecretWord] = useState("")
    const [loadingSecretWord, setLoadingSecretWord] = useState(false);
    const userLogin = useSelector(state => state.userLogin)
    const {loading, users} = useSelector(state => state.userList)
    const {loading:loadingAuthors, success:successAuthors,authors, error:errorAuthors} = useSelector(state=>state.authorList)
    const deleteUserState = useSelector(state => state.deleteUser)
    const deleteAuthorState = useSelector(state => state.deleteAuthor)
    useEffect(() => {
        dispatch(listUsers());
        dispatch(listAuthors());
    }
    ,[dispatch,deleteAuthorState.loading, deleteUserState.loading,deleteAuthorState.success, deleteUserState.success])

    const deleteUserHandler = (id) => {
        if(window.confirm("Are you sure?")){
            dispatch(deleteUser(id));
        }  
    }

    const deleteAuthorHandler = (id) => {
        if(window.confirm("Are you sure?")){
            dispatch(deleteAuthor(id));
        }
    }

    const submitSecretWordHandler = async (e) => {
        e.preventDefault();
        try{
            setLoadingSecretWord(true);
            const token = userLogin.userInfo.token;
            console.log(token);
            const config = {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
            console.log(config);
            const data = await axios.post("/api/users/secretWord", {secretWord}, config)
            console.log(data);
            setLoadingSecretWord(false);
        } catch(error){
           console.log(error);
        }
    }

    return (
        <Container id="superAdmin" className=" pt-5 text-start position-relative">
            {!userLogin.userInfo || !userLogin.userInfo.isAdmin ? <Redirect to="/"/>:null}
            {loading || loadingAuthors || deleteUserState.loading || deleteAuthorState.loading ? <Loading />: users && authors ? (
            <div>
                <h3>Admins:</h3>
                <Nav defaultActiveKey="/home" className="flex-column">
                {users.map((user) => (
                    <div className="py-2">
                        <Nav.Link className="d-inline" key={user._id}><NavLink to={`/admin/${user._id}`}>{user.name}</NavLink></Nav.Link>
                        {!user.isAdmin ? <Button onClick={() => deleteUserHandler(user._id)} variant="danger" size="sm" >Delete</Button>:<p className="fw-bold d-inline" >Super Admin</p>}
                    </div>
                    ))}
                </Nav>
                <h3>Authors:</h3>
                <Nav defaultActiveKey="/home" className="flex-column">
                {authors.map((item) => (
                    <div className="py-2">
                        <Nav.Link className="d-inline" key={item._id}><NavLink to={`/author/${item._id}`}>{item.name}</NavLink></Nav.Link>
                        <Button onClick={() => deleteAuthorHandler(item._id)} variant="danger" size="sm" >Delete</Button>
                    </div>
                    ))}
                </Nav>
                <NavLink className="nav-link" to="/addAuthor">إضافة كاتب</NavLink>
                <div>
                    <Form className="py-5" id="secretWord" onSubmit={submitSecretWordHandler}>
                        <Form.Group controlId = "secretWord">
                                <Form.Label><h3>Create or Change the secret word:</h3></Form.Label>
                                <Form.Control 
                                type="password" 
                                placeholder="Enter A Secret Word" 
                                value={secretWord} 
                                onChange={(e) => setSecretWord(e.target.value)}>
                                </Form.Control>
                                <Button className="my-3" type="submit" disabled={loadingSecretWord} variant="success" size="sm" >Submit</Button>
                        </Form.Group>
                    </Form>
                </div>
            </div>
            
            ):null}
        </Container>
    )
}

export default SuperAdmin
