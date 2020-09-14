import express from "express";
const router = express.Router();

import Post from "../../models/post";

router.get("/:searchTerm", async (req, res, next) => {
  try {
    const result = await Post.find({
      // 나중에 content 검색으로 수정.
      title: {
        $regex: req.params.searchTerm,
        $options: "i",
      },
    });
    console.log(result, "Search result");
    res.send(result);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

export default router;
