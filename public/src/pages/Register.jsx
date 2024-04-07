import React,{useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.jpg'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import {route}from '../utils/Apiroutees'

function Register() {
  const navigate= useNavigate();
  const[values,Setvalues] =useState({
      email:"",
      username:"",
      password:"",
      confirm:"",
  })
  const handlechange=(e)=>{
    Setvalues({...values,[e.target.name]:e.target.value});

  }

  const toastoption={
    position:"bottom-right",
    autoClose:4000,
    pauseOnHover:true,
    theme:'dark',
  }
  useEffect(() => {
    if(localStorage.getItem('chat-app-user')){
      navigate("/");
    }
  }, [])
  const handlevalidation=()=>{
    const{email,username,password,confirm}=values;
    if(confirm!==password){
      toast.error("Password And Confirm Password Should be same",toastoption)
      return false;
    }
    else if(username.length<3){
      toast.error("Username Should be grater than 3 character",toastoption)
      return false;
    }
    else if(password.length<8){
      toast.error("Password Should be grater than 7 character",toastoption)
      return false;
    }else if(email===''){
      toast.error("Email is Required",toastoption)
      return false;
    }
    return true;
  }
  


   const  handlesubmit = async (e)=>
    {
        e.preventDefault();
        if(handlevalidation()){
          const {email,username,password}=values;
          const {data} =await axios.post(route,{
            username,
            email,
            password,
          });
          if(data.status===false){
            toast.error(data.msg,toastoption)
          }
          if(data.status===true){
            localStorage.setItem('chat-app-user',JSON.stringify(data.user));
            navigate("/");
          }
        }
    };
   
  return (
    <>
        <div className='h-[100vh] w-full bg-bg flex flex-col items-center gap-5 justify-center'>
            <form onSubmit={(event)=>handlesubmit(event)} className='flex flex-col items-center gap-5 bg-[#1a1a1a76] justify-center  rounded-2xl w-[25vw] p-5 '>
                <div className='brand'  >
                <img src={Logo} alt='Logo' className='h-20 mix-blend-multiply'/>
                <h1 className='text-[#9fa0a1]'>JDConnect</h1>
                </div>
                <input type='text' placeholder='Username' className='bg-transparent p-4 w-full rounded-md border border-[#3b515e] outline-none text-[#9fa0a1]'   name='username' onChange={e=>handlechange(e)}/>
                <input type='email' placeholder='Email' className='bg-transparent p-4 w-full rounded-md border border-[#3b515e] outline-none text-[#9fa0a1]'  name='email' onChange={e=>handlechange(e)}/>
                <input type='password' placeholder='Password' className='bg-transparent p-4 w-full rounded-md border border-[#3b515e] outline-none text-[#9fa0a1]'  name='password' onChange={e=>handlechange(e)}/>
                <input type='password' placeholder='Confirm Password'  className='bg-transparent p-4 w-full rounded-md border border-[#3b515e] outline-none text-[#9fa0a1]' name='confirm' onChange={e=>handlechange(e)}/>
                <button type='submit' className='text-[#9fa0a1] p-3 rounded-xl border-4 border-[#3b515e] font-semibold cursor-pointer hover:bg-[#030b16] transition'>Create User</button>
                <span className='text-[#9fa0a1]'>already have an account ? <Link to="/Login" className='text-sky-500 '>Login</Link></span>
            </form>
        </div>
        <ToastContainer/>
    </>
  )
}

export default Register
