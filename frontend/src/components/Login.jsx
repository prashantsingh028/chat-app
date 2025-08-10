import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";

const Login = () => {
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`https://chat-app-1-0jlj.onrender.com/api/v1/user/login`,user,{
        headers:{
          'Content-Type':'application/json'
        },
        withCredentials:true
      });
  
        navigate("/");
        //console.log(res.data);
        dispatch(setAuthUser(res.data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      userName: "",
      password: "",
    });
  };
  return (
    <div className="min-w-96 mx-auto ">
      <div className="w-full p-6 rounded-lg shadow-md my-3 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <form onSubmit={onSubmitHandler} action="">
          <div className="my-3">
            <label className="label p-2">
              <span className="text-base label-text ">User Name</span>
            </label>
            <input
              value={user.userName}
              onChange={(e) => setUser({ ...user, userName: e.target.value })}
              className="rounded-lg w-full input input-bordered h-10 "
              type="text"
              placeholder="   User Name"
            />
          </div>
          <div className="my-3">
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="rounded-lg w-full input input-bordered h-10"
              type="password"
              placeholder="   Password"
            />
          </div>

          <div className="w-full flex items-center  mx-auto ">
            <p className="text-center my-1 ">
              Don't have an account? <Link to="/sinup">sinup </Link>
            </p>
          </div>

          <div>
            <button
              type="submit"
              className="w-full rounded-lg text-black bg-white btn btn-block btn-md mt-2 border border-slate-700"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;

