import { createStore } from 'vuex';
import axios from 'axios';

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
    isAuthenticated: false
    
   
  },
  getters: {
    allProducts: state => state.products,
    allusers: state => state.users,
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
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
    } 
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const response = await axios.get(`${baseUrl}/products`);
        commit('SET_PRODUCTS', response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchProduct({ commit }, id) {
      try {
        const response = await axios.get(`${baseUrl}/products/${id}`);
        console.log(response.data);
        commit('SET_PRODUCT', response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    },
    async fetchUser({ commit }) {
      try {
        const response = await axios.get(`${baseUrl}/users/:id`);
        commit('SET_USER', response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    },
    addToCart({ commit }, product) {
      commit('addToCart', product);
    },
    logout({ commit }) {
      commit('clearToken');
      localStorage.removeItem('token');
      commit('setUser', null);
      commit('setIsAdmin', false);
    },
    async deleteProduct({ commit }, id) {
      await axios.delete(baseUrl + `/products/${id}`);
      window.location.reload();
    },
    async postProduct({ commit }, newItem) {
      try {
        await axios.post(baseUrl + '/products', newItem);
        commit('fetchProducts');
      } catch (error) {
        console.error(error);
        window.location.reload();
      }
    },
    async editProduct({ commit }, productData) {
      try {
        await axios.patch(`${baseUrl}/products/${productData.id}`, productData);
        commit('updateProduct', productData);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchUsers({ commit }) {
      try {
        const response = await axios.get(`${baseUrl}/users`);
        commit('SET_USERS', response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
  
    async postUser({ commit }, newUser) {
      try {
        await axios.post(`${baseUrl}/users`, newUser);
        commit('ADD_USER', newUser);
      } catch (error) {
        console.error('Error adding user:', error);
      }
    },
    async editUser({ commit }, editedUser) {
      try {
        await axios.put(`${baseUrl}/users/${editedUser.userID}`, editedUser);
        commit('EDIT_USER', editedUser);
      } catch (error) {
        console.error('Error editing user:', error);
      }
    },
    async deleteUser({ commit }, userID) {
      try {
        await axios.delete(`${baseUrl}/users/${userID}`);
        commit('DELETE_USER', userID);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },
    async placeOrder({ commit, state }) {
      try {
        const userId = state.userID; 
        const cartItems = state.cartItems;
        for (const product of cartItems) {
          const orderData = {
            productID: product.id,
            userID: userID,
            quantity: product.quantity,
          };
          await axios.post('https://capstone-project-x8jr.onrender.com/orders', orderData); 
        }
      
        commit('clearCart');
      } catch (error) {
        console.error('Error placing order:', error);
      }
    }
  },
 
});
