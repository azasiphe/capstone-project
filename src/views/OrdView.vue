<template>
        <div>
   
   <nav>
     <ul>
       <li><router-link to="/users">Users</router-link></li>
       <li><router-link to="/prod">Products</router-link></li>
       <li><router-link to="/orders">Orders</router-link></li>
     </ul>
   </nav>
   
 
   <router-view></router-view>
 </div>
 <div>
     
      <div v-if="orders.length">
        <h2>Orders</h2>
        <ul>
          <li v-for="order in orders" :key="order.orderID">
            Order ID: {{ order.orderID }} - Product ID: {{ order.productID }} - User ID: {{ order.userID }} - Quantity: {{ order.quantity }}
            <!-- Add buttons for update and delete -->
            <button @click="editOrder(order)">Edit</button>
            <button @click="deleteOrder(order.orderID)">Delete</button>
          </li>
        </ul>
      </div>
      
      <!-- Form for adding/editing order -->
      <div>
        <h2>{{ editing ? 'Edit Order' : 'Add Order' }}</h2>
        <form @submit.prevent="editing ? updateOrder() : addOrder()">
          <input type="number" v-model="form.productID" placeholder="Product ID" required>
          <input type="number" v-model="form.userID" placeholder="User ID" required>
          <input type="number" v-model="form.quantity" placeholder="Quantity" required>
          <!-- Add other input fields for order details -->
          <button type="submit">{{ editing ? 'Update' : 'Add' }}</button>
        </form>
      </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      orders: [],
      form: {
        productID: 0,
        userID: 0,
        quantity: 0,
        // Add other necessary form fields
      },
      editing: false,
      editingOrder: null,
    };
  },
  methods: {
    fetchOrders() {
      axios.get('/api/orders')
        .then(response => {
          this.orders = response.data;
        })
        .catch(error => {
          console.error('Error fetching orders:', error);
        });
    },
    addOrder() {
      axios.post('/api/orders', this.form)
        .then(response => {
          this.orders.push(response.data);
          this.resetForm();
        })
        .catch(error => {
          console.error('Error adding order:', error);
        });
    },
    editOrder(order) {
      this.editing = true;
      this.editingOrder = order;
      // Pre-fill the form with order details
      this.form.productID = order.productID;
      this.form.userID = order.userID;
      this.form.quantity = order.quantity;
      // Pre-fill other form fields as needed
    },
    updateOrder() {
      axios.put(`/api/orders/${this.editingOrder.orderID}`, this.form)
        .then(response => {
          // Update the order in the orders array
          const index = this.orders.findIndex(o => o.orderID === this.editingOrder.orderID);
          if (index !== -1) {
            this.orders.splice(index, 1, response.data);
          }
          this.resetForm();
        })
        .catch(error => {
          console.error('Error updating order:', error);
        });
    },
    deleteOrder(orderID) {
      axios.delete(`/api/orders/${orderID}`)
        .then(() => {
          // Remove the order from the orders array
          this.orders = this.orders.filter(order => order.orderID !== orderID);
        })
        .catch(error => {
          console.error('Error deleting order:', error);
        });
    },
    resetForm() {
      this.form.productID = 0;
      this.form.userID = 0;
      this.form.quantity = 0;
     
       },
    cancelEdit() {
      this.editing = false;
      this.resetForm();
    }
  },
  mounted() {
    this.fetchOrders();
  }
};
</script>
<style scoped>

.navbar {
  background-color: black;
  padding: 10px;
}

.navbar-nav {
  display: flex;
  list-style: none;
  padding: 0;
}

.navbar-nav li {
  margin-right: 20px;
}

.navbar-nav li a {
  text-decoration: none;
  color: white;
}

.navbar-nav li a:hover {
  color: lightgrey;
}
</style>

 