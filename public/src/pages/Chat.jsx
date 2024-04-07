import React, {useEffect, useState,useRef} from 'react'
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import "./style.css" 
import { alluser,host } from '../utils/Apiroutees';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import Chatcontaineer from '../components/Chatcontaineer';
import {io} from 'socket.io-client'

function Chat() {

  const socket=useRef()
  const navigate=useNavigate();
  const [contacts, setcontacts] = useState([])
  const [curruser, setcurruser] = useState(undefined)
  const[currchat,setcurrchat]=useState(undefined)
  const[isloaded,setisloaded]=useState(false)

  useEffect(()=>{
    const func=async()=>{

      if(!localStorage.getItem('chat-app-user')){
        navigate("/login");
      }else{
        setcurruser(await JSON.parse(localStorage.getItem('chat-app-user')))
        setisloaded(true)
      }
    }
      func()
    
  },[])

  useEffect(()=>{
      if(curruser){
        socket.current=io(host);
        socket.current.emit("add-user",curruser._id)
      }
  },[curruser])
  useEffect(()=>{
    const func1=async ()=>{
      if(curruser){
        if(curruser.IsAvatarImageSet){
          const data = await axios.get(`${alluser}/${curruser._id}`)
          setcontacts(data.data)
        }else{
          navigate("/avatar")
        }
      }
    }
    func1()
  },[curruser])
  
  const chatchange=(chat)=>{
    setcurrchat(chat)
  }
  return (
    <>
    <div className='h-[100vh] w-[100vw] flex flex-col gap-6 items-center justify-center bg-bg'>
      <div className='h-[85vh] w-[85vw] bg-[#1a1a1a76] grid grid-cols-[25%_75%] part overflow-hidden'>
        <Contacts contacts={contacts} curruser={curruser} changechat={chatchange}/>
        {isloaded && currchat===undefined ?<Welcome curruser={curruser}/>:<Chatcontaineer currchat={currchat} curruser={curruser} socket={socket} />
        }
      </div>
    </div>
    </>
  )
}

export default Chat
