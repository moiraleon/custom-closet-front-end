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
          <ion-title size="large">Tab 3</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-card class="profile-container">
      <ion-card-header class="profile-header">
        <ion-img :src="avatar" alt="Avatar" class="avatar"></ion-img>
        <ion-card-title>{{ firstName }} {{ lastName }}</ion-card-title>
        <ion-card-subtitle>{{ email }}</ion-card-subtitle>
      </ion-card-header>
      <ion-card-content class="profile-actions">
        <ion-button expand="full" @click="resetPassword">Reset Password</ion-button>
        <ion-button expand="full" @click="logout">Logout</ion-button>
      </ion-card-content>
    </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {defineComponent, ref } from 'vue';
import {IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { isAuthenticated } from '@/router/index';
import { useRouter } from 'vue-router';
export default defineComponent({
      components: { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonPage},
      setup() {
        const router = useRouter();
        const avatar = ref('path/to/avatar.jpg');
        const firstName = ref('John');
        const lastName = ref('Doe');
        const email = ref('john.doe@example.com');

        const resetPassword = () => {
          console.log('Resetting password...');
        };  
        const logout = () => {
          console.log('Logging out...');
          isAuthenticated.value = false;
          console.log(isAuthenticated.value);
          router.push('/');
        };
        return {
          avatar,
          firstName,
          lastName,
          email,
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