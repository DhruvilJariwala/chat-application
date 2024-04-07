
const messagemodel = require("../models/messagemodel");

module.exports.addmsg = async (req, res, next) => {
  try {
    const {from,to,message}= req.body;
    const data =await messagemodel.create({
        message:{text: message},
        users:[from,to],
        sender:from,
    })
    if(data){
        return res.json({msg:"Message Added Sucessfully"})
    }
    return res.json({msg:"Failed To Add Message To Database"})
  } catch (ex) {
    next(ex);
  }
};
module.exports.getmsg = async (req, res, next) => {
try{
        const{from,to}= req.body
        const messages = await messagemodel.find({
            users:{
                $all: [from,to],
            }
        }).sort({updatedAt: 1 })

        const projectedmsg= messages.map((msg)=>{
            return{
                fromself : msg.sender.toString() ===from,
                message: msg.message.text,
            }
        })
        res.json(projectedmsg)
}catch(ex){
    next(ex)
}



};
