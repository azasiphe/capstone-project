<template>
    <div class="products vh-100">
      <div>
        <nav class="navbar">
          <ul class="navbar-nav">
            <li><router-link to="/users">Users</router-link></li>
            <li><router-link to="/prod">Products</router-link></li>
            <li><router-link to="/orders">Orders</router-link></li>
          </ul>
        </nav>
  
        <div class="add-product">
          <input v-model="car_name" type="text" placeholder="Car Name">
          <input v-model="quantity" type="number" placeholder="Quantity">
          <input v-model="amount" type="number" placeholder="Amount">
          <input v-model="prodUrl" type="text" placeholder="Product Image URL">
          <button class="add" @click="postProduct">Add</button>
        </div>
  
        <table class="table-admin">
          <thead>
            <tr class="tb">
              <th>ID</th>
              <th>Car Name</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Product Image</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody class="tb">
            <tr v-for="product in products" :key="product.id">
              <td>{{ product.id }}</td>
              <td>{{ product.car_name }}</td>
              <td>{{ product.quantity }}</td>
              <td>{{ product.amount }}</td>
              <td>
                <img :src="product.image_url" alt="Product Image" style="max-width: 100px; max-height: 100px;">
              </td>
              <td><button class="edit" @click="openEditModal(product)">Edit</button></td>
              <td><button class="delete" @click="deleteProduct(product.id)">Delete</button></td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Edit Product Modal -->
      <div class="modal" v-if="editMode">
        <div class="modal-content">
          <span class="close" @click="cancelEdit">&times;</span>
          <h2>Edit Product</h2>
          <input v-model="car_name" type="text" placeholder="Car Name">
          <input v-model="quantity" type="number" placeholder="Quantity">
          <input v-model="amount" type="number" placeholder="Amount">
          <input v-model="image_url" type="text" placeholder="Product Image URL">
          <button @click="saveEdit">Save</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { onMounted, computed, ref } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    setup() {
      const store = useStore();
  
      const products = computed(() => store.getters.allProducts);
  
      onMounted(() => {
        store.dispatch('fetchProducts');
      });
  
      const prodID = ref(null);
      const prodName = ref(null);
      const quantity = ref(null);
      const amount = ref(null);
      const prodUrl = ref(null);
      const editMode = ref(false);
      let editingProduct = null;
  
      const deleteProduct = (prodID) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this product?');
        if (confirmDelete) {
          store.dispatch('deleteProduct', prodID);
          window.alert('Product has been deleted.');
        }
      };
  
      const openEditModal = (product) => {
        editingProduct = product;
        prodID.value = product.id;
        prodName.value = product.car_name;
        quantity.value = product.quantity;
        amount.value = product.amount;
        prodUrl.value = product.image_url;
        editMode.value = true;
      };
  
      const saveEdit = () => {
        const editedProduct = {
          id: prodID.value,
          car_name: prodName.value,
          quantity: quantity.value,
          amount: amount.value,
          image_url: prodUrl.value
        };
        store.dispatch('updateProduct', editedProduct);
        editMode.value = false;
        clearFields();
      };
  
      const clearFields = () => {
        prodID.value = null;
        prodName.value = null;
        quantity.value = null;
        amount.value = null;
        prodUrl.value = null;
      };
  
      const cancelEdit = () => {
        editMode.value = false;
        clearFields();
      };
  
      const postProduct = () => {
        const newProduct = {
          car_name: prodName.value,
          quantity: quantity.value,
          amount: amount.value,
          image_url: prodUrl.value
        };
        store.dispatch('postProduct', newProduct);
        clearFields();
        window.alert('Product has been added.');
      };
  
      return {
        products,
        prodID,
        prodName,
        quantity,
        amount,
        prodUrl,
        editMode,
        editingProduct,
        saveEdit,
        cancelEdit,
        deleteProduct,
        postProduct
      };
    }
  };
  </script>
  
 
  

  <style scoped>


.products{
    color: white;
    
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid black;
    text-align: left;
    padding: 5px;
  }
  
 
  .add-product {
  display: flex;
  padding:20px;
  gap:10px;
  margin: 0 0 0 8%;
  border: 5px;
 border-radius: 20px solid black;
  
}
.edit{
  padding: 13px;
  border: 4px;
  border-radius: 11px;
  background-color: white;
  color: black;
}
.delete{
  padding: 10px;
  border: 3px;
  border-radius: 10px;
  background-color: black;
  color: yellow;
  
}
.delete:hover{
  background-color: purple;
}
.edit:hover{
  background-color: purple;
}
.input-field {
  margin-right: 10px;
}

.add {
  padding: 8px 16px;
  background-color: blue;
  color: white;
  border-radius: 5px  ;
  cursor: pointer;
}

.add-button:hover {
  background-color: #0056b3;
}




.navbar {
  background-color: black;
  padding: 10px;
  text-align: center;
}

.navbar-nav {
  display: flex;
  list-style: none;
  padding: 0;
  text-align: center;
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