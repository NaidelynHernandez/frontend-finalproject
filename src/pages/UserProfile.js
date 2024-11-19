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
        <div className= "UserProfilePage" >
            <div className="PageWrapper">
                <h1> User Profile</h1>
                <p><strong> Email: </strong>{userInformation.email}</p>
            </div>  
         
            <div className= "createPostPage">
                <div className="NContainer">
                    <h2> create post</h2>
                    <div className="inputN">
                        <label>  </label>
                        <input placeholder= "title.." onChange={(event)=> {setTitle(event.target.value);}}/>
                    </div>
                    <div className="inputN">
                        <textarea placeholder="write anything" 
                        onChange={(event)=> {setPostText(event.target.value);}}/>
                        <button className="Cbutton"onClick={createNote}> Submit</button>

                    </div>
                </div>
            </div>
        </div>
   
        </>
    );
    }

export default UserProfilePage;