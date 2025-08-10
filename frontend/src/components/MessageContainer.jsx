// import { useEffect } from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useSelector } from "react-redux";
// 
// import {setSelectedUser} from "../redux/userSlice"

const MessageContainer = () => {
  const { selectedUser } = useSelector((store) => store.user);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   return () => dispatch(setSelectedUser(null));
  // },[dispatch])
  // const isOnline = onlineUsers.includes(selectedUser?._id);
  
  
  return (
    <div className="md:min-w-[500px] flex flex-col">
      <div className="bg-zinc-800 text-white px-4 py-2 mb-2 flex items-center gap-2 rounded p-2 cursor-pointer">
        <div className="avatar online">
          <div className="w-10 rounded-full">
            <img
              src={selectedUser?.profilePhoto}
              alt="user-profile"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className=" flex justify-between gap-2 ">
            <p className="my-3 text-white">{selectedUser?.fullname}</p>
          </div>
        </div>
      </div>
      <Messages/>
      <SendInput />
    </div>
  );
};
export default MessageContainer;
