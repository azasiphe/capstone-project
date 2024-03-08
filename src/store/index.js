import { createStore } from 'vuex';
import axios from 'axios';

const baseUrl = ' http://localhost:3800';

export default createStore({
  state: {
    products: [],
    users:[]
  },
  getters: {
    allProducts(state) {
      return state.products;
    },
    allusers(state) {
      return state.users;
    }
    
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_USERS(state, users) { 
      state.users = users; 
    }
  },
  actions: {
    async fetchProducts({commit}) {
      try {
        const response = await axios.get(`${baseUrl}/products`);
        const products = await response.data 
        if(products){
          commit('SET_PRODUCTS', products);
        }
      } catch (error) {
        console.error(error);
      }
    }
  ,
  async fetchusers({commit}) {
    try {
      const response = await axios.get(`${baseUrl}/users`);
      const users = await response.data; 
      if(users){
        commit('SET_USERS', users);
      }
    } catch (error) {
      console.error(error);
    }
   
  },
 async postUser({ commit }, newItem) {
  try {
    await axios.post(baseUrl + '/users', newItem); 
    commit('fetchusers');
    // window.alert('you have created an account.'); 
  } catch (error) {
    console.error(error);
   
  }

},

   async deleteusers({commit}, userID){
    await axios.delete(baseUrl+`/users/${userID}`)
    window.location.reload()
   },
  
   async editusers({commit}, update){
    console.log(update);
    await axios.patch(baseUrl+'/users/' + update.userID, update)

   },
},
modules: {
}
})
    
  ;