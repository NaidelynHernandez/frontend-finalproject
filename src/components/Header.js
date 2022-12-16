import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";

function Header({isLoggedIn, setIsLoggedIn, setUserInformation}){
    function logout(){
        const auth= getAuth();
        signOut(auth)
            .then(()=> {
                setUserInformation({});
                setIsLoggedIn(false);
            })
            .catch((error)=> {
                console.warn(error);
            });
        }
    
    return(
       <header>
        <nav>
            {isLoggedIn && (<Link to="/">
              <p> Home</p>  
            </Link>
            )}

            {!isLoggedIn && (<Link to ="/login">
              <p> Login</p>
            </Link>
            )}

            {!isLoggedIn && (<Link to="/create">
              <p>Create User</p>
            </Link>
            )}
               {isLoggedIn && (<Link to="/Upload">
              <p>YOUR SPACE</p>
            </Link>
            )}

            {isLoggedIn && <p onClick= {() => logout()}>Log Out</p>}

            
        </nav>
        </header>
    ); 
    }

export default Header; 