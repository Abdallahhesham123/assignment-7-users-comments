import {Router} from 'express'
import * as userController from  './controller/user.js'
const router = Router();

//get all users
router.get("/" , userController.getUserModule)
//update with diffrent methode
router.put("/updateOne/:id" , userController.updateOne)
router.put("/updateMany" , userController.updateMany)
router.put("/findByIdAndUpdate/:id" , userController.findByIdAndUpdate)
router.put("/findOneAndUpdate/:id" , userController.findOneAndUpdate)
router.put("/findOneAndReplace/:id" , userController.findOneAndReplace)
//delete with diffrent methode
router.delete("/deleteOne/:id" , userController.deleteOne)
router.delete("/deleteMany" , userController.deleteMany)
router.delete("/findByIdAndDelete/:id" , userController.findByIdAndDelete)
router.delete("/findOneAndDelete/:id" , userController.findOneAndDelete)
router.delete("/findOneAndRemove/:id" , userController.findOneAndRemove)

//soft-delete

router.put("/softDelete/:id" , userController.softDelete)
router.get("/getAllTrashedUsers" , userController.getAllTrashedUsers)

//getUserStartXand age less than y
router.get("/getUserStartX" , userController.getUserStartX)

//getUserendX
router.get("/getUserendX" , userController.getUserendX)
//getUsercontainX
router.get("/getUserContainX" , userController.getUserContainX)
//getUserMatch
router.get("/getUserMatch" , userController.getUserMatch)
//getUserWithAge
router.get("/getUserWithAge" , userController.getUserWithAge)
//getUserbyid
router.get("/getUserById/:id" , userController.getUserById)

export default  router