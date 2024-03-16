import { pool } from '../config/config.js';

const getProducts = async () => {
  const [rows] = await pool.query('SELECT * FROM products');
  return rows;
};

const getSingle = async (id) => {
  const [response] = await pool.query(`
    SELECT * FROM products
    WHERE id=?
  `, [id]);
  return response;
};

const postProduct = async (car_name, quantity, amount, image_url, category,top_speed,engine,transmission) => {
  let [item] = await pool.query(`
    INSERT INTO products (car_name, quantity, amount, image_url, category,top_speed, engine, transmission) VALUES (?,?,?,?,?,?,?,?)
  `, [car_name, quantity, amount, image_url, category,top_speed,engine,transmission]);
  return getProducts();
};

const deleteProduct = async (id) => {
  await pool.query(`
    DELETE FROM products WHERE id = ?
  `, [id]);
  return getProducts();
};

const updateProduct = async (id, car_name, quantity, amount, image_url, category,top_speed, engine, transmission) => {
  await pool.query(`
    UPDATE products
    SET car_name=?, quantity=?, amount=?, image_url=?, category=?,top_speed=?, engine=?, transmission=?,
    WHERE id=?
  `, [car_name, quantity, amount, image_url, category,top_speed, engine, transmission, id]);
  return getSingle(id);
};

export { getProducts, postProduct, deleteProduct, updateProduct, getSingle };
