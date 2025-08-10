import { useEffect } from "react";
import axios from "axios";
import {useDispatch} from "react-redux"
import { setOtherUsers } from "../redux/userSlice";
// import styles from './yourStylesFile.module.css';
const useGetOtherUsers = () =>{
    const dispatch = useDispatch();
    useEffect(() =>{
        
        const fetchOtherUsers = async () =>{
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get('https://chat-app-1-0jlj.onrender.com/api/v1/user/');
                //console.log(res);
                // store 
                dispatch(setOtherUsers(res.data));
                //dispatch(setOtherUsers(res.users));
            } catch (error) {
                //console.log(error);
            }
        } 
        fetchOtherUsers();
    },[dispatch])   
};

export default useGetOtherUsers;
