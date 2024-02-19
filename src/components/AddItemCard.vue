<template>
  <div id="container">
    <ion-card>
      <ion-card-header>
        <ion-card-title><strong>{{ name }}</strong></ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-card-subtitle>Add a new {{ addText }} to your closet library.</ion-card-subtitle>
        <TileViewPreview :tile1="tile1" :tile2="tile2" :tile3="tile3" />  
      </ion-card-content>
      <ion-button :id="'open-modal-' + tag" expand="block">Upload</ion-button>
    </ion-card>
  </div>
  <ion-modal ref="modal" :trigger="'open-modal-'+ tag" @willDismiss="onWillDismiss">
      <ion-header>
        <ion-toolbar>
          <ion-title>Upload a new {{ addText }} </ion-title>
          <ion-buttons slot="end">
            <ion-button :strong="true" @click="cancel()">Close</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-title>Please choose an image</ion-title>
        <ion-item class="upload-image-container">
          <input :id="'input-'+tag" type="file" accept="image/jpeg, image/heic, image/png" @change="event => handleFileInput(event, tag)"  /><br />
          <img :id="'preview-' + tag" ref="preview" class="default-hidden" height="200" alt="Image preview" />
          <ion-button :id="'continue-' + tag" class="default-hidden" @click="uploadImage(tag)">Continue</ion-button>
        </ion-item>
      </ion-content>
    </ion-modal>
</template>

<script lang="ts">
import { IonCard, IonModal, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, IonItem, IonTitle, IonToolbar, IonButtons, IonHeader, IonContent } from '@ionic/vue';
import TileViewPreview from '@/components/TileViewPreview.vue';
import { OverlayEventDetail } from '@ionic/core/components';
import { defineComponent, ref } from 'vue';
import { handleFileInput } from '../utils/validators';
import {uploadImageToImageKit} from '../services/imageServices';

// @ts-ignore
import { IKImage, IKContext, IKVideo, IKUpload } from "imagekitio-vue";

export default defineComponent({
  components: { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, TileViewPreview, IonButton, IonItem, IonModal, IonTitle, IonToolbar, IonButtons, IonHeader, IonContent, IKImage, IKContext, IKVideo, IKUpload },
  methods: {
        handleFileInput
      },
  setup() {

    const modal = ref();
    const cancel = () => modal.value.$el.dismiss(null, 'cancel');
    const onWillDismiss = (ev: CustomEvent<OverlayEventDetail>) => modal.value.$el.dismiss(null, 'cancel');

    //Upload Image to ImageKitIO
    async function uploadImage(tag:String){
      const userId = localStorage.getItem('userId');
      const base64File = (document.querySelector('#preview-'+tag) as HTMLImageElement)?.src || '';
        if (userId && base64File) {
          try {
            const body ={
              tag: tag,
              base64File:base64File
            }
            const imageData = await uploadImageToImageKit(userId, body);
              console.log(imageData)
              } catch (error) {
                console.error('Failed to upload image:', error);
              }
            }
    };

     return { modal, cancel, onWillDismiss, uploadImage, handleFileInput};
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
    },
  },
});
</script>

<style scoped>
.default-hidden{
  display: none;
}

.upload-image-container{
  display: flex;
  flex-direction: row;
}
</style>
