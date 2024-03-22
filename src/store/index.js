import { createStore } from 'vuex';
import axios from 'axios';
import Swal from 'sweetalert2';
axios.defaults.withCredentials = true;

const baseUrl = 'https://capstone-project-x8jr.onrender.com';

export default createStore({
  state: {
    products: [],
    product:[],
    cart: [],
    orders:[],
    users: [],
    user:[],
    token: null,
    loggedInUser: null,
    isAuthenticated: false
    
   
  },
  getters: {
    allProducts: state => state.products,
    allusers: state => state.users,
    user: state => state.user,
    getSingleProduct: state => state.product,
    isAuthenticated: state => state.isAuthenticated,
    cartItems: state => state.cart, 
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_PRODUCT(state, product) {
      state.product = product; 
    },
    removeFromCart(state, index) {
      state.cart.splice(index, 1);
    },
    addToCart(state, product) {
      state.cart.push(product); 
    },
  
    ADD_PRODUCT(state, product) {
      state.products.push(product);
    },
    SET_USERS(state, users) {
      state.users = users;
    },
    ADD_USER(state, newUser) {
      state.users.push(newUser);
    },
    SET_USER(state, user) {
      state.user = user;
    },
    EDIT_USER(state, editedUser) {
      const index = state.users.findIndex(user => user.userID === editedUser.userID);
      if (index !== -1) {
        state.users.splice(index, 1, editedUser);
      }
    },
    DELETE_USER(state, userID) {
      state.users = state.users.filter(user => user.userID !== userID);
    },
    SET_TOKEN(state, token) {
      state.token = token;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
    LOGOUT(state) {
      state.loggedInUser = null;
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
    },
    setLoggedInUser(state, user) {
      state.loggedInUser = user;
    } 
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const response = await axios.get(`${baseUrl}/products`);
        commit('SET_PRODUCTS', response.data);
        // Swal.fire({ 
        //   icon: 'success',
        //   title: 'Success',
        //   text: 'Products fetched successfully!',
        // });
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch products',
        });
      }
    },
    async fetchProduct({ commit }, id) {
      try {
        const response = await axios.get(`${baseUrl}/products/${id}`);
        console.log(response.data);
        commit('SET_PRODUCT', response.data);
        Swal.fire({ 
          icon: 'success',
          title: 'Success',
          text: 'Product fetched successfully!',
        });
      } catch (error) {
        console.error('Error fetching product:', error);
        Swal.fire({ 
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch product',
        });
      }
    },
    async fetchUser({ commit }, userID) {
      try {
        const response = await axios.get(`${baseUrl}/users/${userID}`);
        commit('SET_USER', response.data);
        Swal.fire({ 
          icon: 'success',
          title: 'Success',
          text: 'User fetched successfully!',
        });
      } catch (error) {
        console.error('Error fetching user:', error);
        Swal.fire({ 
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch user',
        });
      }
    },
    addToCart({ commit }, product) {
      commit('addToCart', product);
      Swal.fire({ 
        icon: 'success',
        title: 'Success',
        text: 'Product added to cart!',
      });
    },
    logout({ commit }) {
      commit('clearToken');
      localStorage.removeItem('token');
      commit('logout');
      commit('setUser', null);
      commit('setIsAdmin', false);
      Swal.fire({ 
        icon: 'success',
        title: 'Logged out',
        text: 'You have been successfully logged out!',
      });
    },
    async deleteProduct({ commit }, id) {
      try {
        await axios.delete(baseUrl + `/products/${id}`);
        window.location.reload();
        Swal.fire({ 
          icon: 'success',
          title: 'Success',
          text: 'Product deleted successfully!',
        });
      } catch (error) {
        console.error(error);
        Swal.fire({ 
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete product',
        });
      }
    },
    async postProduct({ commit }, newItem) {
      try {
        await axios.post(baseUrl + '/products', newItem);
        commit('fetchProducts');
        Swal.fire({ 
          icon: 'success',
          title: 'Success',
          text: 'Product added successfully!',
        });
      } catch (error) {
        console.error(error);
        window.location.reload();
        Swal.fire({ 
          icon: 'error',
          title: 'Error',
          text: 'Failed to add product',
        });
      }
    },
    async editProduct({ commit }, productData) {
      try {
        await axios.patch(`${baseUrl}/products/${productData.id}`, productData);
        commit('updateProduct', productData);
        Swal.fire({ 
          icon: 'success',
          title: 'Success',
          text: 'Product edited successfully!',
        });
      } catch (error) {
        console.error(error);
        Swal.fire({ 
          icon: 'error',
          title: 'Error',
          text: 'Failed to edit product',
        });
      }
    },
    async fetchUsers({ commit }) {
      try {
        const response = await axios.get(`${baseUrl}/users`);
        commit('SET_USERS', response.data);
        Swal.fire({ 
          icon: 'success',
          title: 'Success',
          text: 'Users fetched successfully!',
        });
      } catch (error) {
        console.error('Error fetching users:', error);
        Swal.fire({ 
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch users',
        });
      }
    }
  
    },
  },
);
 

