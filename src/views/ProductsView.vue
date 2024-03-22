<template>
  <div class="products">
    <button>
      <div>
        <h1 class="display-1">{{ typedHeading }}</h1>
      </div>
    </button>
    <div class="container mt-4">
      <div class="d-flex align-items-center"> 
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle ml-4" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
            Filter
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li @click="sortByPrice" class="btn btn-primary">Sort by Price</li>
            <li @click="sortByAlphabet" class="btn btn-primary">Sort Alphabetically</li>
          </ul>
        </div>
        <input type="text" v-model="searchTerm" placeholder="Search..." class="form-control mb-2 ml-4" />
      </div>

      <div class="row">
        <div v-for="product in filteredProducts" :key="product.id" class="col-md-4">
          <div :class="{ 'card': true, 'charizard': product.isCharizard }" @mouseover="hovering = product.id" @mouseleave="hovering = null">
            <h5 class="card-title">{{ product.car_name }}</h5>
            <img :src="product.image_url" width="60%" class="img-fluid" :alt="product.car_name" />
            <p class="card-text">Amount: {{ product.amount }}</p>
            <div class="card-body">
              <router-link v-if="hovering === product.id" @click="fetchProduct(product.id)" :to="{ name: 'view', params: { id: product.id }}" class="btn btn-dark">View more details</router-link>
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
      typedHeading,
      searchTerm,
      filteredProducts,
      sortByPrice,
      sortByAlphabet,
      hovering: ref(null) 
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
  color:white;
  font-size: 25px;
  text-shadow:red 8px 8px 20px;
}
p{
  color: white;
/* text-decoration: underline 3px solid white; */
background-color: black;
border-radius: 50%;
border:2px  solid blue;
font-size: 15px;
  text-shadow:blue 8px 8px 20px;
}

.card button {
  display: none;
}
.btn-secondary{
  background-color: transparent;
 border-color:blue ;
  margin: 0 0 0 20%;
}
.btn-primary {
  background-color: transparent;
  border-color: transparent;
  color: black;

}
input.form-control {
  width: 50%;
  border-color: blue ;
 margin: 0 0 0 29%;
 position: relative;
 top:25px;
 
}
.btn-primary:hover {
  background-color:blue;
  border-color: transparent;
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
@property --border-angle-1 {
	syntax: "<angle>";
	inherits: true;
	initial-value: 0deg;
}

@property --border-angle-2 {
	syntax: "<angle>";
	inherits: true;
	initial-value: 90deg;
}

@property --border-angle-3 {
	syntax: "<angle>";
	inherits: true;
	initial-value: 180deg;
}


:root {
	--bright-blue: rgb(0, 100, 255);
	--bright-green: rgb(0, 255, 0);
	--bright-red: rgb(255, 0, 0);
	--background: black;
	--foreground: white;
	--border-size: 2px;
	--border-radius: 0.75em;
}


@supports (color: color(display-p3 1 1 1)) {
	:root {
		--bright-blue: color(display-p3 0 0.2 1);
		--bright-green: color(display-p3 0.4 1 0);
		--bright-red: color(display-p3 1 0 0);
	}
}

@keyframes rotateBackground {
	to { --border-angle-1: 360deg; }
}

@keyframes rotateBackground2 {
	to { --border-angle-2: -270deg; }
}

@keyframes rotateBackground3 {
	to { --border-angle-3: 540deg; }
}

body {
	background: var(--background);
	color: var(--foreground);
	min-height: 100dvh;
	display: grid;
	place-content: center;
	margin: 0;
	font-family: "Aspekta";
}

button {
	--border-angle-1: 0deg;
	--border-angle-2: 90deg;
	--border-angle-3: 180deg;
	color: inherit;
	font-size: calc(0.8rem + 4vmin);
	font-family: inherit;
	border: 0;
	padding: var(--border-size);
	display: flex;
  position: relative;
  top:20px;
  margin: 0 0 0 7%;
	width: max-content;
	border-radius: var(--border-radius);
	background-color: transparent;
	background-image: conic-gradient(
			from var(--border-angle-1) at 10% 15%,
			transparent,
			var(--bright-blue) 10%,
			transparent 30%,
			transparent
		),
		conic-gradient(
			from var(--border-angle-2) at 70% 60%,
			transparent,
			var(--bright-green) 10%,
			transparent 60%,
			transparent
		),
		conic-gradient(
			from var(--border-angle-3) at 50% 20%,
			transparent,
			var(--bright-red) 10%,
			transparent 50%,
			transparent
		);
	animation: 
		rotateBackground 3s linear infinite,
		rotateBackground2 8s linear infinite,
		rotateBackground3 13s linear infinite;
}


button div {
	background: var(--background); 
	padding: 1em 1.5em;
	border-radius: calc(var(--border-radius) - var(--border-size));
	color: var(--foreground);
}

.card {
  width: 90%; 
  border: none;
  color: antiquewhite;
  background-color: rgba(255, 255, 255, 0.1);
  position: relative;
  top:30px;
  height: auto;
  overflow: hidden;
  margin: 20px;
  overflow: hidden;
  z-index: 10;
  touch-action: none;
  
  --border-color1: var(--bright-blue);
  --border-color2: var(--bright-green);
  --border-color3: var(--bright-red);
  --border-size: 2px;
  --transition-duration: 0.3s;
  --shadow-color: rgba(0, 0, 0, 0.5);
  
  border: var(--border-size) solid var(--border-color1);
  transition: border-color var(--transition-duration);
  
  background-color: #040712;
  background-image: var(--front);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  transform-origin: center;
}
.card:hover {
  --border-color1: var(--bright-red);
  --border-color2: var(--bright-blue);
  --border-color3: var(--bright-green);
}

.card.charizard {
  --color1: var(--charizard1);
  --color2: var(--charizard2);
  --front: var(--charizardfront);
}
.card.charizard:before,
.card.charizard:after {
  background-image: linear-gradient(
    115deg,
    transparent 0%,
    var(--color1) 25%,
    transparent 47%,
    transparent 53%,
    var(--color2) 75%,
    transparent 100%
  );
}
.card.charizard:hover:before {
  background-image: linear-gradient(
    110deg,
    transparent 25%,
    var(--color1) 48%,
    var(--color2) 52%,
    transparent 75%
  );
}
</style>
