
import UserModel from "../../../../DB/model/User.model.js";

export const getUserModule = async  (req, res, next) => {

    try {
        const users = await UserModel.find({isDeleted:false});
        return res.json({ message: "Done", users });
      } catch (error) {
        return res.json({
          message: "Catch error",
          error,
          stack: error.stack,
        });
      }
}
//********** start-update */
// first one result find
export const updateOne = async  (req, res, next) => {

  try {
    const {id}= req.params;
    const {age}=req.body;
      const user = await UserModel.updateOne({_id:id , isDeleted:false },{age});
      return user.modifiedCount ? res.json({ message: "user Updated Sucsessfully", user })
      : res.json({ message: "InValid-UserId"})
      ;
    } catch (error) {
      return res.json({
        message: "Catch error",
        error,
        stack: error.stack,
      });
    }
}
//many result want to update with the condition
export const updateMany = async  (req, res, next) => {

  try {
    // const {id}= req.params;
    // const {age}=req.body;
      const user = await UserModel.updateMany({ComfirmEmail:false , isDeleted:false },{ComfirmEmail:true});
      return user.modifiedCount > 0? res.json({ message: "users Updated Sucsessfully", user })
      : res.json({ message: "InValid-UserId"})
      ;
    } catch (error) {
      return res.json({
        message: "Catch error",
        error,
        stack: error.stack,
      });
    }
}
//find user by id and then update if new = true this mean thant user will return with the new result
export const findByIdAndUpdate = async  (req, res, next) => {

  try {
    const {id}= req.params;
    const {age}=req.body;
      const user = await UserModel.findByIdAndUpdate({_id:id, isDeleted:false },{age},{new:true});
      return user ? res.json({ message: "users Updated Sucsessfully", user })
      : res.json({ message: "InValid-UserId"})
      ;
    } catch (error) {
      return res.json({
        message: "Catch error",
        error,
        stack: error.stack,
      });
    }
}
//it is return object without modifiedCount
export const findOneAndUpdate = async  (req, res, next) => {

  try {
    const {id}= req.params;
    const {age}=req.body;
      const user = await UserModel.findOneAndUpdate({_id:id,ComfirmEmail:false , isDeleted:false },{age},{new:true});
      return user ? res.json({ message: "users Updated Sucsessfully", user })
      : res.json({ message: "InValid-UserId"})
      ;
    } catch (error) {
      return res.json({
        message: "Catch error",
        error,
        stack: error.stack,
      });
    }
}
// it is make replace for document by req.body
export const findOneAndReplace = async  (req, res, next) => {

  try {
    const {id}= req.params;
    const {age}=req.body;
      const user = await UserModel.findOneAndReplace({_id:id,age:27},req.body,{new:true});
      return user ? res.json({ message: "users Updated Sucsessfully", user })
      : res.json({ message: "InValid-UserId"})
      ;
    } catch (error) {
      return res.json({
        message: "Catch error",
        error,
        stack: error.stack,
      });
    }
}
//********** end-update */

//********** start-delete*/
export const deleteOne = async  (req, res, next) => {

  try {
    const {id}= req.params;
      const user = await UserModel.deleteOne({_id:id  });
      return user.deletedCount ? res.json({ message: "user Deleted Sucsessfully", user })
      : res.json({ message: "InValid-UserId"})
      ;
    } catch (error) {
      return res.json({
        message: "Catch error",
        error,
        stack: error.stack,
      });
    }
}
//many result want to delete with the condition
export const deleteMany = async  (req, res, next) => {

  try {

      const user = await UserModel.deleteMany({ComfirmEmail:false});
      return user.deletedCount >0 ? res.json({ message: "users Deleted Sucsessfully", user })
      : res.json({ message: "InValid-UsersId"})
      ;
    } catch (error) {
      return res.json({
        message: "Catch error",
        error,
        stack: error.stack,
      });
    }
}
//find user by id and then update if new = true this mean thant user will return with the new result
export const findByIdAndDelete = async  (req, res, next) => {

  try {
    const {id}= req.params;
      const user = await UserModel.findByIdAndDelete(id);
      return user ? res.json({ message: "users Deleted Sucsessfully", user })
      : res.json({ message: "InValid-UserId"})
      ;
    } catch (error) {
      return res.json({
        message: "Catch error",
        error,
        stack: error.stack,
      });
    }
}
//it is return object without modifiedCount( hardDeleted== deleted from database)
export const findOneAndDelete = async  (req, res, next) => {

  try {
    const {id}= req.params;
      const user = await UserModel.findOneAndDelete({_id:id,isDeleted:true });
      return user ? res.json({ message: "user Deleted Sucsessfully from database", user })
      : res.json({ message: "InValid-UserId"})
      ;
    } catch (error) {
      return res.json({
        message: "Catch error",
        error,
        stack: error.stack,
      });
    }
}
// it is  deprecated
export const findOneAndRemove = async  (req, res, next) => {

  try {
    const {id}= req.params;
      const user = await UserModel.findOneAndRemove({_id:id});
      return user ? res.json({ message: "users Deleted Sucsessfully", user })
      : res.json({ message: "InValid-UserId"})
      ;
    } catch (error) {
      return res.json({
        message: "Catch error",
        error,
        stack: error.stack,
      });
    }
}

