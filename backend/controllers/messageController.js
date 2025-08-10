import mongoose from "mongoose";
import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { io } from "../socket/socket.js";
import { getRecieverSocketId } from "../socket/socket.js";

export const sendMessage = async (req,res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const {message} = req.body;
        if (
            !senderId ||
            !receiverId ||
            !mongoose.Types.ObjectId.isValid(senderId) ||
            !mongoose.Types.ObjectId.isValid(receiverId)
        ) {
            return res.status(400).json({ error: "Invalid sender or receiver ID" });
        }
        let gotConversation = await Conversation.findOne({
            participants:{$all : [senderId,receiverId]},
        });
        if(!gotConversation){
            gotConversation = await Conversation.create({
                participants:[senderId,receiverId]
            })
        };
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        })
        if(newMessage){
            gotConversation.messages.push(newMessage._id);
        };
        //await gotConversation.save();
        await Promise.all([gotConversation.save(), newMessage.save()]);
        // socket IO
        const recieverSocketId = getRecieverSocketId(receiverId);
        if(recieverSocketId){
            io.to(recieverSocketId).emit("newMessage",newMessage);
        }
        return res.status(201).json({
            newMessage
        })
    } catch (error) {
        console.log(error);
    }
};

export const getMessage = async (req,res) =>{
    try {
        const receiverId = req.params.id;
        const senderId = req.id;
        const conversation = await Conversation.findOne({
            participants:{$all :[senderId,receiverId]}
        }).populate("messages")
        return res.status(200).json(conversation?.messages);
    } catch (error) {
        console.log(error);
    }
};


