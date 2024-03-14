
import { createStore } from 'vuex';
import axios from 'axios';
axios.defaults.withCredentials= true;
const baseUrl = ' http://localhost:3800';

export default createStore({
  state: {
    products: [],
    product:[],
    users: [],
    cart:[],
    token: [],
    loginError: [],
    registrationError: [],
    
  },
  getters: {
    allProducts: state => state.products,
    getSingleProduct: state => state.product
    
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_PRODUCT(state, product) {
      state.products = product; 
    },
    addToCart(state, item) {
      state.cart.push(item);
    },
    setUser(state, users) {
      state.users = users;
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    clearToken(state) {
      state.token = null;
      localStorage.removeItem('token');
    },
    setRegistrationError(state, error) {
      state.registrationError = error;
    },
    setLoginError(state, error) {
      state.loginError = error;
    },
    clearErrors(state) {
      state.registrationError = null;
      state.loginError = null;
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
       console.log(response.data)
        commit('SET_PRODUCT', response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async register({ commit }, userData) {
      try {
        const response = await axios.post(`${baseUrl}/register`, userData);
        const { token } = response.data;
        commit('setToken', token);
        commit('setRegistrationError', null);
      } catch (error) {
        commit('setRegistrationError', error);
      }
    },
    async login({ commit }, { emailAdd, userPass }) {
      try {
        const response = await axios.post(`${baseUrl}/login`, { emailAdd, userPass });
        const { token } = response.data;
        commit('setToken', token);
        commit('setLoginError', null);
      } catch (error) {
        commit('setLoginError', error);
      }
    },
    logout({ commit }) {
      commit('clearToken');
    },
    logout({ commit }) {
      commit('setUser', null);
      commit('setToken', null);
      alert('you have log out!');
    
        this.$router.push('/login');
    },
  }
});

  
 