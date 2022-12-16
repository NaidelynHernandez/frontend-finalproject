import {useEffect, useState} from "react"
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import {initializeApp} from "firebase/app";
import {getAuth,onAuthStateChanged} from "firebase/auth";
import {getStorage} from "firebase/storage";
//styles and components 
import './App.css';


import LoginPage from "./pages/Login";
import UserProfilePage from "./pages/UserProfile";
import CreatePost from "./pages/CreatePost";
import CreateUserPage from "./pages/CreateUser";

const firebaseConfig = {
  apiKey: "AIzaSyDET6urlvl2JYWj62imY2uxhVXk0XaWzyg",
  authDomain: "finalproject-4c54a.firebaseapp.com",
  projectId: "finalproject-4c54a",
  storageBucket: "finalproject-4c54a.appspot.com",
  messagingSenderId: "1018578439981",
  appId: "1:1018578439981:web:5bd1d4977d026bec5fcda4"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage= getStorage(app);

function App() {
  const [appInitialized,setAppInitialized]= useState(false);
  const[isLoading,setIsLoading]= useState(true);
  const[isLoggedIn,setIsLoggedIn]= useState(false);
  const [userInformation, setUserInformation]= useState({});
  
useEffect(()=> {
  initializeApp(firebaseConfig);
  setAppInitialized(true);

}, []);


  useEffect(()=> {
    if (appInitialized) {
      const auth =getAuth();
      onAuthStateChanged(auth,(user)=>{
        if (user) {
          setUserInformation(user);
          setIsLoggedIn(true);
        } else{
          setUserInformation ({});
          setIsLoggedIn (false); 
        }
        setIsLoading(false);
      });
    }
  }, [appInitialized]);

  console.log({userInformation})

  const router = createBrowserRouter([
    {
      path: "/",
      element: <UserProfilePage
      setIsLoggedIn={setIsLoggedIn}
      setUserInformation={setUserInformation}
      isLoading={isLoading}
      userInformation={userInformation}
      isLoggedIn= {isLoggedIn}/>,  // retrieving from home.js 
    },
    {
      path: "/login",
      element: <LoginPage 
      setIsLoggedIn={setIsLoggedIn}
      setUserInformation={setUserInformation}
      isLoggedIn= {isLoggedIn} />,  // retrieving from home.js 
    },
    {
      path: "/Upload",
      element: <CreatePost
      setIsLoggedIn={setIsLoggedIn}
      setUserInformation={setUserInformation}
      isLoggedIn= {isLoggedIn} />,  // retrieving from home.js 
    },
    {
      path: "/create",
      element: (
      <CreateUserPage
        isLoggedIn= {isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setUserInformation={setUserInformation}

       />
       ),  // retrieving from home.js 
    },
  ]);

  return (
    <div className="App">
    {/* <Header/>  */}
    <RouterProvider router={router} /> 
    </div>
  );
}
export default App;