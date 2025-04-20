import React, { useState } from 'react'
import { Avatar,AvatarFallback,AvatarImage } from './ui/avatar'
import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import {useDispatch, useSelector } from 'react-redux'
import CreatePost from './CreatePost'
import axios from 'axios';
import { setAuthUser } from '@/redux/authSlice'
import { setSelectedPost,setPosts } from '@/redux/postSlice'
const LeftSidebar = () => {

  const navigate=useNavigate();
  const {user}=useSelector(store=>store.auth);
  const dispatch=useDispatch();
  const [open,setOpen]=useState(false);
  const logoutHandler = async () => {
    try {
        const res = await axios.get('http://localhost:8000/api/v1/user/logout', { withCredentials: true });
        if (res.data.success) {
            dispatch(setAuthUser(null));
            dispatch(setSelectedPost(null));
            dispatch(setPosts([]));
            navigate("/login");
            toast.success(res.data.message);
        }
    } catch (error) {
        toast.error(error.response.data.message || "An unexpected error occurred");
    }
  }
    const sidebarHandler = (textType) => {
      if (textType === 'Logout') {
          logoutHandler();
      } else if (textType === "Create") {
          setOpen(true);
      } else if (textType === "Profile") {
          navigate(`/profile/${user?._id}`);
      } else if (textType === "Home") {
          navigate("/");
      } else if (textType === 'Messages') {
          navigate("/chat");
      }
  }
  const sidebarItems = [
    { icon: <Home />, text: "Home" },
    { icon: <Search />, text: "Search" },
    { icon: <TrendingUp />, text: "Explore" },
    { icon: <MessageCircle />, text: "Messages" },
    { icon: <Heart />, text: "Notifications" },
    { icon: <PlusSquare />, text: "Create" },
    { icon: <LogOut />, text: "Logout" },
    {
        icon: (
            <Avatar className='w-7 h-7'>
                <AvatarImage src={user?.profilePicture} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        ),
        text: "Profile"
    },
    
  ]
  return (
    <div className='hidden md:block fixed top-16 bg-gray-50 z-10 left-0 px-4 border-r border-gray-300 w-[20%] h-screen'>
      <div className='flex flex-col'>
        {/* <div className='flex items-center justify-center'>
        <img src='hnblogo.png' className='mx-auto h-16 w-16 '></img>
        <h1 className='my-8 pl-3 font-bold text-xl text-green-500'>HNB <span className='text-black'> CONNECT</span></h1>
        </div> */}
        
        <div className=''>
          {
            sidebarItems.map((item,index)=>{
              return (
                <div onClick={()=>sidebarHandler(item.text)} key={index} className="flex items-center gap-3 relative hover:bg-green-100 cursor-pointer rounded-lg p-3 my-3 mt-4">
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              )
            })
          }
        </div>
      </div>
      <CreatePost open={open} setOpen={setOpen} />
    </div>
  )
  }

export default LeftSidebar