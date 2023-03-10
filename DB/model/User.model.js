import mongoose from 'mongoose';
//1- create Schema

const userSchema = new mongoose.Schema({
    userName:{
      type: String,
      trim: true,
      required: [true,"UserName is required"],

    },
    email:{
      type: String,
      trim: true,
      unique: [true,"Email is unique"],
      required: [true,"Email is required"],
         },
    password:{
        type: String,
        trim: true,
        required: [true,"password is required"],
        },
    gender:{
        type: String,
        default: "Male",
        enum: ["Male", "Female"]
    },
    age:{
        type:Number
    },
    ComfirmEmail:{
        type:Boolean,
        default:false
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
        
  },
  {timestamps:true}
  
  );

  //2-create-model
  const UserModel = mongoose.model("User", userSchema);


  export default UserModel