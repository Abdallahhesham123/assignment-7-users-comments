import {Router} from 'express'
import * as commentController from  './controller/comment.js'
const router = Router();


router.get("/" , commentController.getCommentModule)
router.post("/" , commentController.addComment)
router.get("/:id" , commentController.getCommentById)
router.put("/updateComment/:id" , commentController.updateComment)
router.delete("/deleteComment/:id" , commentController.deleteComment)

export default  router