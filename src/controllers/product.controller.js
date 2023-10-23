import ProductModel from "../models/product.model.js";
export default class ProductController {
  getProducts(req, res) {
    let products = ProductModel.get();

    return res.render("products", { products: products });
    // return res.sendFile(
    //   path.join(path.resolve(), "src", "views", "products.html")
    // );
  }

  getAddForm(req, res) {
    return res.render("new-product");
  }
  addNewProduct(req, res) {
    const { name, price, imageUrl } = req.body;

    let errors = [];
    if (!name || name.trim() == "") {
      errors.push("Name is Required");
    }
    if (!price || parseFloat(price) < 1) {
      errors.push("Price must be a positive value");
    }
    try {
      const validUrl = new URL(imageUrl);
    } catch (error) {
      errors.push("URL is invalid");
    }

    if (errors.length > 0) {
      return res.render("new-product", { errorMessage: errors[0] });
    }
    ProductModel.add(req.body);
    let products = ProductModel.get();
    return res.render("products", { products: products });
  }
}
