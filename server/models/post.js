// 글 쓰기 관련 모델

import mongoose, { mongo } from "mongoose";
import moment from "moment";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true, // 검색 기능 향상을 위해
  },
  contents: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: -2, // 처음 작성한 사람도 조회 수가 올라가기때문에 -2로 설정.
  },
  fileurl: {
    type: String,
    default: "https://source.unsplash.com/random/301x201", // 그림 파일 url 초기값으로 아무거나.
  },
  date: {
    type: String,
    default: moment().format("YYYY-MM-DD hh:mm:ss"),
  },
  category: {
    // category 모델 연결해주기 위해서
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
  // 작성자.
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const Post = mongoose.model("post", PostSchema);

export default Post;
