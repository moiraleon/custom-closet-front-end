<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Settings</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-card v-if="userDataFetched" class="profile-container">
        <ion-card-header class="profile-header">
          <ion-img :src="userData.AVATAR" alt="Avatar" class="avatar"></ion-img>
          <ion-card-title>{{ userData.FIRST_NAME }} {{ userData.LAST_NAME }}</ion-card-title>
          <ion-card-subtitle>{{ userData.EMAIL }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content class="profile-actions">
          <ion-button expand="full" @click="resetPassword" :disabled="true">Reset Password</ion-button>
          <ion-button expand="full" @click="logout">Logout</ion-button>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonImg } from '@ionic/vue';
import { useRouter } from 'vue-router';

import { getUserById } from '../services/userServices';

export default defineComponent({
  components: { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonPage, IonToolbar, IonHeader, IonButton, IonImg, IonTitle },
  setup() {
    const router = useRouter();
    const userData = ref({
      UID: '',
      EMAIL: '',
      FIRST_NAME: '',
      LAST_NAME: '',
      AVATAR: ''
    });
    const userDataFetched = ref(false);

    const resetPassword = () => {
      console.log('Resetting password...');
    };
    const logout = () => {
      console.log('Logging out...');
      localStorage.removeItem('isAuthorized');
      localStorage.removeItem('token');
      router.push('/');
    };

    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (userId) {
          const userDataResponse = await getUserById(userId);
          userData.value = userDataResponse;
          userDataFetched.value = true;
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    // Fetch user data on component mount if not already fetched
    onMounted(() => {
      if (!userDataFetched.value) {
        fetchUserData();
      }
    });

    return {
      userData,
      userDataFetched,
      resetPassword,
      logout,
    };
  },
});
</script>

<style scoped>
  .profile-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .profile-header {
    text-align: center;
  }

  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 10px;
  }

  .profile-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    flex-wrap: wrap;
  }

  button {
    padding: 10px;
    background-color: #3498db;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #2980b9;
  }
</style>
