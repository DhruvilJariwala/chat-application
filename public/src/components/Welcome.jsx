import React,{useState,useEffect} from 'react'
import Robot from '../assets/robot.gif'

function Welcome({curruser}) {
  

    return (
    <>
    <div className='flex justify-center items-center flex-col'>
      <img src={Robot} alt='Robot'/>
      <h1 className='text-[#9fa0a1] text-3xl font-semibold'>Welcome,
      <span>{curruser.username}!</span>
      </h1>
      <h3 className='text-[#9fa0a1] text-xl font-semibold'>Please Select a Chat To Start Messaging.</h3>
    </div>
    </>
  )
}

export default Welcome
