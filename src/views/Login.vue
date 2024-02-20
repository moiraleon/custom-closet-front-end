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
            <form @submit.prevent="validateUser">
            <ion-item>
              <ion-input
                class="input-margin"
                color="secondary"
                label="Email"
                label-placement="floating"
                fill="outline"
                v-model="email"
                ref="emailInput"
                aria-label="Email"
                type="email"
                error-text="Invalid email"
                @ionInput="validate"
                @ionBlur="markTouched"
                :counter="true"
                :maxlength="45"
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-input
                class="input-margin"
                color="secondary"
                label="Password"
                label-placement="floating"
                fill="outline"
                v-model="password"
                ref="passwordInput"
                aria-label="Password"
                type="password"
                :counter="true"
                :maxlength="60"
              ></ion-input>
            </ion-item>
          </form>
          </ion-card-content>
          <ion-item expand="full">
          <ion-button @click="validateUser">Sign In</ion-button>
          </ion-item>
          <ion-item expand="full">
          <ion-button @click="registerRedirect">Create Account</ion-button>
        </ion-item>
        </ion-card>
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet, IonItem, IonTitle, IonCard, IonCardTitle, IonToolbar, IonHeader, IonCardContent, IonCardHeader, IonContent, IonButton, IonInput } from '@ionic/vue';
  import {defineComponent, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { validate, markTouched } from '../utils/validators';
  import { isAuthenticated } from '@/router/index';
  

  import { login } from '../services/authServices';

  export default defineComponent({
      components: { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet, IonItem, IonTitle, IonCard, IonCardTitle, IonToolbar,IonHeader, IonCardContent, IonCardHeader, IonContent, IonButton, IonInput},
      methods: {
        validate,
        markTouched
      },
      setup() {
        const router = useRouter();
        const email = ref('');
        const password = ref('');

        //Handle Login and Authentication
        async function validateUser() {
          try {
            const emailValue = email.value;
            const passwordValue = password.value;
            const userData = await login(emailValue, passwordValue);
            
            // After successful login, store the user ID and JWT in localStorage
            localStorage.setItem('userId', userData.UID);
            localStorage.setItem('token', userData.token);

            // If login is successful, redirect to the home page
            isAuthenticated.value = true;
            router.push('/tabs/style');
          } catch (error) {
            console.error('Failed to fetch user data:', error);
          }
        }
        const registerRedirect = () =>{
          router.push('/register');
        }
        return {
          email,
          password,
          validateUser,
          registerRedirect,
          validate,
          markTouched
      };
      },
    });
  </script>

  <style scoped>
  .input-margin{
    margin: 4px;
  }
  </style>