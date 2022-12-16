import React, {useCallback, useEffect, useState} from "react"; 
import { useNavigate } from "react-router";
import LoginForm from "../components/LoginForm";
import Header from "../components/Header";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import Main from "../components/Main";

function LoginPage({isLoggedIn, setIsLoggedIn, setUserInformation}) {
    const navigate = useNavigate();
    const [errors,setErrors]=  useState();

    useEffect(()=> {
        if(isLoggedIn) navigate("/");
    }, [isLoggedIn]); 

    const loginUser= useCallback(
        (e) => {
            e.preventDefault();
            const email= e.currentTarget.email.value; 
            const password=e.currentTarget.password.value; 

            const auth= getAuth(); 
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                const user= userCredential.user;
                setIsLoggedIn(true);

            setUserInformation({
                email: user.email,
                displayName: user.displayName, 
                uid:user.uid,
                accessToken:user.accessToken,
            }); 
        })
            .catch((error)=> {
                const errorCode= error.code;
                const errorMessage= error.message; 
                console.warn({error, errorCode, errorMessage});
                setErrors(errorMessage);
            });
        }, [setIsLoggedIn, setUserInformation]); 

    return(
        <>
       <div className="b">
            <div className="PageWrapper2">
                <Main/> 
            </div>
        </div>
            <div className="PageWrapper">
                <h1 className= "Logo"> COLLECTIVE</h1>
                <LoginForm  loginUser={loginUser}/> 
                <Header className="h" isLoggedIn={isLoggedIn}  setIsLoggedIn={setIsLoggedIn} setUserInformation= {setUserInformation}/> 
            </div>
            <p>{errors}</p>
        </>
    );
}

export default LoginPage; 