import './App.css';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Login from './components/Login';
import HomePage from './components/HomePage';
import Sinup from './components/Sinup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import io from "socket.io-client";
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers } from './redux/userSlice';
const router = createBrowserRouter([
  {
    path:"/",
    element:<HomePage/>
  },
  {
    path:"/register",
    element:<Sinup/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/sinup",
    element:<Sinup/>
  },
])

function App() {
  const {authUser} = useSelector(store =>store.user); 
  const dispatch = useDispatch()
  let socket; 

  useEffect(() =>{
    if(authUser){
    const socket = io('https://chat-app-1-0jlj.onrender.com',{
        query:{
          userId:authUser._id
        }
    });
    dispatch(setSocket(socket));

    socket.on('getOnlineUsers',(onlineUsers)=>{
      dispatch(setOnlineUsers)
    });
    return ()=>{
      socket.close();
    }
    }
    else{
      if(socket){
        socket.close();
        dispatch(setSocket(null));
      }
    }
  },[authUser,dispatch,socket]);
  return (
    <div className="p-4 h-screen flex items-center justify-center">
    <RouterProvider  router={router}/>
      
    </div>
  );
}

export default App;
