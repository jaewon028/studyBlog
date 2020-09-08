// 유저와 관련된 모델

import mongoose from "mongoose";
import moment from "moment";

// Create Schema

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // 필수 입력
  },
  email: {
    type: String,
    required: true,
    unique: true, // 중복 입력 불가
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["MainJuin", "SubJuin", "user"],
    default: "User",
  },
  register_data: {
    // 가입 일자
    type: Date,
    default: moment().format("YYYY-MM-DD hh:mm:ss"), // 한국 표준 일자로 표시
  },
  comments: [
    {
      post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
      },
      comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments",
      },
    },
  ],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  ],
});

const User = mongoose.model("user", UserSchema);

export default User;
