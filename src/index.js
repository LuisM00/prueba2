const { renderFile } = require("ejs");
const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const { request } = require("http");
const morgan = require("morgan");
const path = require("path");
const app = express();
const bcrypt = require("bcrypt"); 
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

app.post("/users/registroProducto", async (req, res) => {
  res.render("registroProducto.html");
  let { nombre, descripcion, stock, select_estado, select_marca, precio_de_adquisicion, precio_de_venta, imagen } = req.body;
      console.log({nombre, descripcion, stock, select_estado, select_marca, precio_de_adquisicion, precio_de_venta, imagen})
      console.log(req.body)
    try {

        pool.query(
            "INSERT INTO articulo( nombre, descripcion, stock, estado, marca, precio, precio_compra, imagen ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
            [nombre, descripcion, stock, select_estado, select_marca, precio_de_venta, precio_de_adquisicion, imagen],
            (error, results) => {
                if (error) {
                    console.log( error );
                }
                res.redirect("/users/registroProducto");
            }
        )
    } catch (error) {
        console.log(error);
    }
});

app.post('/users/register', async (req, res) =>{
  let { nombre, apellido, genero, correo, contrasena, contrasena2} = req.body;
    if ( contrasena !== contrasena2 ) 
    {
      res.render("register.html", {
        error: "Las contraseñas no coinciden"
      });
    } 
    else 
    {
      pool.query(
        "INSERT INTO usuarios (nombre, apellido, genero, correo, contrasena) VALUES ($1, $2, $3, $4, $5)",
        [nombre, apellido, genero, correo, contrasena],
        (error, results) => {
          if (error) {
            console.log(error);
            res.render("register.html", {
              error: "Hubo un error al registrar el usuario"
            });
          } else {
            res.redirect("/users/login");
          }
        }
      );
    }

    if ( contrasena.lenght < 6) {
      errors.push({message: "La contraseña debe tener al menos 6 caracteres"});
    }

    /*if(errors.lenght > 0){
      res.render("register.html", { errors})
    }else{
      let hashedPassword = await bcrypt.hash(contrasena, 10);
      console.log(hashedPassword);
    }*/


    if ( contrasena !== contrasena2 ) {
        errors.push({message: "Las contraseñas no coinciden"});
    }
    pool.query(
      
      "INSERT INTO usuarios (nombre, apellido, genero, correo, contrasena) VALUES ($1, $2, $3, $4, $5)",
      [nombre, apellido, genero, correo, contrasena],
      (error, results) => {
      if (error) {
        console.log(error);
        res.render("register.html", {
          error: "Hubo un error al registrar el usuario"
          });
      } else {
        res.redirect("/users/login");
      }
      });

});


// listening the Server
app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
