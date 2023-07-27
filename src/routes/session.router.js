// import { Router } from "express";
// import userModel from "../dao/models/users.model.js";

// const router = Router()

// // Ruta de errores

// router.get("/error", (req, res) => {
//   res.render("partials/errors");
// });

// // Vista de Login
// router.get("/login", (req, res) => {
//     res.render("session/login");
//   });

// // Ruta para hacer login
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password)
//     return res.status(400).json({ status: "error", error: "Favor de llenar todos los campos" });

//   const user = await userModel.findOne({ email: email });

//   if (!user)
//     return res.status(401).render("partials/errors", { error: "Wrong password or username" });
//   if (!isValidPassword(user, password))
//     return res.status(401).render("partials/errors", { error: "Wrong password or username" });
//   req.session.user = user;
//   res.redirect("/mongoose/products");
// });



// // Vista del Registro de usuario
//   router.get("/register", (req, res) => {
//     res.render("session/register");
//   });

// // Vista para hacer registro
//   router.post("/register", async (req, res) => {
//     const { first_name, last_name, email, age, password } = req.body;
//     if (!first_name || !last_name || !email || !age)
//       return res.status(400).json({ status: "error", message: "error Register" });

//     let user = {
//       first_name,
//       last_name,
//       email,
//       age,
//       password: createHash(password),
//     };

//     const existUser = await userModel.findOne({ email: user.email });

//     if (existUser)
//       return res.json({
//         status: "error",
//         message: "Ya existe un usuario con ese email",
//       });

//     await userModel.create(user);
//     res.redirect("/session/login");
// });


// // Ruta de errores

// router.get("/error", (req, res) => {
//   res.render("partials/errors");
// });


// // Vista para hacer logout
//   router.get('/logout', (req, res) => {
//     req.session.destroy(err => {
//         if(err) {
//             console.log(err);
//             res.status(500).render('partials/error', {error: err})
//         } else res.redirect('/session/login')
//     })
//   })
  


// export default router



 








// session.router.js

import { Router } from "express";
import userModel from "../dao/models/users.model.js";
import bcrypt from "bcrypt";

const router = Router();

// contraseñas 




// Ruta de errores
router.get("/error", (req, res) => {
  res.render("partials/errors");
});

// Vista de Login
router.get("/login", (req, res) => {
  res.render("session/login");
});

// Ruta para hacer login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ status: "error", error: "Favor de llenar todos los campos" });

  const user = await userModel.findOne({ email: email });

  if (!user)
    return res
      .status(401)
      .render("partials/errors", { error: "Wrong password or username" });

  if (!(await user.isValidPassword(password)))
    return res
      .status(401)
      .render("partials/errors", { error: "Wrong password or username" });

  req.session.user = user;
  res.redirect("/mongoose/products");
});

// Vista del Registro de usuario
router.get("/register", (req, res) => {
  res.render("session/register");
});

// Vista para hacer registro
router.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;

  const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

const AuthRol = (req, res, next) => {
  if (req.session?.user) {
    if (
      req.session.user.email === "adminCoder@coder.com" &&
      bcrypt.compareSync("adminCod3r123", req.session.user.password)
    ) {
      req.session.user.role = "Admin";
      delete req.session.user.password;
      return next();
    }
    req.session.user.role = "User";
    delete req.session.user.password;
    return next();
  }
  return next();
};

  if (!first_name || !last_name || !email || !age)
    return res
      .status(400)
      .json({ status: "error", message: "error Register" });

  let user = {
    first_name,
    last_name,
    email,
    age,
    password: await userModel.createHash(password), // Use encryptPassword method to hash the password
  };

  const existUser = await userModel.findOne({ email: user.email });

  if (existUser)
    return res.json({
      status: "error",
      message: "Ya existe un usuario con ese email",
    });

  await userModel.create(user);
  res.redirect("/session/login");
});

// Ruta de errores
router.get("/error", (req, res) => {
  res.render("partials/errors");
});

// Vista para hacer logout
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.status(500).render("partials/error", { error: err });
    } else res.redirect("/session/login");
  });
});

export default router;
