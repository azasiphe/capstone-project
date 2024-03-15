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
</template>
<style>

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