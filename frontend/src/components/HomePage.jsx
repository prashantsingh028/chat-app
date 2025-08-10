import React from "react";
import MessageContainer from "./MessageContainer";
import SideBar from "./sidebar";

const HomePage = () =>{
    return(
        <div className="flex sm:h-[450px] md-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            <SideBar/>
            <MessageContainer/>
        </div>
    )
} 
export default HomePage;