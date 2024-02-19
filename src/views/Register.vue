<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Create New Account</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-card>
          <ion-card-header>
            <ion-card-title>Register a new user</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <form @submit.prevent="registerNewUser">
            <ion-item>
              <ion-input
                label="First name"
                label-placement="floating"
                color="secondary"
                fill="outline"
                v-model="firstName"
                aria-label="First name"
                :counter="true"
                :maxlength="45"
                class="input-margin"
              >
              </ion-input>
            </ion-item>
            <ion-item>
              <ion-input
                label="Last name"
                label-placement="floating"
                color="secondary"
                fill="outline"
                v-model="lastName"
                aria-label="Last name"
                :counter="true"
                :maxlength="45"
                :required="true"
                class="input-margin"
              >
              </ion-input>
            </ion-item>
            <ion-item>
              <ion-input
                label="Email"
                label-placement="floating"
                color="secondary"
                fill="outline"
                v-model="email"
                aria-label="Email"
                type="email"
                :counter="true"
                :maxlength="45"
                :required="true"
                @ionInput="validate"
                @ionBlur="markTouched"
                class="input-margin"
              >
              </ion-input>
            </ion-item>
            <ion-item>
              <ion-input
                label="Password"
                label-placement="floating"
                color="secondary"
                fill="outline"
                v-model="password"
                aria-label="Password"
                type="password"
                :counter="true"
                :maxlength="60"
                :required="true"
                class="input-margin"
              >
              </ion-input>
            </ion-item>
            <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
          </form>
          </ion-card-content>
          <ion-item expand="full">
            <ion-button  @click="registerNewUser">Create Account</ion-button>
          </ion-item>
          <ion-item expand="full">
          <ion-button  @click="loginRedirect">Go to Sign In</ion-button>
          </ion-item>
        </ion-card>
      </ion-content>
    </ion-page>
  </template>


<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet, IonItem, IonCardContent, IonButton, IonCard, IonInput, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/vue';
import {defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { validate, markTouched } from '../utils/validators';
import { isAuthenticated } from '@/router/index';

import { register } from '../services/authServices';

export default defineComponent({
    components: { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet, IonItem, IonCardContent, IonButton, IonCard, IonInput, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonToolbar, IonTitle},
    methods: {
      validate,
        markTouched
      },
    setup() {
      const router = useRouter();

      const firstName = ref('');
      const lastName = ref('');
      const email = ref('');
      const password = ref('');
      const errorMessage = ref('');
      
        //Handle Login and Authentication
        async function registerNewUser() {
          try {
            const firstNameValue = firstName.value;
            const lastNameValue = lastName.value;
            const emailValue = email.value;
            const passwordValue = password.value;
            const userData = await register(emailValue, passwordValue, firstNameValue, lastNameValue);
             // After successful login, store the user ID in localStorage
             localStorage.setItem('userId', userData.data.UID);

             // If login is successful, redirect to the home page
             isAuthenticated.value = true;
             router.push('/tabs/style');
          } catch (error) {
            console.error('Failed to register new user:', error);
              if (error.response && error.response.status === 409) {
                errorMessage.value = error.response.data;
              } else {
                errorMessage.value = 'There was an error when creating a new user. Please try again later.';
              }
          }
        }

      const loginRedirect = () =>{
          router.push('/login');
        }  
      return {
        firstName,
        lastName,
        email,
        password,
        registerNewUser,
        loginRedirect,
        validate,
        markTouched,
        errorMessage
    };
    },
  });
</script>

<style scoped>
  .input-margin{
    margin: 4px;
  }

  .error-message {
  color: red;
  margin-top: 10px;
}
</style>