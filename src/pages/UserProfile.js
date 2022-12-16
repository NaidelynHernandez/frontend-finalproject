import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

import{addDoc, collection} from "firebase/firestore"
import {db} from './firebase';


function UserProfilePage({
    isLoading,
    isLoggedIn,
    setLoggedIn, 
    setUserInformation,
    userInformation
}) {

const [title, setTitle] =useState("")
const [postText, setPostText] =useState("")

const postsCollectionRef = collection(db, "posts")
const createNote = async ()=>{
    await addDoc(postsCollectionRef,{title, postText});

};


    const navigate = useNavigate();

     useEffect(()=> {
        if(!isLoggedIn && !isLoading) navigate("/login");
    }, [isLoading, isLoggedIn]); 
    
    return(
        <>
    <Header isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} setUserInformation= {setUserInformation}/> 
            <div className="PageWrapper">
            <h1> User Profile</h1>
            <p><strong> Display Name: </strong>{userInformation.displayName}</p>
            <p><strong> Email: </strong>{userInformation.email}</p>
            <p><strong> User ID: </strong>{userInformation.uid}</p>
        </div>  



        <div> 
            <div className= "createPostPage">
                <div className="cpContainer">
                    <h2> create post</h2>
                    <div className="inputGp">
                        <label> Title: </label>
                        <input placeholder= "title.." onChange={(event)=> {setTitle(event.target.value);}}/>
                    </div>
                    <div className="inputGp">
                        <label> Post: </label>
                        <textarea placeholder="write anything" 
                        onChange={(event)=> {setPostText(event.target.value);}}/>
                    </div>
                    <button onClick={createNote}> Submit</button>



                </div>

            </div>



        </div>
        </>
    );
    }

export default UserProfilePage;