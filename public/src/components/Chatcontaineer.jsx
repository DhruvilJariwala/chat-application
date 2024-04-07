import React,{useState,useEffect, useRef} from 'react'
import Logout from './Logout'
import Chatinput from './Chatinput'
import axios from 'axios';
import { getmsg, sendmsg } from '../utils/Apiroutees'
import {v4 as uuidv4} from 'uuid'

function Chatcontaineer({currchat,curruser,socket}) {
const[messages,setmessages]=useState([])
const[arrival,setarrival]=useState(null)
const scrollref= useRef()
useEffect(() => {
  const func=async()=>{
    if(currchat){
      const response= await axios.post(getmsg,{
        from:curruser._id,
        to:currchat._id,
      })
      setmessages(response.data)
    }
  
  }
func()
}, [currchat])



        const handlechatmsg=async(msg)=>{
          await axios.post(sendmsg,{
            from:curruser._id,
            to:currchat._id,
            message:msg,
          })
          socket.current.emit("send-msg",{
            to:currchat._id,
            from:curruser._id,
            message:msg,
          })
          const msgs=[...messages]
          msgs.push({fromself:true,message:msg})
          setmessages(msgs)
     }

useEffect(() => {
  if(socket.current){
    socket.current.on("msg-recieve",(msg)=>{
        setarrival({fromself:false,message:msg})
    })
  }

}, [])

useEffect(() => {
arrival&&setmessages((prev)=>[...prev,arrival])
}, [arrival])

useEffect(() => {
  scrollref.current?.scrollIntoView({behaviour:"smooth"})

}, [messages])


  return (
    <>
    {currchat&&
    <div className='pt-3 grid grid-rows-[10%_78%_12%] overflow-hidden gap-2 '>
    <div className='flex justify-between p-3 items-center mt-3'>
        <div className='flex items-center gap-6'>
            <div>
            <img src={`data:image/svg+xml;base64,${currchat.AvatarImage}`} alt='avatar' className="h-12"/>
            </div>
            <div>
                <h2 className='text-[#9fa0a1]'>{currchat.username}</h2>
            </div>
        </div>
        <Logout/>
    </div>
        <div className='flex flex-col p-8 gap-4 overflow-auto scrollbar-thin scrollbar-thumb-[#00000070] scrollbar-track-transparent  '>
          {
            messages.map((message)=>{
              return(
                <div ref={scrollref} key={uuidv4()}>
                  <div className={`${message.fromself?"justify-end":"justify-start"} flex break-words  items-center   text-text `}>
                    <div className="">
                      <p className={` ${message.fromself?"bg-[#00000030]":"bg-[#1a1a1a90]"}  p-4 rounded-xl`}> 
                        {message.message}
                      </p>
                    </div>

                  </div>
                </div>
              )
            }
            )
          }
        </div>
      <Chatinput handlemsg={handlechatmsg}/>
    </div>
     }
    </>
  )
}

export default Chatcontaineer
