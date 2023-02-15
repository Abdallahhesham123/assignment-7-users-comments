import mongoose from "mongoose"

const commentSchema = new mongoose.Schema(
  {
    post: {
      type: String,
      trim: true,
      minlength: [10, "Too short Comment"],
      maxlength: [50, "Too long Comment"],
    },

    User_Id: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Comment must be belong to parent category"],
    },
  },
  { timestamps: true }
);

const CommentModel = mongoose.model("Comment", commentSchema);

export default CommentModel
