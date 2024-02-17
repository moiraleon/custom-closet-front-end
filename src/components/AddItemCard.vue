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
      <input :id="'input-'+tag" type="file" accept="image/jpeg, image/heic, image/png" @change="event => handleFileInput(event, tag)"  /><br />
      <img :id="'preview-' + tag" ref="preview" class="upload-preview-default-hidden" height="200" alt="Image preview" />
      <ion-button :id="'open-action-sheet-' + tag" :disabled="!enabled">Upload</ion-button>
      <ion-action-sheet :trigger="'open-action-sheet-' + tag" :header="'Upload a new ' + addText + ' to your closet library'" :buttons="actionSheetButtons"></ion-action-sheet>
    </ion-card>
  </div>
</template>

<script lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton } from '@ionic/vue';
import TileViewPreview from '@/components/TileViewPreview.vue';
import { defineComponent } from 'vue';

// @ts-ignore
import { IKImage, IKContext, IKVideo, IKUpload } from "imagekitio-vue";
import heic2any from "heic2any";

export default defineComponent({
  components: { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, TileViewPreview, IonButton, IKImage, IKContext, IKVideo, IKUpload },
  setup() {
    const actionSheetButtons = [
      {
        text: 'Upload',
        role: 'upload',
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
            reader.readAsDataURL(jpegBlob);
            preview?.classList.remove('upload-preview-default-hidden')
          });
        } else {
          const reader = new FileReader();
          reader.onload = () => {
            preview.src = reader.result;
          };
          reader.readAsDataURL(file);
          preview?.classList.remove('upload-preview-default-hidden')
        }
      }
    };

    const convertHEICtoJPEG = (heicFile, callback) => {
      const heicReader = new FileReader();
      heicReader.onload = (event) => {
        const arrayBuffer = event.target.result;
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

    return { actionSheetButtons, handleFileInput };
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
