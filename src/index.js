const { renderFile } = require("ejs");
const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const { request } = require("http");
const morgan = require("morgan");
const path = require("path");
const app = express();
//const {client} = require("pg")
 
const { pool } = require ("../dbConfig")

// settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine('html', require('ejs').renderFile);
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false}));


// middlewares
app.use(morgan("dev"));

// routes
app.use(require("./routes"));

// static files
app.use(express.static(path.join(__dirname, "public")));



app.get("/", (req, res) => {
  res.render("index.hmtl");
});

app.get("/users/register", (req, res) => {
  res.render("register.html");
});

app.get("/users/login", (req, res) => {
  res.render("login.html");
});

app.get("/users/dashboard", (req, res) => {
  res.render("dashboard.html", {user: "Admi"});
});

app.post('/users/register', (req, res) =>{
  let { nombre, apellido, genero, correo, contrasena, contrasena2} = req.body;

  console.log({
    nombre,
    apellido,
    correo,
    contrasena,
    contrasena2,
    genero
  });
  
  //let errors=[];

  //if (!nombre || !apellido || !correo || !contrasena || !genero) 
  //{
  //  errors.push({message:"ingresar todos los campos"});
  //}
});


// listening the Server
app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});


