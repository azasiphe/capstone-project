<template>
    <div class="users-table vh-100">
      <h1 class="display-1" >
      SIGN UP
      </h1>  
  

      <form class="p-3 bg-white rounded" @submit.prevent="postUser">
  <div class="mb-3 row">
    <div class="col">
      <input v-model="firstName" type="text" class="form-control" placeholder="First Name">
    </div>
    <div class="col">
      <input v-model="lastName" type="text" class="form-control" placeholder="Last Name">
    </div>
  </div>
  <div class="mb-3">
    <input v-model="Age" type="number" class="form-control" placeholder="Age">
  </div>
  <div class="mb-3">
    <input v-model="Gender" type="text" class="form-control" placeholder="Gender">
  </div>
  <div class="mb-3">
    <input v-model="Role" type="text" class="form-control" placeholder="Role">
  </div>
  <div class="mb-3">
    <input v-model="emailAdd" type="text" class="form-control" placeholder="Email">
  </div>
  <div class="mb-3">
    <input v-model="userPass" type="password" class="form-control" placeholder="Password">
  </div>
  <div class="mb-3">
    <input v-model="userProfile" type="text" class="form-control" placeholder="User Profile">
  </div>
  <button type="submit" class="btn btn-primary" :disabled="submitting">{{ submitting ? 'Creating Account...' : 'Create an account' }}</button>
</form>

    
    </div>
  </template>
  <script>
 import { onMounted, ref } from 'vue';
 import { useStore } from 'vuex';
 
 export default {
   setup() {
     const store = useStore();
     const submitting = ref(false);
     const emailExists = ref(false); // Track if the entered email already exists
 
     const firstName = ref('');
     const lastName = ref('');
     const Age = ref('');
     const Gender = ref('');
     const Role = ref('');
     const emailAdd = ref('');
     const userPass = ref('');
     const userProfile = ref('');
 
     onMounted(() => {
       store.dispatch('fetchusers');
     });
 
     const postUser = async () => {
       if (submitting.value) return;
 
       submitting.value = true;
 
       const newUser = {
         firstName: firstName.value,
         lastName: lastName.value,
         Age: Age.value,
         Gender: Gender.value,
         Role: Role.value,
         emailAdd: emailAdd.value,
         userPass: userPass.value, 
         userProfile: userProfile.value
       };
 
       // Check if email exists before posting
       const emailExists = store.getters.allusers.some(user => user.emailAdd === newUser.emailAdd);
       if (emailExists) {
         window.alert('Email already exists. Please log in instead.');
         submitting.value = false;
         return;
       }
 
       try {
         await store.dispatch('postUser', newUser);
         await store.dispatch('fetchusers');
         clearFields();
         window.alert('You have created an account.');
       } catch (error) {
         console.error(error);
         window.alert('Failed to create an account. Please try again.');
       } finally {
         submitting.value = false;
       }
     };
 
     const clearFields = () => {
       firstName.value = '';
       lastName.value = '';
       Age.value = '';
       Gender.value = '';
       Role.value = '';
       emailAdd.value = '';
       userPass.value = '';
       userProfile.value = '';
     };
 
     return {
       postUser,
       submitting,
       emailExists,
       firstName,
       lastName,
       Age,
       Gender,
       Role,
       emailAdd,
       userPass,
       userProfile
     };
   }
 };
 </script>
  <style scoped>

  
  </style>
