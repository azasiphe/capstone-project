<template>
  <div class="users-table vh-100">
    <div>
   
   <nav class="nav">
     <ul>
       <router-link to="/users">|Users|</router-link>
       <router-link to="/prod">Products|</router-link>
       <router-link to="/orders">Orders|</router-link>
     </ul>
   </nav>
   
 
   <router-view></router-view>
 </div>
 <div class="modal" v-if="showAddUserModal">
      <div class="modal-content">
        <span class="close" @click="closeAddUserModal">&times;</span>
        <h2>Add User</h2>
        <input v-model="firstName" type="text" placeholder="First Name">
        <input v-model="lastName" type="text" placeholder="Last Name">
        <input v-model="age" type="number" placeholder="Age">
        <input v-model="gender" type="text" placeholder="Gender">
        <input v-model="role" type="text" placeholder="Role">
        <input v-model="email" type="text" placeholder="Email">
        <input v-model="password" type="password" placeholder="Password">
        <input v-model="userProfile" type="text" placeholder="User Profile">
        <button class="add" @click="postUser">Add</button>
      </div>
</div>
    <table>
      <thead>
        <tr>
          <th>User ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Role</th>
          <th>Email</th>
          <th>User Profile</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.userID">
          <td>{{ user.userID }}</td>
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.Age }}</td>
          <td>{{ user.Gender }}</td>
          <td>{{ user.Role }}</td>
          <td>{{ user.emailAdd }}</td>
          <td>{{ user.userProfile }}</td>
          <td><button  class="edit" @click="editUser(user.userID)">edit</button> </td>
      <td><button class="delete" @click="deleteUser(user.userID)">delete</button></td>
    
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { onMounted, computed,ref } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();

    const users = computed(() => store.getters.allusers);
 
    onMounted(() => {
      store.dispatch('fetchusers');
    });
    const showAddUserModal = ref(false);
    const userID = ref(null);
  const firstName = ref(null);
  const lastName = ref(null);
  const Age = ref(null);
  const Gender = ref(null);
  const Role = ref(null);
  const emailAdd = ref(null);
  const userpadd = ref(null);
  const userProfile = ref(null);

  const deleteUser = (userID) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      store.dispatch('deleteusers', userID);
      window.alert('User has been deleted.');
    }
  };

  const postUser = async () => {
const newUser = {
  firstName: firstName.value,
  lastName: lastName.value,
  Age: Age.value,
  Gender: Gender.value,
  Role: Role.value,
  emailAdd: emailAdd.value,
  userpadd: userpadd.value,
  userProfile: userProfile.value
};

try {

  await store.dispatch('postUsers', newUser);
  
 
  await store.dispatch('fetchusers'); 
  clearFields();
  window.alert('User has been added.');
} catch (error) {
  console.error(error);
  window.alert('Failed to add user.');
}
};

  const clearFields = () => {
    userID.value = null;
    firstName.value = null;
    lastName.value = null;
    Age.value = null;
    Gender.value = null;
    Role.value = null;
    emailAdd.value = null;
    userpadd.value = null;
    userProfile.value = null;
  };
  const openAddUserModal = () => {
      showAddUserModal.value = true;
    };

    const closeAddUserModal = () => {
      showAddUserModal.value = false;
      clearFields();
    };


    return {
      users,
      showAddUserModal,
      openAddUserModal,
      closeAddUserModal,
      clearFields,
      postUser,
      deleteUser,
      currentPage() {
        return this.$route.name;
      }
    };
  }
};
</script>

<style scoped>
.users-table {
  text-align: center;
  color: antiquewhite;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;

}

th {
  background-color: #f2f2f2;
  color: black;
}
.nav {
  background-color: black;
  color: white;
  padding: 10px;
  display: flex;
  list-style: none;

}



.nav li {
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