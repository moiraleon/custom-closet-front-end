<template>
  <div id="container">
      <ion-card>
        <ion-card-header>
          <ion-card-title><strong>{{ name }}</strong></ion-card-title>
          <ion-card-subtitle>Add a new {{ addText }} to your closet library.</ion-card-subtitle>
          </ion-card-header>
          <ion-button :id="'open-action-sheet-' + idAppend">Upload</ion-button>
        <ion-action-sheet :trigger="'open-action-sheet-' + idAppend" header="Actions" :buttons="actionSheetButtons"></ion-action-sheet>
      </ion-card>
      </div>
</template>

<script lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
import { defineComponent } from 'vue';

  export default defineComponent({
    components: { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle },
    setup() {
      const actionSheetButtons = [
        {
          text: 'Upload',
          data: {
            action: 'upload',
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
    props: {
      name: {
        type: String,
        required: true,
      },
      addText: {
        type: String,
        required: true,
      },
      idAppend: {
        type: String,
        required: true,
    }
  },
  });
</script>

<style scoped>
/* #container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
} */
</style>
