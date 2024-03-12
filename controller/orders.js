import { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder } from '../models/orders.js';

const createOrders = async (req, res) => {
    const { productID, userID, quantity } = req.body;

    try {
        await createOrder(productID, userID, quantity);
        res.status(201).json({ message: 'Order created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create order' });
    }
};

const getAllOrder = async (req, res) => {
    try {
        const orders = await getAllOrders();
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getOrder = async (req, res) => {
    const orderID = req.params.id;

    try {
        const order = await getOrderById(orderID);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateOrders = async (req, res) => {
    const orderID = req.params.id;
    const { quantity } = req.body;

    try {
        await updateOrder(orderID, quantity);
        res.status(200).json({ message: 'Order updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update order' });
    }
};

const deleteOrders = async (req, res) => {
    const orderID = req.params.id;

    try {
        await deleteOrder(orderID);
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete order' });
    }
};

export default { createOrders, getAllOrder, getOrder, updateOrders, deleteOrders };
