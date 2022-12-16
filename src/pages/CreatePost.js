import React from "react";
import Header from "../components/Header";
import {useState, useEffect} from "react"; 
import {storage} from "./firebase"; 
import{ collection, deleteDoc, getDocs, doc} from "firebase/firestore"
import {db} from './firebase';
import {ref, uploadBytes, listAll, getDownloadURL} from "firebase/storage" ; 
import {v4} from 'uuid';
import {useNavigate} from "react-router-dom";

function CreatePost({isLoading, isLoggedIn, setIsLoggedIn, setUserInformation}){
    const navigate = useNavigate();
    const [imageList, setImageList]= useState([]); 
    const [imageUpload, setImageUpload] =useState(null)
    const imageListRef = ref(storage, "images/")
    const [postLists, setPostList]=useState([]);
    const postsCollectionRef = collection(db, "posts")
    const deletePost = async (id) => {
        const postDoc= doc(db,"posts" , id);
        await deleteDoc(postDoc)
    }

    const uploadImage= ()=> {
    if (imageUpload == null) return;
    const imageRef= ref(storage, `images/${imageUpload.name + v4() }`);
    uploadBytes(imageRef, imageUpload).then((snapshot)=> {
        getDownloadURL(snapshot.ref).then((url)=>{
            setImageList((prev)=> [...prev,url]);
            });
        });
    };

   useEffect(()=> {
    if(!isLoggedIn && !isLoading) navigate("/login");
}, [isLoading, isLoggedIn, navigate]); 
 
   useEffect(()=> {
    const getPosts=async ()=> {
        const data= await getDocs(postsCollectionRef);
        setPostList(data.docs.map((doc)=> ({...doc.data(), id: doc.id})));
    };
    getPosts();

  });
  
    useEffect(() => {
    listAll(imageListRef).then((response) => {
        response.items.forEach((item) =>{
            getDownloadURL(item).then((url)=> {
                setImageList((prev)=> [...prev, url]);
            });
    });
    });
}, []); 

return (
    <>
    <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserInformation= {setUserInformation}/> 
    <div className="options">
        <h1>THIS IS YOUR SPACE...</h1>
        <input className="files"
             type="file" 
             onChange={(event)=>{
             setImageUpload(event.target.files[0]);}}
            />
            <button className="files" onClick={uploadImage}> Upload Image</button>
            <br></br> 
     </div>
        
     <div className="Fortext">
     {postLists.map((post) => {
        return (
          <div className="post">
            <div className="postHeader">
              <div className="title">
                <h1> {post.title}</h1>

                <p>{post.postText}</p>
                <div className= "delete">
                <button onClick={()=> {deletePost(post.id)}}>DELETE ME </button></div>
              </div>
            </div>
           </div>
        );
     })}
        </div>
        <div className="spacecontainer">
            <div className="Upload">
            {imageList.map((url)=> {
            return <img className="p"src={url} /> 
            ;
        })}
            </div>
        </div>
        </>
    );
    }
export default CreatePost; 