import { pool } from '../config/config.js';

const createOrder = async (productID, userID, quantity) => {
    await pool.query('INSERT INTO orders (productID, userID, quantity) VALUES (?, ?, ?)', [productID, userID, quantity]);
};

const getAllOrders = async () => {
    const [rows] = await pool.query('SELECT * FROM orders');
    return rows;
};

const getOrderById = async (orderID) => {
    const [rows] = await pool.query('SELECT * FROM orders WHERE orderID = ?', [orderID]);
    return rows[0];
};

const updateOrder = async (orderID, quantity) => {
    await pool.query('UPDATE orders SET quantity = ? WHERE orderID = ?', [quantity, orderID]);
};

const deleteOrder = async (orderID) => {
    await pool.query('DELETE FROM orders WHERE orderID = ?', [orderID]);
};

export { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder };