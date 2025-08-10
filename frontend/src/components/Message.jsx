import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";

const Message = ({ message }) => {
  const scroll = useRef();
  const { authUser, selectedUser } = useSelector((store) => store.user);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div className="text-black">
      <div
        ref={scroll}
        className={`chat ${
          authUser?._id === message?.senderId ? "chat-end" : "chat-start"
        } chat-start `}
      >
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              
              src={message.senderId === authUser?._id ? authUser?.profilePhoto : selectedUser?.profilePhoto}
            />
          </div>
        </div>
        <div className="chat-header">
          <time className="text-xs opacity-50 text-white">12:45</time>
        </div>
        <div className="chat-bubble bg-gray-200 text-black">{message?.message}</div>
      </div>
    </div>
  );
};

export default Message;
