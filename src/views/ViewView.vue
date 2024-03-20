<template>
  <div class="product-details">

    <div v-for="product in products" :key="product.id" class="container">
      
      <div class="row">
        <div class="col-md-6">
          <h2 style="">{{ product.car_name }}</h2>
          <img :src="product.image_url" :alt="product.car_name" />
        </div>
        <div class="col-md-6">
          <div class="content-container">
            <i id="ico" class="bi bi-speedometer2" style="color: blue; font-size: 90px;"></i>
            <span style="color: white; font-size: 30px;">Top Speed</span>
            <p style="color: white; font-size: 20px;">{{ product.top_speed }} km/h</p>
          </div>
          <div class="content-container">
            <i id="ico" class="bi bi-gear-fill" style="color: blue; font-size: 90px;"></i>
            <span style="color: white; font-size: 30px;">Engine</span>
            <p style="color: white; font-size: 20px;">{{ product.engine }}</p>
          </div>
          <div class="content-container">
            <i id="ico" class="bi bi-arrow-up-left-circle-fill" style="color: blue; font-size: 90px;"></i>
            <span style="color: white; font-size: 30px;">Transmission</span>
            <p style="color: white; font-size: 20px;">{{ product.transmission }}</p>
          </div>
        </div>


      </div>
      <div class="row">
        <div class="col-md-12">
          <!-- <p style="color: white;">Quantity: {{ product.quantity }}</p> -->
          <p style="color: blue; font-size: 20px;">Amount: {{ product.amount }}</p>
          <button @click="addToCart(product)"
            style="color: white; background-color: blue; border: none; padding: 10px 20px; cursor: pointer;">Add to
            Cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
export default {
  computed: {
    products() {
      return this.$store.state.product;
    },
  },
  methods: {
    fetchProduct(id) {
      this.$store.dispatch('fetchProduct', id);
    },
    addToCart(product) {
      this.$store.dispatch('addToCart', product);
      alert('Added to cart');
    }  
  },
  mounted() {
    this.fetchProduct(this.$route.params.id);
  },
};
</script>


<style scoped>
.content-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  color: antiquewhite;
}

.content-container i {
  font-size: 24px;
  margin-right: 10px;
}

.content-container span {
  font-weight: bold;
  margin-right: 10px;
}

.col-md-6 {
  display: flex;
  flex-direction: column;
  padding: 50px;
}

h2 {
  font-size: 40px;
  text-shadow: 5px 5px 10px rgba(16, 207, 245, 0.8);
  color: #f51014;
  text-decoration: underline 2px solid white;
}
</style>
