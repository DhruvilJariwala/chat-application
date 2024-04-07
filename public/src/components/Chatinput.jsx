import React,{useState} from 'react'
import Picker from 'emoji-picker-react'
import {IoMdSend} from 'react-icons/io'
import {BsEmojiSmileFill} from 'react-icons/bs' 
function Chatinput({handlemsg}) {
const[picker,setpicker]=useState(false);
const[msg,setmsg]=useState("")

const handleemoji=()=>{
    setpicker(!picker)
}
const handleemojiclick=(event,emoji)=>{
    let message= msg;
    message+=event.emoji
    setmsg(message)
}
const sendchat=(event)=>{
    event.preventDefault()
    if(msg.length>0){
        handlemsg(msg)
        setmsg('')
    }
}
  return (
    <>
     
    <div className='grid grid-cols-[5%_95%]  items-center bg-[#1a1a1a60] p-1 pb-3 mt-0'>
     <div className='flex items-center justify-center text-text gap-5'>
        <div className={`relative text-lg cursor-pointer`}>
            <BsEmojiSmileFill onClick={handleemoji}/>
            { picker&&
            <div className='absolute top-[-470px] '>
            <Picker onEmojiClick={handleemojiclick} />
            </div>
            }
        </div>
    </div>
     <form  className='w-[100%] bg- rounded-xl flex items-center gap-8 bg-transparent' onSubmit={(e)=>sendchat(e)}>
        <input type='text' placeholder='Type Your Message here.....' className='bg-transparent w-[100%] outline-none text-text' value={msg} onChange={(e)=>setmsg(e.target.value)}/>
        <button type='submit' className='text-xl text-text px-5 py-2 cursor-pointer '>
            <IoMdSend/>
        </button>
     </form>
     </div> 
    </>
  )
}

export default Chatinput
