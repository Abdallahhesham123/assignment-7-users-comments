import CommentModel from "../../../../DB/model/Comment.model.js";
import UserModel from "../../../../DB/model/User.model.js";

export const getCommentModule =  async (req, res, next) => {

    try {
        const comments = await CommentModel.find({}).populate({path: "User_Id" ,select:"userName email -_id" });
        return res.json({ message: "Done", comments });
      } catch (error) {
        return res.json({
          message: "Catch error",
          error,
          stack: error.stack,
        });
      }
}
export const addComment =  async (req, res, next) => {

    try {
        const { User_Id } = req.query;
        const { post } = req.body;
        let UserExist = await UserModel.findById({_id: User_Id , isDeleted: false})
        if(UserExist === null){
         return res.json({ message: "This user isnot Exist Try again"})
        }else{
          const Post = await CommentModel.create({ post ,User_Id});
          return res.json({ message: "Your Post is added Successfully", Post });
    
        }
    
      } catch (error) {
        return res.json({
          message: "Catch error",
          error,
          stack: error.stack,
        });
      }
}
export const getCommentById =  async (req, res, next) => {

    try {
        const {id}= req.params
        let UserExist = await UserModel.findById({_id: id , isDeleted: false})
        
        if(UserExist === null){
          return res.json({ message: "This user isnot Exist Try again"})
        }
        const comments = await CommentModel.find({User_Id:id}).populate({path: "User_Id" ,select:"userName  -_id" });
        return res.json({ message: "Done", comments });
      } catch (error) {
        return res.json({
          message: "Catch error",
          error,
          stack: error.stack,
        });
      }
}
export const updateComment =  async (req, res, next) => {

    try {
        const {id}= req.params
        const { user_Id } = req.query;
        const { post } = req.body;
        let UserExist = await UserModel.findById({_id:user_Id  , isDeleted: false})
        
        if(UserExist === null){
          return res.json({ message: "This user isnot Exist in Database"})
        }
        const comments = await CommentModel.findOneAndUpdate({_id:id ,User_Id:user_Id},{post},{new:true})
        .populate({path: "User_Id" ,select:"userName  -_id" });
        return comments ? res.json({ message: "This comment updated successfully", comments })
        : res.json({ message: "This User Is Not Uthorized"})
     ;
      } catch (error) {
        return res.json({
          message: "Catch error",
          error,
          stack: error.stack,
        });
      }
}
export const deleteComment =  async (req, res, next) => {

    try {
        const {id}= req.params
        const { user_Id } = req.query;
        
        let UserExist = await UserModel.findById({_id:user_Id  , isDeleted: false})
        
        if(UserExist === null){
          return res.json({ message: "This user isnot Exist in Database"})
        }
        const comments = await CommentModel.findOneAndDelete({_id:id ,User_Id:user_Id})
        return comments ? res.json({ message: "This comment deleted successfully" })
        : res.json({ message: "This User Is Not Uthorized"})
     ;
      } catch (error) {
        return res.json({
          message: "Catch error",
          error,
          stack: error.stack,
        });
      }
}
