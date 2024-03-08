import { getProducts, postProduct, deleteProduct, updateProduct, getSingle } from '../models/products.js';

const getAllProducts = async (req, res) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const getSingleProduct = async (req, res) => {
  try {
    const product = await getSingle(+req.params.id);
    res.json(product);
  } catch (error) {
    console.error('Error fetching single product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const addProduct = async (req, res) => {
  const { car_name, quantity, amount, image_url, category } = req.body;
  try {
    await postProduct(car_name, quantity, amount, image_url, category);
    const products = await getProducts();
    res.json(products);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const deleteProductByID = async (req, res) => {
  try {
    await deleteProduct(req.params.id);
    const products = await getProducts();
    res.json(products);
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const updateProductByID = async (req, res) => {
  const { car_name, quantity, amount, image_url, category } = req.body;
  try {
    await updateProduct(req.params.id, car_name, quantity, amount, image_url, category);
    const products = await getProducts();
    res.json(products);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export default { getAllProducts, getSingleProduct, addProduct, deleteProductByID, updateProductByID };
