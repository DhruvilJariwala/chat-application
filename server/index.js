const express = require("express")
const cors= require("cors")
const mongoose= require("mongoose")
const userRoutes=require("./routes/userroutes")
const msgRoutes=require("./routes/msgroutes")
const app= express()
const socket= require("socket.io")
require("dotenv").config()


app.use(cors());
app.use(express.json());
app.use("/api/auth",userRoutes)
app.use("/api/messages",msgRoutes)
mongoose.connect(process.env.MONGOURL)
    .then(()=>{
        console.log("DB Coneected")
    }).catch((err)=>{
        console.log(err.message)
    })

const server= app.listen(process.env.PORT, ()=>{
        console.log(`Server started on ${process.env.PORT}`)
})

const io= socket(server,{
    cors:{
        origin:"http://localhost:3000",
        Credential:true,
    }
})


global.onlineUsers = new Map();

io.on("connection",(socket)=>{
    global.chatSocket=socket
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id)
    })

    socket.on("send-msg",(data)=>{
        const sendUserSocket= onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve",data.message)
        }
    })
})
