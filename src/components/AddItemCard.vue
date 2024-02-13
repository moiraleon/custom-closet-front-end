<template>
  <div id="container">
      <ion-card>
        <ion-card-header>
          <ion-card-title><strong>{{ name }}</strong></ion-card-title>
        </ion-card-header>
          <IonCardContent>
          <ion-card-subtitle>Add a new {{ addText }} to your closet library.</ion-card-subtitle>
          <TileViewPreview :tile1="tile1" :tile2="tile2" :tile3="tile3" />  
        </IonCardContent>
          <ion-button :id="'open-action-sheet-' + tag" :disabled="!enabled">Upload</ion-button>
        <ion-action-sheet :trigger="'open-action-sheet-' + tag" header="Actions" :buttons="actionSheetButtons"></ion-action-sheet>
      </ion-card>
      </div>
</template>

<script lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,IonButton } from '@ionic/vue';
import TileViewPreview from '@/components/TileViewPreview.vue';
import { defineComponent } from 'vue';

  export default defineComponent({
    components: { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, TileViewPreview,IonButton },
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
      tag: {
        type: String,
        required: true,
    },
      tile1: {
        type: Boolean,
        required: true,
      },
      tile2: {
        type: Boolean,
        required: true,
      },
      tile3: {
        type: Boolean,
        required: true,
    },
    enabled: {
        type: Boolean,
        required: false,
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
