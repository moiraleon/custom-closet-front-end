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
              <ion-label position="floating">Email</ion-label>
              <ion-input v-model="email" ref="emailInput"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Password</ion-label>
              <ion-input v-model="password" ref="passwordInput"></ion-input>
            </ion-item>
          </ion-card-content>
          <ion-button expand="full" @click="validateUser">Sign In</ion-button>
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

  import { login } from '../services/authServices';

  export default defineComponent({
      components: { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet},
      setup() {
        const router = useRouter();
        const emailInput = ref<HTMLElement | null>(null);
        const passwordInput = ref<HTMLElement | null>(null);

        //Handle Login and Authentication
        async function validateUser() {
          try {
            // Access input values using $refs
            const emailValue = (emailInput.value as HTMLInputElement).value;
            const passwordValue = (passwordInput.value as HTMLInputElement).value;
            console.log(emailValue, passwordValue);

            // Call login function with emailValue and passwordValue
            const userData = await login(emailValue, passwordValue);
            console.log('User data:', userData);

            // If login is successful, redirect to the home page
            isAuthenticated.value = true;
            router.push('/tabs/tab1');
          } catch (error) {
            console.error('Failed to fetch user data:', error);
          }
        }
        const registerRedirect = () =>{
          router.push('/register');
        }
        return {
          emailInput,
          passwordInput,
          validateUser,
          registerRedirect
      };
      },
    });
  </script>

  <style scoped>
  </style>