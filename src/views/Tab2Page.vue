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

      <AddItemCard name="Shirt" tag="shirt" addText="shirt"/>
      <AddItemCard name="Sweater" tag="sweater" addText="sweater"/>
      <AddItemCard name="Jacket" tag="jacket" addText="jacket"/>
      <AddItemCard name="Pants" tag="pants" addText="pair of pants"/>
      <AddItemCard name="Shorts" tag="shorts" addText="pair of shorts"/>
      <AddItemCard name="Skirt" tag="skirt" addText="skirt"/>
      <AddItemCard name="Dress" tag="dress" addText="dress"/>
      <AddItemCard name="Shoes" tag="shoes" addText="pair of shoes"/>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import AddItemCard from '@/components/AddItemCard.vue';
</script>
