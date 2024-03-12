import express from 'express';
import ordersController from '../controller/orders.js';


const router = express.Router();


router.post('/', ordersController.createOrders);
router.get('/', ordersController.getAllOrder);
router.get('/:id', ordersController.getOrder);
router.put('/:id', ordersController.updateOrders);
router.delete('/:id', ordersController.deleteOrders);

export default router;