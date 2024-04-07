import React,{useEffect, useState} from 'react'
import {  useNavigate } from 'react-router-dom';
import Loader from '../assets/loading.gif'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import {avatarroute}from '../utils/Apiroutees'
import {Buffer} from 'buffer'

const Setavatar = () => {
  const api="https://api.multiavatar.com/12344567"
  const navigate=useNavigate();
  const [avatar, setavatar] = useState([]);
  const [isloading, setIsloading] = useState(true)
  const [selectedavatar, setselectedavatar] = useState(undefined)

  
  const toastoption={
    position:"bottom-right",
    autoClose:4000,
    pauseOnHover:true,
    theme:'dark',
  }
  useEffect(() => {
    if(!localStorage.getItem('chat-app-user')){
      navigate("/login");
    }
  
  }, [])
  
  
  const setprofile= async ()=>{

    if(selectedavatar===undefined){
      toast.error("Please Select an Avatar",toastoption)

    }
    else{
      const user=await JSON.parse(localStorage.getItem('chat-app-user'))
      const  {data}= await axios.post(`${avatarroute}/${user._id}`,{
        image: avatar[selectedavatar], 
      });
    if(data.isSet){
      user.IsAvatarImageSet =true;
      user.AvatarImage =data.image;
      localStorage.setItem("chat-app-user", JSON.stringify(user))
      navigate("/")
    }else{
      toast.error("Error Setting Avatar. Please Try Again",toastoption)
    }
   
    }

  }
  
  useEffect(() => {
      const data=[]
      const fetchimage = async()=>{
          for(let i=0;i<4;i++){
              const image = await axios.get(
                  `${api}/${Math.round(Math.random()*1000)}`
                  )
                  const buffer= new Buffer(image.data);
                  data.push(buffer.toString("base64"))
                }
                setavatar(data)
                setIsloading(false)
              }
              return()=>{
                  fetchimage(); 
                }
              }, [])
            
 return (
              <>
    {
      isloading?<div className='flex justify-center items-center h-[100vh] bg-bg'>
        <img src={Loader} alt='Loader' className=' mix-blend-screen h-40'/>
          </div>:
          

    <div className='bg-bg h-[100vh] '>

    <div className=' flex justify-center items-end h-[40vh]'>

    <h1 className='text-text text-xl font-bold'>Pick One Avatar as Your Profile Picture</h1>
    </div>
    <div className='avatars   h-[20vh] flex justify-center items-start gap-10 mt-5 transition has-[:checked]:border-8 has-[:checked]:border-text' >
      {avatar.map((avatar,index)=>{
        return(
          <div key={index} className={`avatar ${selectedavatar === index&&"selected"}`}>
            <img src={`data:image/svg+xml;base64,${avatar}`} alt='avatar' onClick={()=>setselectedavatar(index)} className={`h-28 ${selectedavatar === index?'border-8 rounded-full border-text':'border-none'}l cursor-pointer`}/>
          </div>
        )
      })}
    </div>
    <div className='flex justify-center'>
    <button className='text-[#9fa0a1] p-3 rounded-xl  border-4 border-[#3b515e] font-semibold cursor-pointer hover:bg-[#030b16] transition' onClick={setprofile}>Set as Profile</button>
    </div>

    </div>

    }
<ToastContainer/>
    </>
  )
}

export default Setavatar
