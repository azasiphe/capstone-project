<template>
    <div class="products vh-100">
      <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-black">
  <div class="container-fluid">
    

 
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/users">Users</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/prod">Products</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/orders">Orders</router-link>
        </li>
      </ul>
    </div>

    <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
     
    </div>
  </div>
</nav>
  
        <div class="add-product">
          <button class="add" @click="openAddModal"><i class="bi bi-plus-square"></i> Add Product</button>
        </div>
  
        <table class="table-admin">
          <thead>
            <tr class="tb">
              <th>ID</th>
              <th>Car Name</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Product Image</th>
              <th>Category</th>
              <th>Top Speed</th>
              <th>Engine</th>
              <th>Transmission</th>
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
              <td>{{ product.category }}</td>
              <td>{{ product.top_speed }}</td>
              <td>{{ product.engine }}</td>
              <td>{{ product.transmission }}</td>
              <td><button class="edit" @click="openEditModal(product)"><i class="fas fa-edit"></i> Edit</button></td>
              <td><button class="delete" @click="deleteProduct(product.id)"><i class="fas fa-trash-alt"></i> Delete</button></td>
            </tr>
          </tbody>
        </table>
      </div>
  
      
      <div class="modal" v-if="modalVisible">
        <div class="modal-content">
          <span class="close" @click="closeModal">&times;</span>
          <h2>{{ modalType === 'add' ? 'Add Product' : 'Edit Product' }}</h2>
          <input v-model="form.car_name" type="text" placeholder="Car Name">
          <input v-model="form.quantity" type="number" placeholder="Quantity">
          <input v-model="form.amount" type="number" placeholder="Amount">
          <input v-model="form.image_url" type="text" placeholder="Product Image URL">
          <input v-model="form.top_speed" type="text" placeholder="Product top speed">
          <input v-model="form.engine" type="text" placeholder="Product engine">
          <input v-model="form.transmission" type="text" placeholder="Product transmission">
          
          <button @click="submitForm">{{ modalType === 'add' ? 'Add' : 'Save' }}</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { onMounted, ref } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    setup() {
      const store = useStore();
      const products = store.getters.allProducts;
      const modalVisible = ref(false);
      const modalType = ref('');
      const form = ref({
        car_name: '',
        quantity: '',
        amount: '',
        image_url: '',
        top_speed :'',
        engine:'',
        transmission:''
      });
  
      const openAddModal = () => {
        modalType.value = 'add';
        modalVisible.value = true;
      };
  
      const openEditModal = (product) => {
        modalType.value = 'edit';
        form.value = { ...product };
        modalVisible.value = true;
      };
  
      const closeModal = () => {
        modalVisible.value = false;
        form.value = {
          car_name: '',
          quantity: '',
          amount: '',
          image_url: '',
          top_speed :'',
        engine:'',
        transmission:''
        };
      };
  
      const submitForm = () => {
        if (modalType.value === 'add') {
          store.dispatch('addProduct', form.value);
        } else if (modalType.value === 'edit') {
          store.dispatch('updateProduct', form.value);
        }
        closeModal();
      };
  
      const deleteProduct = (productId) => {
        if (confirm('Are you sure you want to delete this product?')) {
          store.dispatch('deleteProduct', productId);
        }
      };
  
      onMounted(() => {
        store.dispatch('fetchProducts');
      });
  
      return {
        products,
        modalVisible,
        modalType,
        form,
        openAddModal,
        openEditModal,
        closeModal,
        submitForm,
        deleteProduct
      };
    }
  };
  </script>
  

  
 
  

  <style scoped>


.products{
    color: white;
background-size: cover;
    
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
  background-color: blue;
  color: antiquewhite;
}
.delete{
  padding: 10px;
  border: 3px;
  border-radius: 10px;
  background-color: blue;
  color: white;
  
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