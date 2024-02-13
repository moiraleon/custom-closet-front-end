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
          <ion-button expand="full" @click="submitForm">Submit</ion-button>
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

        const submitForm = () => {
          console.log('Validating user credentials...');
        // Perform authentication (in a real scenario, use a secure authentication mechanism)
          // Set $isAuthenticated.value to true upon successful login
        //   this.$isAuthenticated.value = true;
        //   //isAuthenticated.value = true;
        //   console.log(this.$isAuthenticated.value);
        isAuthenticated.value = true;
        console.log(isAuthenticated.value);

          // Redirect to a protected route or perform other actions after login
          router.push('/tabs/tab1');
        };  
        return {
          username,
          email,
          submitForm,
      };
      },
    });
  </script>

  <style scoped>
  </style>