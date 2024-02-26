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
      <ion-button :id="'open-modal-' + tag" expand="block" :disabled=disabled>Upload</ion-button>
    </ion-card>
  </div>
  <ion-modal ref="modal" :trigger="'open-modal-'+ tag" :id="'modal-' + tag" >
    <ion-card>
      <ion-header>
        <ion-toolbar>
          <ion-title>Upload a new {{ addText }} </ion-title>
          <ion-buttons slot="end">
            <ion-button :strong="true" @click="cancel(tag)" color="danger">Close</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
        <ion-card-header>
        <ion-card-title><strong>Please choose an image</strong></ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-item>
          <input :id="'input-'+tag" type="file" accept="image/jpeg, image/heic, image/png" @change="event => handleFileInput(event, tag)"  /><br />
        </ion-item>
        <ion-item>
          <img :id="'preview-' + tag" ref="preview" class="default-hidden" height="200" alt="Image preview" />
        </ion-item>
        <ion-item>
          <ion-button :id="'continue-' + tag" class="default-hidden" @click="uploadImageAndCreateProduct(tag)" :disabled="false">Continue</ion-button>
        </ion-item>
          <div v-if="isLoading">Loading...</div>
          <div v-if="isSuccess">Success!</div>
          <div v-if="isError">Failed to create product, please try again later.</div>
      </ion-card-content>
      </ion-card>
    </ion-modal>
</template>
<script lang="ts">
import { IonCard, IonModal, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, IonItem, IonTitle, IonToolbar, IonButtons, IonHeader, IonContent } from '@ionic/vue';
import TileViewPreview from '@/components/TileViewPreview.vue';
import { OverlayEventDetail } from '@ionic/core/components';
import { defineComponent, ref, Ref, reactive, nextTick } from 'vue';
import { handleFileInput } from '../utils/validators';
import { retrieveSingleUseToken, uploadImageToImageKit } from '../services/imageServices';
import { createProduct } from '../services/productServices';
import { IMAGEKIT_PUBLIC_KEY } from '../../pvars';

// @ts-ignore
import { IKImage, IKContext, IKVideo, IKUpload } from "imagekitio-vue";

export default defineComponent({
  components: { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, TileViewPreview, IonButton, IonItem, IonModal, IonTitle, IonToolbar, IonButtons, IonHeader, IonContent, IKImage, IKContext, IKVideo, IKUpload },
  setup() {
    const cancel = async (tag:String) => { 
      const modal = document.querySelector('#modal-' + tag) as Ref<typeof IonModal> | null;
        if (modal) {
          //@ts-ignore
          modal.dismiss(null, 'cancel');
        } else {
          console.error('Modal not found for tag:', tag);
        }
    };

    return{cancel}
  },
  data() {
    return {
      buttonDisabled: false,
      isLoading: false,
      isSuccess: false,
      isError: false
    };
  },
  methods: {
    handleFileInput,
    async uploadImageAndCreateProduct(tag: string) {
      this.isLoading = true;
      const userId = localStorage.getItem('userId');
      const base64File = (document.querySelector('#preview-' + tag) as HTMLImageElement)?.src || '';
      if (userId && base64File) {
        try {
          await this.disableUploadButton(tag);
          const singleUseAuth = await retrieveSingleUseToken();
          const imageData = await this.uploadImage(userId, tag, singleUseAuth);
          const createProductData = await this.createProductInDB(userId, tag, imageData?.data);
          const imageUploadStatus = imageData?.status || 0;
          const createProductStatus = createProductData?.status || 0;
          await this.displayUserFeedback(imageUploadStatus, createProductStatus);
        } catch (error:any) {
          console.error('Failed to upload image:', error);
        }
      }
      this.isLoading = false;
    },
    async disableUploadButton(tag: string) {
      const button = document.querySelector('#continue-' + tag) as HTMLButtonElement;
      if (button) {
        button.disabled = true;
      }
    },
    async uploadImage(userId: string, tag: string, singleUseAuth: any) {
      const base64File = (document.querySelector('#preview-' + tag) as HTMLImageElement)?.src || '';
      if (userId && base64File) {
        try {
          const body = new FormData();
          //const IMAGEKIT_PUBLIC_KEY = process.env.IMAGEKIT_PUBLIC_KEY || '';
          body.append('file', base64File);
          body.append('publicKey', IMAGEKIT_PUBLIC_KEY);
          body.append('signature', singleUseAuth?.signature || '');
          body.append('expire', singleUseAuth?.expire || '');
          body.append('token', singleUseAuth?.token || '');
          body.append('folder', `${userId}`);
          body.append('fileName', `${userId}_${tag}.jpg`);
          body.append('tags', `${tag}`);
          const imageData = await uploadImageToImageKit(body);
          return imageData;
        } catch (error:any) {
          console.error('Failed to upload image:', error);
        }
      }
    },
    async createProductInDB(userId: string, tag: string, imageData: any) {
      try {
        const productBody = {
          "userID": userId,
          "productType": tag,
          "img": imageData?.url,
          "supported": true,
        }
        const createProductData = await createProduct(productBody);
        return createProductData;
      } catch (error:any) {
        console.error('Failed to add product to DB:', error);
      }
    },
    async displayUserFeedback(uploadImageStatus: number, createProductStatus: number) {
      try {
        if (uploadImageStatus === 200 && createProductStatus === 201) {
          this.isSuccess = true;
        } else {
          console.log(`upload image status: ${uploadImageStatus} create product status: ${createProductStatus}`);
          this.isError = true;
        }
      } catch (error:any) {
        console.error('Failed to display user feedback:', error);
      }
    }
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
    disabled: {
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
