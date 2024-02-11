<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Add New Items</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 2</ion-title>
        </ion-toolbar>
      </ion-header>

      <AddItemCard name="Shirt" idAppend="shirt" addText="shirt"/>
      <AddItemCard name="Sweater" idAppend="sweater" addText="sweater"/>
      <AddItemCard name="Jacket" idAppend="jacket" addText="jacket"/>
      <AddItemCard name="Pants" idAppend="pants" addText="pair of pants"/>
      <AddItemCard name="Skirt" idAppend="shirt" addText="skirt"/>
      <AddItemCard name="Dress" idAppend="dress" addText="dress"/>
      <AddItemCard name="Shoes" idAppend="shoes" addText="pair of shoes"/>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import AddItemCard from '@/components/AddItemCard.vue';
</script>
