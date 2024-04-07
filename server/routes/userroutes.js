const { register,login,avatar, alluser } = require("../controller/usercontroller")

const router= require("express").Router()

router.post("/register",register)
router.post("/login",login)
router.post("/avatar/:id",avatar)
router.get("/alluser/:id",alluser)
module.exports=router;