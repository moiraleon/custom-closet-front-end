<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
  <SessionExpiredPopUp :showValue="showPopup" :redirectToLogin="redirectToLogin"/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import SessionExpiredPopUp from './components/SessionExpiredPopUp.vue'//'@/components/SessionExpired.vue'; // Adjust the path as needed
import eventBus from './views/eventBus'//'../views/eventBus';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: { IonApp, IonRouterOutlet, SessionExpiredPopUp },
  setup() {
    const showPopup = ref(false);
    const router = useRouter();
    const loginRoute = "/login";

    // Subscribe to session expiration event
    eventBus().emitter.on("session-expired", () => {
      showPopup.value = true;
    });
    const redirectToLogin = () => {
        router.push(loginRoute);
        showPopup.value = false;
      };

    return { showPopup, redirectToLogin };
  }
});
</script>