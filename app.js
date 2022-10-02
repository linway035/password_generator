const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const port = 3000;
const generatePassword = require("./generate_password");

//set template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// setting body-parser
//app.use() - 這個方法，規定了不管從哪個路由發送進來的請求，都要先經過 app.use
//bodyParser.urlencoded() - 這是 bodyParser 提供的一個方法，用來處理 URL-encoded 格式的請求。
app.use(express.urlencoded({ extended: true })); //讓不管從哪個路由發送過來的請求，都先經過 bodyParser 進行前置處理

//用GET的話則要用query
app.get("/", (req, res) => {
  console.log("req.query", req.query);
  res.render("index");
});

//用POST的話則要用{{{body}}}
app.post("/", (req, res) => {
  console.log("req.body", req.body);
  console.log("random password is: ", generatePassword(req.body));
  const options = req.body;
  const password = generatePassword(options);
  res.render("index", { password: password, options: options });
});

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
});
