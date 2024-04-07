import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Axios } from 'axios';
import {BiPowerOff} from 'react-icons/bi'
function Logout() {
    const navigate=useNavigate();
    const handleclick=async()=>{
        localStorage.clear()
        navigate("/login")
    }
  return (
    <button className='flex justify-center items-center p-3 cursor-pointer  bg-[#ffffff90] rounded-xl text-xl mr-3' onClick={handleclick}>
      <BiPowerOff/>
    </button>
  )
}

export default Logout
