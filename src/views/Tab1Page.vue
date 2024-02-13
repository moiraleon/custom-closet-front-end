<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Customize Outfit</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding ion-text-center" :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>
      <div id="tile-column">
        <ViewItemCardSlider class="ion-align-items-center" name="Tile 1" />
        <ViewItemCardSlider class="ion-align-items-center" name="Tile 2" />
        <ViewItemCardSlider class="ion-align-items-center" name="Tile 3" />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ViewItemCardSlider from '@/components/ViewItemCardSlider.vue';
</script>

<style scoped>
#tile-column{
  display: flex;
  flex-direction: column;
}

@media only screen and (min-width: 550px) {
  #tile-column{
  align-items: center;
  justify-content: center;
  width: inherit;
}
}
</style>