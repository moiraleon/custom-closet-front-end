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
            <div v-if="errorMessage" class="error-message">
              {{ errorMessage }}
            </div>
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
        const errorMessage = ref<string | null>(null);

        //Handle Login and Authentication
        async function validateUser() {
          try {
            const emailValue = email.value;
            const passwordValue = password.value;
            const userData = await login(emailValue, passwordValue);
            
            // After successful login, store the user ID and JWT in localStorage
            localStorage.setItem('userId', userData.data.UID);
            localStorage.setItem('token', userData.data.token);
            localStorage.setItem('isAuthorized', "true")
            router.push('/tabs/style');
          } catch (error: any) {
            console.error('Failed to log in user:', error);
            if (error?.response && error?.response?.status === 401) {
              const responseMessage = 'Invalid User credentials provided. Please verify your password is correct and try again.';
              errorMessage.value = responseMessage; 
            } else {
              errorMessage.value = 'Something went wrong trying to log in that user. Please try again later.';
            }
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
          markTouched,
          errorMessage
      };
      },
    });
  </script>

<style scoped>
.error-message {
  color: red;
  margin-top: 10px;
}
  </style>