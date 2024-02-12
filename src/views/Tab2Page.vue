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
      
      <AddItemCard name="Shirt" tag="shirt" addText="shirt" :tile1="true" :tile2="false" :tile3="false"/>
      <AddItemCard name="Tank-Top" tag="tanktop" addText="tank-top" :tile1="true" :tile2="false" :tile3="false"/>
      <AddItemCard name="Sweater" tag="sweater" addText="sweater" :tile1="true" :tile2="false" :tile3="false"/>
      <AddItemCard name="Jacket" tag="jacket" addText="jacket" :tile1="true" :tile2="false" :tile3="false"/>
      <AddItemCard name="Pants" tag="pants" addText="pair of pants" :tile1="false" :tile2="true" :tile3="false"/>
      <AddItemCard name="Shorts" tag="shorts" addText="pair of shorts" :tile1="false" :tile2="true" :tile3="false"/>
      <AddItemCard name="Skirt" tag="skirt" addText="skirt" :tile1="false" :tile2="true" :tile3="false"/>
      <AddItemCard name="Dress" tag="dress" addText="dress" :tile1="true" :tile2="true" :tile3="false"/>
      <AddItemCard name="Shoes" tag="shoes" addText="pair of shoes" :tile1="false" :tile2="false" :tile3="true"/>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import AddItemCard from '@/components/AddItemCard.vue';

</script>
