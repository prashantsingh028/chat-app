import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const Sinup = () => {
  
  const [user, setUser] = useState({
    fullname: "",
    userName: "",
    password: "",
    confirmpassword: "",
    gender: "",
  });
  // console.log(user);
  const navigate = useNavigate();
  const handleCheckBox = (gender) => {
    setUser({ ...user, gender });
  };
  const onSubmitHandler =async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`https://chat-app-1-0jlj.onrender.com/api/v1/user/register`,user,{
        headers:{
          'Content-Type':'application/json'
        },
        withCredentials:true
      });
      // console.log(res);

      if(res.data.success){
        navigate("/login");
        toast.success(res.data.message);
      }
      //console.log({ fullName, userName, password, confirmPassword, gender });

    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      fullname: "",
      userName: "",
      password: "",
      confirmpassword: "",
      gender: "",     
    })
  };
  return (
    <div className="min-w-96 mx-auto ">
      <div className="w-full p-6 rounded-lg shadow-md my-3 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center">SignUp</h1>
        <form onSubmit={onSubmitHandler} action="">
          <div className="my-3 rounded-md ">
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              value={user.fullname}
              onChange={(e) => setUser({ ...user, fullname: e.target.value })}
              className="w-full input input-bordered h-10 rounded-lg"
              type="text"
              placeholder="   Full Name"
            />
          </div>
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
          <div className="my-3">
            <label className="label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              value={user.confirmpassword}
              onChange={(e) =>
                setUser({ ...user, confirmpassword: e.target.value })
              }
              className="rounded-lg w-full input input-bordered h-10"
              type="password"
              placeholder="   Confirm Password"
            />
          </div>
          <div className=" flex items-center my-1">
            <div className="flex items-center ">
              <p>Male</p>
              <input 
              type="checkbox" 
              checked={user.gender === "male"}
              onChange={() =>handleCheckBox("male")}
              defaultChecked 
              className="checkbox mx-2" />
            </div>
            <div className="flex items-center ">
              <p>Female</p>
              <input 
              type="checkbox"
              checked={user.gender === "female"}
              onChange={() =>handleCheckBox("female")} 
              defaultChecked 
              className="checkbox mx-2" />
            </div>
          </div>
          <div className="w-full flex items-center  mx-auto ">
            <p className="text-center my-1 ">
              Already have an account? <Link to="/login">Login </Link>
            </p>
          </div>

          <div>
            <button
              type="submit"
              className="w-full rounded-lg bg-white text-black  btn btn-block btn-md mt-2 border border-slate-700"
            >
              SignUp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Sinup;

