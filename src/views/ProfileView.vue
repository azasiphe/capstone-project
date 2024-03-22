<template>
    
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
      
</template>
<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const loggedInUser = computed(() => store.state.loggedInUser); // Retrieve logged-in user from Vuex
    const userProfile = ref(null); // Initialize user profile

    // Fetch logged-in user's profile information
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://capstone-project-x8jr.onrender.com/users/${loggedInUser.value.userID}`);
        userProfile.value = response.data;
      } catch (error) {
        console.error('Error fetching user profile:', error);
        alert('Failed to fetch user profile.');
      }
    };

    // Call fetchUserProfile when the component is mounted
    onMounted(fetchUser); 

    return {
      loggedInUser,
      userProfile,
    };
  },
};
</script>
<style scoped>
.users-table {
  text-align: center;
}

table {
  width: 100%;
  border-collapse: collapse;
}
.background-image {
    background-image: url('https://i.ibb.co/3TMtWQ9/th-2.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 100vh;
  }
th, td {
  padding: 10px;
  border: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}
.background-image {
  background-image: url('https://i.ibb.co/3TMtWQ9/th-2.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
}
</style>

