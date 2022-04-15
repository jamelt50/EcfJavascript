require("dotenv").config();
const express = require("express");
const mongo = require("mongoose");
const bodyParser = require("body-parser");
const expressEjsLayouts = require("express-ejs-layouts");
const db = process.env.MONGO_DB;
const cluster = process.env.MONGO_URL;
const pass = process.env.MONGO_PASS;
const user = process.env.MONGO_USER;
mongo
  .connect("mongodb://" + cluster + "/" + db, {
    pass,
    user,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connexion a MPOngoDb reussie"))
  .catch((e) => console.log(e, "connexion echouer"));

const routes = require("./routes/routes");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;

app.set("view engine", "ejs");
app.use(expressEjsLayouts);
app.set("layout", "layout");
app.use(express.static("public"));
app.use(routes);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
