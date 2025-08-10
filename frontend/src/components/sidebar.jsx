import React, { useState } from "react";
import { LuSearch } from "react-icons/lu";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser, setOtherUsers } from "../redux/userSlice";

const SideBar = () => {
    const [search, setSearch] = useState("");
    const { otherUsers } = useSelector(store => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/v1/user/logout');
            navigate("/login");
            toast.success(res.data.message)
            dispatch(setAuthUser(null));
        } catch (error) {
            console.log(error);
        }
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const conversationUser = otherUsers?.find((user) =>
            user.fullname.toLowerCase().includes(search.toLowerCase())
        );
        if (conversationUser) {
            dispatch(setOtherUsers([conversationUser]));
        } else {
            toast.error("User not found");
        }
    };

    return (
        <div className="border-r border-slate-500 p-4 flex flex-col">
            <form onSubmit={onSubmitHandler} className="flex items-center mx-2 my-4 ">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input input-rounded rounded-md text-black bg-white"
                    type="text"
                    placeholder="Search..."
                />
                <button type="submit" className="mx-2 btn btn-circle  bg-zinc-500">
                    <LuSearch className="w-6 h-6 outline-none" />
                </button>
            </form>
            <div className="divider px-3 "></div>
            <OtherUsers />
            <div>
                <button onClick={logoutHandler} className="btn btn-sm mt-2">Logout </button>
            </div>
        </div>
    );
};
export default SideBar;
