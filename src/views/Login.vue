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
                class="login-input"
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
                class="login-input"
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
          <ion-button expand="full" @click="validateUser">Sign In</ion-button>
          <ion-button expand="full" @click="registerRedirect">Create Account</ion-button>
        </ion-card>
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet, IonItem, IonTitle, IonCard, IonCardTitle, IonToolbar, IonHeader, IonCardContent, IonCardHeader, IonContent, IonButton, IonInput } from '@ionic/vue';
  import {defineComponent, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { isAuthenticated } from '@/router/index';
  import { eye, lockClosed } from 'ionicons/icons';
  

  import { login } from '../services/authServices';

  export default defineComponent({
      components: { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet, IonItem, IonTitle, IonCard, IonCardTitle, IonToolbar,IonHeader, IonCardContent, IonCardHeader, IonContent, IonButton, IonInput},
      methods: {
        validateEmail(email) {
          return email.match(
            /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
          );
        },

        validate(ev) {
          const value = ev.target.value;

          this.$refs.emailInput.$el.classList.remove('ion-valid');
          this.$refs.emailInput.$el.classList.remove('ion-invalid');

          if (value === '') return;

          this.validateEmail(value)
            ? this.$refs.emailInput.$el.classList.add('ion-valid')
            : this.$refs.emailInput.$el.classList.add('ion-invalid');
        },

        markTouched() {
          this.$refs.emailInput.$el.classList.add('ion-touched');
        },
      },
      setup() {
        const router = useRouter();
        const email = ref('');
        const password = ref('');

        //Handle Login and Authentication
        async function validateUser() {
          try {
            // Access input values using $refs
            const emailValue = email.value;
            const passwordValue = password.value;

            // Call login function with emailValue and passwordValue
            const userData = await login(emailValue, passwordValue);
            
            // After successful login, store the user ID in localStorage
            localStorage.setItem('userId', userData.UID);

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
          email,
          password,
          validateUser,
          registerRedirect,
          eye,
          lockClosed
      };
      },
    });
  </script>

  <style scoped>
  .login-input{
    margin: 4px;
  }
  </style>