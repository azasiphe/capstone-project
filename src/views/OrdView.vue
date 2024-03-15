<template>
        <nav class="navbar navbar-expand-lg navbar-dark bg-black">
  <div class="container-fluid">
    

 
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

   
    <div class="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/prod">Products</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/orders">Orders</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/users">Users</router-link>
        </li>
      
      </ul>
    </div>

    <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
     
    </div>
  </div>
</nav>
 <div>
     
      <div v-if="orders.length">
        <h2>Orders</h2>
        <ul>
          <li v-for="order in orders" :key="order.orderID">
            Order ID: {{ order.orderID }} - Product ID: {{ order.productID }} - User ID: {{ order.userID }} - Quantity: {{ order.quantity }}
       
            <button @click="editOrder(order)">Edit</button>
            <button @click="deleteOrder(order.orderID)">Delete</button>
          </li>
        </ul>
      </div>
      
     
      <div>
        <h2>{{ editing ? 'Edit Order' : 'Add Order' }}</h2>
        <form @submit.prevent="editing ? updateOrder() : addOrder()">
          <input type="number" v-model="form.productID" placeholder="Product ID" required>
          <input type="number" v-model="form.userID" placeholder="User ID" required>
          <input type="number" v-model="form.quantity" placeholder="Quantity" required>
    
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
     
      this.form.productID = order.productID;
      this.form.userID = order.userID;
      this.form.quantity = order.quantity;
  
    },
    updateOrder() {
      axios.put(`/api/orders/${this.editingOrder.orderID}`, this.form)
        .then(response => {
      
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

 