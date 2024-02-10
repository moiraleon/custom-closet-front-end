<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Add New Items to Closet</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-card>
    <ion-card-header>
      <ion-card-title>Shirt</ion-card-title>
      <ion-card-subtitle>Add a new shirt to your closet library.</ion-card-subtitle>
      </ion-card-header>
    <ion-button id="open-action-sheet-shirt">Upload</ion-button>
    <ion-action-sheet trigger="open-action-sheet-shirt" header="Actions" :buttons="actionSheetButtons"></ion-action-sheet>
  </ion-card>
  <ion-card>
    <ion-card-header>
      <ion-card-title>Pants</ion-card-title>
      <ion-card-subtitle>Add a new pair of pants to your closet library.</ion-card-subtitle>
      </ion-card-header>
    <ion-button id="open-action-sheet-pants">Upload</ion-button>
    <ion-action-sheet trigger="open-action-sheet-pants" header="Actions" :buttons="actionSheetButtons"></ion-action-sheet>
  </ion-card>
  <ion-card>
    <ion-card-header>
      <ion-card-title>Skirt</ion-card-title>
      <ion-card-subtitle>Add a new skirt to your closet library.</ion-card-subtitle>
      </ion-card-header>
    <ion-button id="open-action-sheet-skirt">Upload</ion-button>
    <ion-action-sheet trigger="open-action-sheet-skirt" header="Actions" :buttons="actionSheetButtons"></ion-action-sheet>
  </ion-card>
  <ion-card>
    <ion-card-header>
      <ion-card-title>Dress</ion-card-title>
      <ion-card-subtitle>Add a new dress to your closet library.</ion-card-subtitle>
      </ion-card-header>
    <ion-button id="open-action-sheet-dress">Upload</ion-button>
    <ion-action-sheet trigger="open-action-sheet-dress" header="Actions" :buttons="actionSheetButtons"></ion-action-sheet>
  </ion-card>
  <ion-card>
    <ion-card-header>
      <ion-card-title>Shoes</ion-card-title>
      <ion-card-subtitle>Add a new pair of shoes to your closet library.</ion-card-subtitle>
      </ion-card-header>
    <ion-button id="open-action-sheet-shoes">Upload</ion-button>
    <ion-action-sheet trigger="open-action-sheet-shoes" header="Actions" :buttons="actionSheetButtons"></ion-action-sheet>
  </ion-card>
    </ion-content>
  </ion-page>
</template>

<!-- <script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
</script> -->

<script lang="ts">
  import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
  import { defineComponent } from 'vue';
  import { IonActionSheet, IonButton } from '@ionic/vue';

  export default defineComponent({
    components: { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonActionSheet, IonButton  },
  

    setup() {
      const actionSheetButtons = [
        {
          text: 'Delete',
          role: 'destructive',
          data: {
            action: 'delete',
          },
        },
        {
          text: 'Share',
          data: {
            action: 'share',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ];

      return { actionSheetButtons };
    },
  });
</script>