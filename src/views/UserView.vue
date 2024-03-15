<template>
  <div class="users-table vh-100">
    <nav class="navbar navbar-expand-lg navbar-dark bg-black">
  <div class="container-fluid">
    

 
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

   
    <div class="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/prod">Products</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/users">Users</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/orders">Orders</router-link>
        </li>
      </ul>
    </div>

    <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
     
    </div>
  </div>
</nav>
 
    <div class="modal" v-if="showAddUserModal">
      <div class="modal-content">
        <span class="close" @click="closeAddUserModal">&times;</span>
        <h2>{{ modalTitle }}</h2>
        <div class="input-group mb-3">
  <span class="input-group-text" id="inputGroup-sizing-default">First Name</span>
  <input v-model="editUserDetails.firstName" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="First Name">
</div>
<div class="input-group mb-3">
  <span class="input-group-text" id="inputGroup-sizing-default">Last Name</span>
  <input v-model="editUserDetails.lastName" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Last Name">
</div>
<div class="input-group mb-3">
  <span class="input-group-text" id="inputGroup-sizing-default">Age</span>
  <input v-model="editUserDetails.age" type="number" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Age">
</div>
<div class="input-group mb-3">
  <span class="input-group-text" id="inputGroup-sizing-default">Gender</span>
  <input v-model="editUserDetails.gender" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Gender">
</div>
<div class="input-group mb-3">
  <span class="input-group-text" id="inputGroup-sizing-default">Role</span>
  <input v-model="editUserDetails.role" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Role">
</div>
<div class="input-group mb-3">
  <span class="input-group-text" id="inputGroup-sizing-default">Email</span>
  <input v-model="editUserDetails.email" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Email">
</div>
<div class="input-group mb-3">
  <span class="input-group-text" id="inputGroup-sizing-default">Password</span>
  <input v-model="editUserDetails.password" type="password" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Password">
</div>
<div class="input-group mb-3">
  <span class="input-group-text" id="inputGroup-sizing-default">User Profile</span>
  <input v-model="editUserDetails.userProfile" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="User Profile">
</div>
<button class="btn btn-primary" @click="saveUser">Save</button>

        ``
      </div>
    </div>

    <button class="add-user-btn" @click="openAddUserModal"><i class="bi bi-plus-square"></i>Add User</button>

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
          <td><button class="edit" @click="editUser(user)">edit</button></td>
          <td><button class="delete" @click="deleteUser(user.userID)">delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { onMounted, computed, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();

    const users = computed(() => store.getters.allusers);
    const showAddUserModal = ref(false);
    const editUserDetails = ref(null);
    const modalTitle = ref('');

    onMounted(() => {
      store.dispatch('fetchusers');
    });

    const deleteUser = (userID) => {
      const confirmDelete = window.confirm('Are you sure you want to delete this user?');
      if (confirmDelete) {
        store.dispatch('deleteusers', userID);
        window.alert('User has been deleted.');
      }
    };

    const openAddUserModal = () => {
      showAddUserModal.value = true;
      modalTitle.value = 'Add User';
      editUserDetails.value = {
        firstName: '',
        lastName: '',
        age: '',
        gender: '',
        role: '',
        email: '',
        password: '',
        userProfile: ''
      };
    };

    const closeAddUserModal = () => {
      showAddUserModal.value = false;
    };

    const editUser = (user) => {
      showAddUserModal.value = true;
      modalTitle.value = 'Edit User';
      editUserDetails.value = { ...user };
    };

    const saveUser = async () => {
      try {
        await store.dispatch('editUser', editUserDetails.value);
        await store.dispatch('fetchusers');
        closeAddUserModal();
        window.alert('User details updated successfully.');
      } catch (error) {
        console.error(error);
        window.alert('Failed to update user details.');
      }
    };

    return {
      users,
      showAddUserModal,
      openAddUserModal,
      closeAddUserModal,
      editUser,
      saveUser,
      modalTitle,
      editUserDetails
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

.modal {
  display: block;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
