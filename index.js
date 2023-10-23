import express from "express";
import ProductController from "./src/controllers/product.controller.js";
import path from "path";
import ejsLayouts from "express-ejs-layouts";

const server = express();
//parse form data
server.use(express.urlencoded({ extended: true }));

//setup view engine settings
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

server.use(ejsLayouts);
const productController = new ProductController();

server.get("/", productController.getProducts);
server.get("/new", productController.getAddForm);
server.post("/", productController.addNewProduct);

server.use(express.static("src/views"));
server.listen(8000);
2;