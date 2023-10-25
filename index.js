import express from "express";
import ProductController from "./src/controllers/product.controller.js";
import path from "path";
import ejsLayouts from "express-ejs-layouts";
import validationMiddleware from "./src/middlewares/validation.middleware.js";

const server = express();

server.use(express.static("public"));
//parse form data
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//setup view engine settings

server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

server.use(ejsLayouts);
const productController = new ProductController();

server.get("/", productController.getProducts);
server.get("/new", productController.getAddForm);
server.post("/", validationMiddleware, productController.addNewProduct);
server.get(
  "/update-product/:id",

  productController.getUpdateProductView
);
server.post("/update-product", productController.postUpdateProduct);
server.post(
  "/delete-product/:id",

  productController.deleteProduct
);
server.use(express.static("src/views"));
server.listen(8000);
2;
