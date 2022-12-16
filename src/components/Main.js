import React from "react";
import IMGONE from "../img2.jpeg"
import IMG from "../img1.jpeg"
import IMGTWO from "../img3.jpeg"
import IMGTHREE from "../img4.jpeg"
import IMGFOUR from "../img5.jpeg"
import IMGFIVE from "../img6.jpeg"
import IMGSEVEN from "../img7.jpeg"
import IMGEIGHT from "../img8.jpeg"
import IMGNINE from "../img9.jpeg"
import IMGTEN from "../img10.jpeg"
import IMGELEVEN from "../img11.jpeg"
import IMGTWELVE from "../img12.jpeg"

function Main (){
    return(
        <div className="main">
            
            <h1> </h1>
            <div className= "n">
            <h1 class="Logo">  </h1>
            <img src={IMG}></img>
            <img src={IMGONE}></img>
            <img src={IMGEIGHT}></img>
            <img src={IMGSEVEN}></img>

            <img src={IMGTWO}></img>
            <img src={IMGTHREE}></img>

            <img src={IMGFOUR}></img>
            
            <img src={IMGFIVE}></img>
            <img src={IMGNINE}></img>
            <img src={IMGTEN}></img>
            <img src={IMGELEVEN}></img>
            <img src={IMGTWELVE}></img>

            </div>
        </div>


    

    );
    }
export default Main; 