<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Login</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-card>
          <ion-card-header>
            <ion-card-title>Login Form</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-item>
              <ion-label position="floating">Username</ion-label>
              <ion-input v-model="username"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Email</ion-label>
              <ion-input v-model="email"></ion-input>
            </ion-item>
          </ion-card-content>
          <ion-button expand="full" @click="login">Sign In</ion-button>
          <ion-button expand="full" @click="registerRedirect">Create Account</ion-button>
        </ion-card>
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
  import {defineComponent, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { isAuthenticated } from '@/router/index';

  export default defineComponent({
      components: { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet},
      setup() {
        const router = useRouter();
        const username = ref('testusername');
        const email = ref('john.doe@example.com');
        //const isAuthenticated = ref(false); // New reference for local authentication state

        const login = () => {
        console.log('Validating user credentials...');
        isAuthenticated.value = true;
        console.log(isAuthenticated.value);

          // Redirect to a protected route or perform other actions after login
          router.push('/tabs/tab1');
        };  
        const registerRedirect = () =>{
          router.push('/register');
        }
        return {
          username,
          email,
          login,
          registerRedirect
      };
      },
    });
  </script>

  <style scoped>
  </style>