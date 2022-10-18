const path = require("path");

const express = require("express");

const bodyParser = require("body-parser");
// const { engine } = require("express-handlebars");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const rootDir = require("./util/path");

const app = express();

//* PUG
//pug is supported out of the box
// app.set("view engine", "pug");
// app.set('views', 'views/pug');
//you can also configure which folder you views are in, by default its /views

//* HANDLEBARS
//*For a non built in engine we have to set it up
// app.engine("hbs", engine());
//By default handlebars looks for layout in a layouts folder the views folder
//here you can also define the name of the default layout, by default its main
// app.engine("hbs", engine({layoutDir: "views/handlebars/layouts", defaultLayout: "main"}));
// app.set("view engine", "hbs");
// app.set("views", "views/handlebars");

//* EJS
//ejs is supported by express out of the box
app.set("view engine", "ejs");


// app.use((req, res, next) => {
//   console.log("In the middleware");
//   next();
// });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  // res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
  res.status(404).render("404", { pageTitle: "Page Not Found" });
});

app.listen(3000);
