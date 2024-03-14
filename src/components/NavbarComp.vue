<template>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container">
      <router-link to="/" class="navbar-brand">Home</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">About</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/products" class="nav-link">Garage</router-link>
          </li>
          <!-- Display cart and checkout links if user is authenticated -->
          <li v-if="isLoggedIn" class="nav-item">
            <router-link to="/cart" class="nav-link">
              <i class="bi bi-bag"></i> 
            </router-link>
          </li>
          <li v-if="isLoggedIn" class="nav-item">
            <router-link to="/checkout" class="nav-link">Checkout</router-link>
          </li>
          <!-- Display user profile dropdown if logged in -->
          <li v-if="isLoggedIn" class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="bi bi-person-circle" style="font-size: 24px;"></i>
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
              <li><router-link to="/profile" class="dropdown-item">Profile</router-link></li>
              <li><router-link to="/logout" class="dropdown-item">Logout</router-link></li>
            </ul>
          </li>
          <!-- Display register and login links if not logged in -->
          <li v-if="!isLoggedIn" class="nav-item">
            <router-link to="/register" class="nav-link">Register</router-link>
          </li>
          <li v-if="!isLoggedIn" class="nav-item">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  // computed: {
  //   isLoggedIn() {
  //     return this.$store.state.token !== null;
  //   }
  // }
};
</script>

  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  
  body {
    background-image: url('https://i.ibb.co/3TMtWQ9/th-2.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
 
  }
  
  .navbar-dark {
    background-color: transparent; 
  }
  
  .navbar-nav .nav-link {
    font-size: 20px;
    font-weight: bold;
  }
  
  .navbar-nav .nav-link.router-link-exact-active {
    color: white;
    border: 3px solid blue;
  border-radius: 5px;
  }
  
  .nav-link {
    transition: background-color 0.3s ease;
  }
  
  .navbar-nav .nav-link:hover {
    border-color:2px solid blue;
    border-radius: 5px;
    color: blue;
  }




  </style>
  