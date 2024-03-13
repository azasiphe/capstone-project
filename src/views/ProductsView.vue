<template>
  <div class="products">
    <h1 class="display-1" :style="{ }">{{ typedHeading }}</h1>
    <div class="container mt-4">
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle ml-4" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
          Filter
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <li><button @click="sortByPrice" class="btn btn-primary">Sort by Price</button></li>
          <li><button @click="sortByAlphabet" class="btn btn-primary">Sort Alphabetically</button></li>
        </ul>
      </div>
      <input type="text" v-model="searchTerm" placeholder="Search..." class="form-control mb-3" />
     
      <div class="row">
        <div v-for="product in filteredProducts" :key="product.id" class="col-md-4">
          <div class="card mb-4" @mouseover="hovering = true" @mouseleave="hovering = false" :class="{ 'hovered': hovering }">
            <h5 class="card-title" :style="{ fontWeight: 'bold'}">{{ product.car_name }}</h5>

            <img :src="product.image_url" class="" :alt="product.car_name" />
            <p class="card-text" :style="{ fontWeight: 'bold' }">Amount: {{ product.amount }}</p>
            <div class="card-body">
              <router-link v-if="hovering" @click="fetchProduct(product.id)" :to="{ name: 'view', params: { id: product.id }}" class="btn btn-dark">View more details</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const products = computed(() => store.getters.allProducts);
    const fetchProducts = () => {
      store.dispatch('fetchProducts').catch(error => {
        console.error('Error fetching products:', error);
      });
    };

    const textColor = ref('black');
    const fontWeight = ref('normal');
    const fontSize = ref('60px');
    const typedHeading = ref('');
    let typingIndex = 0;
    let typingInterval;

    const startTyping = () => {
      typingInterval = setInterval(() => {
        typedHeading.value = "Welcome to our garage".slice(0, typingIndex);
        typingIndex++;
        if (typingIndex > "Welcome to our garage".length) {
          clearInterval(typingInterval);
        }
      }, 100);
    };

    startTyping();

    const hovering = ref(false);
    const searchTerm = ref('');
    const sortedByPrice = ref(false);

    const filteredProducts = computed(() => {
      return products.value.filter(product => {
        return product.car_name.toLowerCase().includes(searchTerm.value.toLowerCase());
      }).sort((a, b) => {
        if (sortedByPrice.value) {
          return a.amount - b.amount;
        } else {
          return a.car_name.localeCompare(b.car_name);
        }
      });
    });

    const sortByPrice = () => {
      sortedByPrice.value = true;
    };

    const sortByAlphabet = () => {
      sortedByPrice.value = false;
    };

    return {
      products,
      fetchProducts,
      hovering,
      textColor,
      fontWeight,
      fontSize,
      typedHeading,
      searchTerm,
      filteredProducts,
      sortByPrice,
      sortByAlphabet
    };
  },
  methods: {
    fetchProduct(id) {
      this.$store.dispatch('fetchProduct', id);
    }
  },
  mounted() {
    this.fetchProducts();
  }
};
</script>

<style scoped>
h1
{ 
  color: aliceblue;
  text-decoration: underline;
  text-shadow: blue 3px 4px 2px;
}
h5{
  color: aliceblue;
  font-size: 25px;
  text-shadow:blue 8px 8px 20px;
}
p{
  color: aliceblue;
text-decoration: underline 3px solid white;
  font-size: 15px;
  text-shadow:blue 8px 8px 20px;
}

.card {
  border: none;
  background-color: rgba(255, 255, 255, 0.1);
}

.card:hover {
  background-color: rgba(258, 258, 258, 0.3);
}

.row {
  position: relative;
  top: 50px;
}

.card .card-body {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card button {
  display: none;
}

.card:hover button {
  display: block;
}

.hovered button {
  display: block;
}

.display {
  text-decoration: underline;
  position: relative;
  top: 20px;
}

#ima {
  width: 60%;
}
</style>
