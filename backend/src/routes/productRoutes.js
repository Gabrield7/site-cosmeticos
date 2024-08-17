import express from 'express';
import ProductController from '../controllers/productController.js';

const routes = express.Router();

routes.get("/produtos", ProductController.listProducts);

export default routes;

