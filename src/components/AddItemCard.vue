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
          <ion-buttons slot="start">
            <ion-button @click="cancel()">Cancel</ion-button>
          </ion-buttons>
          <ion-title>Upload a new {{ addText }} </ion-title>
          <ion-buttons slot="end">
            <ion-button :strong="true" @click="confirm()">Confirm</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-item>
          <input :id="'input-'+tag" type="file" accept="image/jpeg, image/heic, image/png" @change="event => handleFileInput(event, tag)"  /><br />
          <img :id="'preview-' + tag" ref="preview" class="upload-preview-default-hidden" height="200" alt="Image preview" />
          <!-- <ion-input
            label="Enter your name"
            label-placement="stacked"
            ref="input"
            type="text"
            placeholder="Your name"
          ></ion-input> -->
        </ion-item>
      </ion-content>
    </ion-modal>
</template>

<script lang="ts">
import { IonCard, IonModal, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton } from '@ionic/vue';
import TileViewPreview from '@/components/TileViewPreview.vue';
import { OverlayEventDetail } from '@ionic/core/components';
import { defineComponent, ref } from 'vue';

// @ts-ignore
import { IKImage, IKContext, IKVideo, IKUpload } from "imagekitio-vue";
import heic2any from "heic2any";

export default defineComponent({
  components: { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, TileViewPreview, IonButton, IonModal, IKImage, IKContext, IKVideo, IKUpload },
  setup() {
    const modal = ref();
    // const input = ref();

    const cancel = () => modal.value.$el.dismiss(null, 'cancel');

    const confirm = () => {
    // const name = input.value.$el.value;
    modal.value.$el.dismiss(name, 'confirm');
  };

  const onWillDismiss = (ev: CustomEvent<OverlayEventDetail>) => {
    if (ev.detail.role === 'confirm') {
      message.value = `Hello, ${ev.detail.data}!`;
    }
  };

    //Main Handler for Image conversion to base64
    const handleFileInput = (event,tag) => {
      const file = event.target.files[0];
      const preview = document.getElementById("preview-"+tag);
      
      if (file) {
        if (file.type === "image/heic") {
          convertHEICtoJPEG(file, (jpegBlob) => {
            const reader = new FileReader();
            reader.onload = () => {
              preview.src = reader.result;
            };
            //Encode and display preview
            reader.readAsDataURL(jpegBlob);
            preview?.classList.remove('upload-preview-default-hidden')
          });
        } else {
          const reader = new FileReader();
          reader.onload = () => {
            preview.src = reader.result;
          };
          //Encode and display preview
          reader.readAsDataURL(file);
          preview?.classList.remove('upload-preview-default-hidden')
        }
      }
    };

    //Support for HEIC Image type
    const convertHEICtoJPEG = (heicFile, callback) => {
      const heicReader = new FileReader();
      heicReader.onload = (event) => {
        const arrayBuffer = event?.target?.result;
        heic2any({
          blob: new Blob([arrayBuffer], { type: "image/heic" }),
          toType: "image/jpeg",
          quality: 0.5, // Adjust JPEG quality as needed
        })
        .then((jpegBlob) => {
          callback(jpegBlob);
        })
        .catch((error) => {
          console.error("Error converting HEIC to JPEG:", error);
        });
      };
      heicReader.readAsArrayBuffer(heicFile);
    };



    // return { actionSheetButtons, uploadImageToImageKitIO, handleFileInput };
    return { modal, cancel, confirm, onWillDismiss, handleFileInput };
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
.upload-preview-default-hidden{
  display: none;
}
</style>
