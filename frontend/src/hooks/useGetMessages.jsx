import  { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetMessages = () =>{
    const {selectedUser} = useSelector(store => store.user);
    const dispatch = useDispatch();
    useEffect(() =>{
        const fetchMessages = async () =>{
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`http://localhost:5000/api/v1/message/${selectedUser?._id}`);
                //console.log(res);
                dispatch(setMessages(res.data));
            } catch (error) {
                console.log(error);
            }
        }
        fetchMessages();
    },[selectedUser?._id,dispatch])
};

export default useGetMessages;
