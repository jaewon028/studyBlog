import express from "express";
import mongoose from "mongoose";
import config from "./config";
import hpp from "hpp";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import path from "path";

// Routes
import postRoutes from "./routes/api/post";
import userRoutes from "./routes/api/user";
import authRoutes from "./routes/api/auth";
import searchRoutes from "./routes/api/search";

const app = express();
const { MONGO_URI } = config;

const prod = process.env.NODE_ENV === "production";

// 서버 보안 라이브러리 적용.
app.use(hpp());
// app.use(helmet());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// cors : 브라우저가 다른 도메인이나 포트가 다른 서버에서 자원을 요청해주도록 해주는 것.
// app.use(cors({ origin: true, credentials: true }));

if (prod) {
  app.use(
    cors({
      origin: ["https://kanadestudyblog.net", /\.kanadestudyblog.net$/],

      credentials: true,
    })
  );
} else {
  app.use(morgan("dev"));
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
}

// morgan : log 확인.

app.use(express.json());

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Mongoose connecting Success!!"))
  .catch((e) => console.log(e));

// Use routes

// Use routes
app.all("*", (req, res, next) => {
  let protocol = req.headers["x-forward-proto"] || req.protocol;
  if (protocol === "https") {
    next();
  } else {
    let to = `https://${req.hostname}${req.url}`;
    res.redirect(to);
  }
});

// app.get("/");
app.use("/api/post", postRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/search", searchRoutes);

if (prod) {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
}

export default app;
