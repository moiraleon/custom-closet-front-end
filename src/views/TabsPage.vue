<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="style" href="/tabs/style">
          <ion-icon aria-hidden="true" :icon="body" />
          <ion-label>Style</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="add" href="/tabs/add">
          <ion-icon aria-hidden="true" :icon="addCircle" />
          <ion-label>Add</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="settings" href="/tabs/settings">
          <ion-icon aria-hidden="true" :icon="settings" />
          <ion-label>Settings</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { body, addCircle, settings } from 'ionicons/icons';
</script>
<style>
.tab-selected{
  background: rgb(187, 187, 187) !important;
  color: white !important;
  border-radius:10px;
}
</style>