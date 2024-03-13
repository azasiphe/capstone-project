<template>
  <div class="product-details">
    
    <div v-for="product in products" :key="product.id" class="container">
      <div class="row">
        <div class="col-md-6">
          <h2 style="color: #ff1493; font-weight: bold; text-decoration: underline white 2px;">{{ product.car_name }}</h2>
          <img :src="product.image_url" :alt="product.car_name" />
        </div>
        <div class="col-md-6">
          <div class="content-container">
            <i id="ico" class="bi bi-speedometer2" style="color: blue; font-size: 32px;"></i>
            <span style="color: white;">Top Speed</span>
            <p style="color: white;">{{ product.top_speed }} km/h</p>
          </div>
          <div class="content-container">
            <i id="ico" class="bi bi-gear-fill" style="color: blue; font-size: 32px;"></i> 
            <span style="color: white;">Engine</span>
            <p style="color: white;">{{ product.engine }}</p>
          </div>
          <div class="content-container">
            <i id="ico" class="bi bi-arrow-up-left-circle-fill" style="color: blue; font-size: 32px;"></i>
            <span style="color: white;">Transmission</span>
            <p style="color: white;">{{ product.transmission }}</p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <p style="color: white;">Quantity: {{ product.quantity }}</p>
          <p style="color: white;">Price: {{ product.price }}</p>
          <p style="color: white;">Amount: {{ product.amount }}</p>
          <button @click="addToCart" style="color: white; background-color: blue; border: none; padding: 10px 20px; cursor: pointer;">Add to Cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    products() {
      return this.$store.state.products;
    },
  },
  methods: {
    fetchProduct(id) {
      this.$store.dispatch('fetchProduct', id);
    },
    addToCart(product) {
      this.$store.commit('addToCart', product);
     alert('added to cart ')
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
</style>