//********** end-delete*/

//***soft-delete */

export const softDelete = async  (req, res, next) => {

  try {
    const {id}= req.params;
      const user = await UserModel.updateOne({_id:id , isDeleted:false },{isDeleted:true});
      return user.modifiedCount ? res.json({ message: "user deleted Sucsessfully but this user in database", user })
      : res.json({ message: "InValid-UserId"})
      ;
    } catch (error) {
      return res.json({
        message: "Catch error",
        error,
        stack: error.stack,
      });
    }
}


export const getAllTrashedUsers = async  (req, res, next) => {

  try {
      const users = await UserModel.find({isDeleted:true});
      return res.json({ message: "Done", users });
    } catch (error) {
      return res.json({
        message: "Catch error",
        error,
        stack: error.stack,
      });
    }
}

//get user with start x and age less than y


export const getUserStartX = async  (req, res, next) => {

  try {
    const{startWith, age}= req.query
   const regexp = new RegExp("^"+ startWith);
      const users = await UserModel.find({
        isDeleted:false,
        userName:regexp,
        age: { $lte: age } 
      
      });
      return res.json({ message: `user Found with start of ${startWith} and his age less than ${age}`, users });
    } catch (error) {
      return res.json({
        message: "Catch error",
        error,
        stack: error.stack,
      });
    }
}

//get user with end x
export const getUserendX = async  (req, res, next) => {

  try {
    const{endWith}= req.query
   const regexp = new RegExp(endWith +"$");
      const users = await UserModel.find({
        isDeleted:false,
        userName:regexp
      });
      return res.json({ message: `user Found with end of ${endWith}`, users });
    } catch (error) {
      return res.json({
        message: "Catch error",
        error,
        stack: error.stack,
      });
    }
}
//get user with contain x
export const getUserContainX = async  (req, res, next) => {

  try {
    const{containWith}= req.query
   const regexp = new RegExp(`${containWith}`);
      const users = await UserModel.find({
        isDeleted:false,
        userName:regexp
      });
      return res.json({ message: `user Found with ${containWith}`, users });
    } catch (error) {
      return res.json({
        message: "Catch error",
        error,
        stack: error.stack,
      });
    }
}

export const getUserMatch = async  (req, res, next) => {

  try {
    const{MatchUserOld}= req.body
    const{MatchUserNew}= req.query
    if(MatchUserOld === MatchUserNew){

      const regexp = new RegExp(`${MatchUserNew}`);
      const users = await UserModel.find({
        isDeleted:false,
        "userName": { $regex: regexp, $options: `${MatchUserOld}` } 
      });
      return res.json({ message: `user Found with match ${MatchUserOld}`, users });
    }else{

      return res.json({ message: `user Found with not match ${MatchUserOld}` });
    }

    } catch (error) {
      return res.json({
        message: "Catch error",
        error,
        stack: error.stack,
      });
    }
}


export const getUserWithAge = async  (req, res, next) => {

  try {
    const{AgeGreat,AgeLess}= req.query
  
      const users = await UserModel.find({
        isDeleted:false,
        age: { $lt:  AgeGreat, $gt: AgeLess },
      });
      return res.json({ message: `user Found with age between ${AgeGreat} and ${AgeLess}`, users });
    } catch (error) {
      return res.json({
        message: "Catch error",
        error,
        stack: error.stack,
      });
    }
}
export const getUserById = async  (req, res, next) => {

  try {
    const {id}= req.params;
      const user = await UserModel.findById({_id :id ,isDeleted:true});
      return user ? res.json({ message: "users Founded Sucsessfully", user })
      : res.json({ message: "InValid-UserId"})
      ;
    } catch (error) {
      return res.json({
        message: "Catch error",
        error,
        stack: error.stack,
      });
    }
}
