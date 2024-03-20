<template>
  <div class="cart">
    <h1 class="cart-heading">Your Cart</h1>
    <router-link class="nav-link" to="/products"><button class="back-button">Add Other Product</button></router-link>
    <table v-if="cartItems.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>IMAGE</th>
          <th>QUANTITY</th>
          <th>Amount</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in cartItems" :key="index">
          <td>{{ product.id }}</td>
          <td>{{ product.car_name }}</td>
          <td><img :src="product.image_url" :alt="product.car_name" /></td>
          <td>{{ product.quantity }}</td>
          <td>R{{ formatAmount(product.amount) }}</td>
          <td>
            <button @click="removeItem(index)">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else class="empty-cart-text">Nothing in your cart</p>
    <p class="subtotal">Subtotal: R{{ calculateSubtotal().toFixed(0) }}</p>
    <button class="pay-button" @click="order">Order</button>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  computed: {
    cartItems() {
      return this.$store.getters.cartItems;
    }
  },
  methods: {
    removeItem(index) {
      this.$store.commit('removeFromCart', index);
    },
    calculateSubtotal() {
      return this.cartItems.reduce((total, product) => total + (product.amount * product.quantity), 0);
    },
    formatAmount(amount) {
      return parseFloat(amount).toFixed(1);
    }
  }
};
</script>

<style scoped>
.cart-heading {
  color: white;
  font-size: 24px;
  text-shadow: 2px 2px blue;
  text-decoration: underline;
}

.empty-cart-text {
  color: white;
  font-size: 18px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
td{
  color: white;
}
td, th {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;

}

th {
  background-color: #f2f2f2;
}

.back-button, .pay-button {
  background-color: blue;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 20px;
}

.pay-button {
  background-color: green;
}

.subtotal {
  color: white;
  text-shadow: red 8px 4px 20px;
  text-decoration: underline;
  font-size: 24px;
  margin-top: 20px;
}
</style>
