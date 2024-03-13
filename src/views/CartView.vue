<template>
    <div>
      <h1 :style="{ 'font-weight': addProductMode ? 'bold' : 'normal', 'text-shadow': addProductMode ? '0 0 5px #ff0000, 0 0 10px #ff0000, 0 0 15px #ff0000' : 'none' }">Shopping Cart</h1>
      <div v-if="cart.length === 0">Your cart is empty</div>
      <div v-else>
        <table class="table">
          <thead>
            <tr>
                <th>ID</th>
              <th>Image</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cart" :key="item.id">
                <td>{{ item.id }}</td>
              <td><img :src="item.image_url" alt="Product Image" style="max-width: 100px;" /></td>
              <td>{{ item.car_name }}</td>
              <td>${{ item.amount }}</td>
              <td>{{ item.quantity }}</td>
              <td>
                <button @click="removeFromCart(item)" class="btn btn-danger"><i class="bi bi-trash"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
        <button @click="checkout" class="btn btn-primary">Checkout</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cart: [],
        addProductMode: false,
      };
    },
    methods: {
        removeFromCart(item) {
 
      const index = this.cart.findIndex(cartItem => cartItem.id === item.id);
      if (index !== -1) {
        this.cart.splice(index, 1);
      }
    },
      checkout() {
        // Implement checkout process
        // Redirect to checkout page or display payment form
      },
    },
    created() {
      // Fetch cart items from backend
      // This is just a mock, replace with actual API call
      this.cart = [
        { id: 1, car_name: 'Product 1', amount: 100, quantity: 2, image_url: 'product1.jpg' },
        { id: 2, car_name: 'Product 2', amount: 150, quantity: 1, image_url: 'product2.jpg' },
      ];
    },
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  .btn {
    cursor: pointer;
  }
  </style>
  