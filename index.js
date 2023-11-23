import express from "express";
import ProductController from "./src/controllers/product.controller.js";
import UserController from "./src/controllers/user.controller.js";
import path from "path";
import ejsLayouts from "express-ejs-layouts";
import validationMiddleware from "./src/middlewares/validation.middleware.js";
import { uploadFile } from "./src/middlewares/file-upload.middlware.js";
import session from "express-session";
import { auth } from "./src/middlewares/auth.middleware.js";

const server = express();

server.use(express.static("public"));

server.use(
  session({
    secret: "SecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
//parse form data
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//setup view engine settings

server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

server.use(ejsLayouts);
const productController = new ProductController();

const usersController = new UserController();

server.get("/register", usersController.getRegister);

server.get("/login", usersController.getLogin);

server.post("/register", usersController.postRegister);

server.post("/login", usersController.postLogin);
server.get("/logout", usersController.logout);

server.get("/", auth, productController.getProducts);

server.get("/new", auth, productController.getAddForm);

server.post(
  "/",
  auth,
  uploadFile.single("imageUrl"),
  validationMiddleware,
  productController.addNewProduct
);

server.get("/update-product/:id", auth, productController.getUpdateProductView);

server.post("/update-product", auth, productController.postUpdateProduct);

server.post("/delete-product/:id", auth, productController.deleteProduct);

server.use(express.static("src/views"));

server.listen(8000);
2;
