// Vista de Login

import logger from "../utils/logger";

export const loginController = async (req, res) => {
    res.render("session/login");
     };


// Vista del Registro de usuario

export const registerController = async (req, res) => {
    res.render('session/register');
     };


// Ruta para hacer login ** Habilitar para desafío de login sin passport**
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password)
//     return res
//       .status(400)
//       .json({ status: "error", error: "Favor de llenar todos los campos" });

//   const user = await usersModel.findOne({email });

//   if (!user)
//     return res
//       .status(401)
//       .render("partials/errors", { error: "Wrong password or username" });

//   if (!isValidPassword(user, password))
//     return res
//       .status(401)
//       .render("partials/errors", { error: "Wrong password or username" });

//   req.session.user = user;

    
    // const access_token = generateToken(user)
    // res.send({status: 'success', access_token})

//   res.redirect("/mongoose/products");
// });


// //Vista para hacer registro y con jwt

// router.post('/register', async (req, res) => {

// const { first_name, last_name, email, age} = req.body

// const AuthRol = (req, res, next) => {
//   if (req.session?.user) {
//     if (
//       req.session.user.email === "adminCoder@coder.com" &&
//       bcrypt.compareSync("adminCod3r123", req.session.user.password)
//     ) {
//       req.session.user.role = "Admin";
//       delete req.session.user.password;
//       return next();
//     }
//     req.session.user.role = "User";
//     delete req.session.user.password;
//     return next();
//   }
//   return next();
// };

//   const user = {
//     first_name: req.body.first_name,
//     last_name: req.body.last_name,
//     email: req.body.email,
//     age:req.body.age,
//     password: (createHash(req.body.password)), 
//   };

//   if (!first_name || !last_name || !email || !age)
//     return res
//       .status(400)
//       .json({ status: "error", message: "error Register" });

//   const existUser = await usersModel.findOne({ email: user.email });

//   if (existUser)
//     return res.json({
//       status: "error",
//       message: "Ya existe un usuario con ese email",
//     });

//   (await usersModel.create(user)).save();

    // const access_token = generateToken(user)
    // res.send({status: 'success', access_token})

//   res.redirect("/session/login");


// });

//** **


// Vista para hacer registro con passport ** Ocultar para desafío de login **

export const registerPassportController = async (req, res) => {
    res.redirect('/session/login');
     };


export const loginPassportController = async (req, res) => {
    res.redirect('/products')
    // console.log(req.user);
    logger.info(req.user);
     };

// Ruta con github

export const githubController = async (req, res) => {};


 // Ruta callback github
 
 export const githubCallbackController = async (req, res) => {
    console.log('Callback: ', req.user)
    req.session.user = req.user
    logger.info('User session:', req.session.user)
    res.redirect('/products')
 };

 
// Ruta de errores

export const errorsController = async (req, res) => {
    res.render('partials/errors');
};


// // Ruta de errores
// router.get("/error", (req, res) => {
//   res.render("partials/errors");
// });

// Vista para hacer logout

export const logoutController = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
          logger.error(err);
          res.status(500).render('partials/errors', { error: err });
        } else res.redirect("/session/login");
      });
};

export const currentController = async (req, res) => {
    if(!req.session.user) return res.status(401).json({status: 'error', error: 'Favor de iniciar sesión'})
  res.status(200).json({status: 'success', payload: req.session.user})
   logger.info(req.session)
};

export const currentViewController = (req, res) => {
    const user = new UserDTO(req.user.user)
    res.render("session/current", { user })
  }
