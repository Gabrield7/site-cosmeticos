import produto from '../models/produtos.js';

class ProductController {
    static async listProducts(req, res){
        try {
            const products = await produto.find({});
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({message: "Falha na requisição"})
        }
    }
}

export default ProductController;