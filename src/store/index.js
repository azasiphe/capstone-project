
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
    },
    setLoginError(state, error) {
      state.loginError = error;
    },
    setRegistrationError(state, error) {
      state.registrationError = error;
    },
    clearErrors(state) {
      state.loginError = null;
      state.registrationError = null;
    },
    
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
    async login({ commit }, { emailAdd, userPass }) {
      console.log('login');
      try {
        const response = await axios.post(`${baseUrl}/login`, { emailAdd, userPass });
        commit('setUser', response.data.user);
        commit('setToken', response.data.token);
        alert('  you have login successfully!!!');
       
        this.$router.push('/');
      } catch (error) {
        commit('setLoginError', error.response);
      }
    },
    async register({ commit }, userData) {
      try {
        const response = await axios.post(`${baseUrl}/register`, userData);
        commit('setUser', response.data.user);
        commit('setToken', response.data.token);
        alert('Account created successfully!!!');
      
        this.$router.push('/');
      } catch (error) {
        commit('setRegistrationError', error.response);
      }
    },
    logout({ commit }) {
      commit('setUser', null);
      commit('setToken', null);
      alert('you have log out!');
    
        this.$router.push('/login');
    },
  }
});

  
 