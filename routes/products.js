import express from 'express';
import productsController from '../controller/products .js';

const router = express.Router();

router.get('/', productsController.getAllProducts);
router.post('/', productsController.addProduct);
router.put('/:id', productsController.updateProductByID);
router.get('/:id', productsController.getSingleProduct);
router.delete('/:id', productsController.deleteProductByID);

export default router;
