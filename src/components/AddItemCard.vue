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
          <input type="file" accept="image/*,.heic" />
          <ion-button :id="'open-action-sheet-' + tag" :disabled="!enabled">Upload</ion-button>
        <ion-action-sheet :trigger="'open-action-sheet-' + tag" :header="'Upload ' + tag + ' to your closet library'" :buttons="actionSheetButtons"></ion-action-sheet>
      </ion-card>
      </div>
</template>

<script lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,IonButton } from '@ionic/vue';
import TileViewPreview from '@/components/TileViewPreview.vue';
import { defineComponent } from 'vue';

// @ts-ignore
import { IKImage, IKContext, IKVideo, IKUpload } from "imagekitio-vue";
  export default defineComponent({
    components: { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, TileViewPreview,IonButton, IKImage, IKContext, IKVideo, IKUpload},
    setup() {
      const actionSheetButtons = [
        {
          text: 'Upload',
          role: 'upload',
          data: {
            action: 'upload',
          },
          handler: () => {
          console.log('Upload action triggered');
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
      const handleAction = (action: string) => {
      if (action === 'upload') {
        console.log('Upload action triggered');
      } else {
        return;
      }
    };

      return { actionSheetButtons, handleAction};
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
</style>
