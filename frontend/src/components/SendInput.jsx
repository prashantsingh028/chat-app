import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { useDispatch ,useSelector} from "react-redux";
import {setMessages} from "../redux/messageSlice";

const SendInput = () =>{
    const [message,setMessage] = useState("");
    const dispatch = useDispatch();
    const {selectedUser} = useSelector(store => store.user);
    const {messages} = useSelector(store => store.message)
    
    const onSubmitHandler =async (e) =>{

        e.preventDefault();
        try {
            const res = await axios.post(`https://chat-app-1-0jlj.onrender.com/api/v1/message/send/${selectedUser._id}`,{message},{
                headers: {
                    "Content-Type": "application/json"
            },
            withCredentials:true
        });
            //console.log(res);
            const newMessages = [...messages, res?.data?.newMessage];
            //console.log(newMessages)
            dispatch(setMessages(newMessages));
        } catch (error) {
            console.log(error);
        }
        // alert(message);
        setMessage("");
    }
    return (
        <form onSubmit={onSubmitHandler} className="px-4 my-3">
            <div className="w-full relative">
                <input 
                value={message}
                onChange={(e) =>setMessage(e.target.value)}
                type="text"
                placeholder="Send a message." 

                className="border text-sm rounded-lg border-zinc-500 p-3 block w-full bg-gray-700 text-white"
                 />
                 <button type="submit" className="absolute flex inset-y-0 end-3 items-center "> <IoSend /> </button>
            </div>

        </form>
    )
};
export default SendInput;

