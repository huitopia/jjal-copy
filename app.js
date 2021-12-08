const express = require("express");
const app = express();
const port = 3000;
const connect = require("./models");
connect();
const middleware = require("./middlewares/auth-middleware");
const CommentLikeRouter = require("./routes/comment");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", [CommentLikeRouter]);
// app.set("views", __dirname + "/views");
// app.set("view engine", "ejs");

app.use('/api/comment', require('./routes/comment'))

app.get("/", (req,res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});