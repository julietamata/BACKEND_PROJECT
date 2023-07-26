import { Router } from "express";
// import UserModel from "../dao/models/user.model";

const router = Router()

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
    return res.status(400).json({ status: "error", error: "Favor de llenar todos los campos" });

  const user = await userModel.findOne({ email: email });

  if (!user)
    return res.status(401).render("partials/errors", { error: "Wrong password or username" });
  if (!isValidPassword(user, password))
    return res.status(401).render("partials/errors", { error: "Wrong password or username" });
  req.session.user = user;
  res.redirect("/products");
});



// Vista del Registro de usuario
  router.get("/register", (req, res) => {
    res.render("session/register");
  });

// Vista para hacer registro
  router.post("/register", async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    if (!first_name || !last_name || !email || !age)
      return res.status(400).json({ status: "error", message: "error Register" });

    let user = {
      first_name,
      last_name,
      email,
      age,
      password: createHash(password),
    };

    const existUser = await userModel.findOne({ email: user.email });

    if (existUser)
      return res.json({
        status: "error",
        message: "Ya existe un usuario con ese email",
      });

    await userModel.create(user);
    res.redirect("/sessions/login");
});


// Ruta de errores

router.get("/error", (req, res) => {
  res.render("partials/errors");
});


// Vista para hacer logout
  router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) {
            console.log(err);
            res.status(500).render('errors/base', {error: err})
        } else res.redirect('/session/login')
    })
  })
  


export default router



 