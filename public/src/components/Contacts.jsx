import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.jpg";

function Contacts({ contacts, curruser,changechat }) {
  const [currusername, setcurrusername] = useState(undefined);
  const [curruserImage, setcurruserImage] = useState(undefined);
  const [currselect, setcurrselect] = useState(undefined);
  useEffect(() => {
    if(curruser){
        setcurruserImage(curruser.AvatarImage)
        setcurrusername(curruser.username)
        
    }
  }, [curruser]);
  const changecurrchat=(index,contact)=>{
        setcurrselect(index)
        changechat(contact)
  }
  return (
     <>
 { curruserImage&&currusername && (
    
    <div className="grid grid-rows-[10%_75%_15%] overflow-hidden bg-[#1a1a1a76]">

     <div className="brand flex items-center gap-6 justify-center">
      <img src={Logo} alt='Logo' className='h-16 mix-blend-multiply'/>
      <h1 className='text-[#9fa0a1]'>JDConnect</h1>
     </div>
     <div className=" flex  flex-col items-center  overflow-auto gap-4 scrollbar-thin scrollbar-thumb-[#00000070] scrollbar-track-[#1a1a1a76] " >
        {
            contacts.map((contact,index)=>{
                return (
                  <div key={index} className={`contact ${index === currselect && "Selected"} bg-[#122439] p-4 gap-5 flex items-center ease-in-out min-h-20 w-[90%] cursor-pointer  rounded [&.Selected]:bg-[#00000070] `} onClick={()=>changecurrchat(index,contact)}>
                  <div className="">
                    <img src={`data:image/svg+xml;base64,${contact.AvatarImage}`} alt='avatar' className="h-12 max-w-[100%]"/>
                  </div>
                    <div>
                      <h3 className="text-[#9fa0a1]">{contact.username}</h3>
                    </div>
                  </div>
                )
            })
        }
       
     </div>
     <div className="bg-[#00000040] flex justify-center items-center gap-10 tablet:gap-4">
     <div>
                    <img src={`data:image/svg+xml;base64,${curruserImage}`} alt='avatar' className="h-12"/>
                  </div>
                    <div>
                      <h1 className="text-[#9fa0a1] tablet:text-base">{currusername}</h1>
                    </div>
     </div>
    </div>
 )
}
  
  
  </>)
}

export default Contacts;
