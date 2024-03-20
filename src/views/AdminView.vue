<template>
  <div class="products vh-100">
  
    <nav class="navbar navbar-expand-lg navbar-dark bg-black">
    
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/admin">Products</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/users">Users</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/orders">Orders</router-link>
            </li>
          </ul>
        </div>
        <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent"></div>
      </div>
    </nav>

    <div class="add-product">
     
      <input v-model="car_name" type="text" placeholder="Car Name">
      <input v-model="quantity" type="number" placeholder="Quantity">
      <input v-model="amount" type="number" placeholder="Amount">
      <input v-model="image_url" type="text" placeholder="Product Image URL">
      <input v-model="category" type="text" placeholder="Name">
      <input v-model="engine" type="text" placeholder="Engine">
      <input v-model="top_speed" type="text" placeholder="Top Speed">
      <input v-model="transmission" type="text" placeholder="Transmission">
      <button class="add" @click="postProduct">Add</button>
    </div>
<div class="all">
  
    <table class="table-admin">
      <thead>
        <tr class="tb">
          <th>ID</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Amount</th>
          <th>Product Image</th>
          <th>Category</th>
          <th>Engine</th>
          <th>Top Speed</th>
          <th>Transmission</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody class="tb">
        <tr v-for="product in products" :key="product.prodID">
          <td>{{ product.id }}</td>
          <td>{{ product.car_name }}</td>
          <td>{{ product.quantity }}</td>
          <td>{{ product.amount }}</td>
          <td><img :src="product.image_url" alt="Product Image" style="max-width: 100px; max-height: 100px;"></td>
          <td>{{ product.category }}</td>
          <td>{{ product.engine }}</td>
          <td>{{ product.top_speed }}</td>
          <td>{{ product.transmission }}</td>
          <td><button class="edit" @click="editProduct(product)">Edit</button></td>
          <td><button class="delete" @click="deleteProduct(product.id)">Delete</button></td>
        </tr>
      </tbody>
    </table>
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
    

    const car_name= ref('');
    const quantity = ref("");
    const amount = ref('');
    const image_url = ref('');
    const category = ref('');
    const engine = ref('');
    const top_speed = ref('');
    const transmission = ref('');


    onMounted(() => {
      store.dispatch('fetchProducts');
    });

    const postProduct = () => {
      const newProduct = {
        car_name: car_name.value,
        quantity: quantity.value,
        amount: amount.value,
        image_url: image_url.value,
        category: category.value,
        engine: engine.value,
        top_speed: top_speed.value,
        transmission: transmission.value
      };
      store.dispatch('postProduct', newProduct);
      clearFields();
      window.alert('Product has been added.');
    };


    const clearFields = () => {
      car_name.value = '';
      quantity.value = 0;
      amount.value = 0;
      image_url.value = '';
      category.value = '';
      engine.value = '';
      top_speed.value = '';
      transmission.value = '';
    };

    
    const deleteProduct = (id) => {
      if (confirm('Are you sure you want to delete this product?')) {
        store.dispatch('deleteProduct', id);
        window.alert('Product has been deleted.');
      }
    };

   
    const editProduct = (product) => {
      car_name.value = product.car_name;
      quantity.value = product.quantity;
      amount.value = product.amount;
      image_url.value = product.image_url;
      category.value = product.category;
      engine.value = product.engine;
      top_speed.value = product.top_speed;
      transmission.value = product.transmission;
    };

    return {
      products,
      car_name,
      quantity,
      amount,
      image_url,
      engine,
      category,
      top_speed,
      transmission,
      postProduct,
      deleteProduct,
      editProduct
    };
  }
};
</script>

<style scoped>

.add-product {
display: flex;
flex-wrap: wrap;
gap: 10px;
}

.input-field {
padding: 5px;
border: 1px solid blue;
border-radius: 15px;
box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
width: calc(50% - 10px); 
}

.add {
padding: 8px;
background-color: blue;
color: white;
border-radius: 15px;
cursor: pointer;
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
.all{
  color: antiquewhite;
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