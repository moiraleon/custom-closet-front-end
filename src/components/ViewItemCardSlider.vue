<template>
  
  <ion-card class="tile">
    <swiper
      :loop="true"
      :modules="modules"
      :space-between="0"
      navigation
      :slides-per-view="1"
      :pagination="{ clickable: true }"
      :scrollbar="{ draggable: true }"
      
      @swiper="onSwiper"
      >
      <template v-for="(product, index) in tileProductsArray" :key="index">
        <swiper-slide class="closet-item-background-white" :data-tile-number="tileNumber">
          <img :src="product.IMG" :alt="product.PRODUCT_TYPE" :id="product.PRODUCT_ID"/>
        </swiper-slide>
      </template>
    </swiper>
    <div class="expand-product-info">
    <ion-button :id='"expandProductModal"+tileNumber' :strong="true">
      <ion-icon :icon="expandOutlineIcon"></ion-icon>
    </ion-button>

    <ion-modal ref="modal" :id='"productModal"+tileNumber' :trigger='"expandProductModal"+tileNumber'>
      <ion-header>
        <ion-toolbar>
          <ion-title>Update Product</ion-title>
          <ion-buttons slot="end">
            <ion-button color="danger" :strong="true" @click="cancel(tileNumber)">Cancel</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <img :src="modalImageSource" alt="Product Image"/>
         <ion-item>
          <ion-label>Would you like to delete this product?</ion-label>
            <ion-button :id="modalIDSource" @click="deleteProduct(modalIDSource)">Delete</ion-button>
         </ion-item>
         <ion-item>
         <p v-if="deleteStatus === 'loading'">Loading...</p>
         <p v-else-if="deleteStatus === 'success'">Success! Please refresh your page.</p>
         <p v-else-if="deleteStatus === 'error'">We had trouble processing your request. Please try again later.</p>
        </ion-item>
        <ion-button :strong="true" @click="cancel(tileNumber)">Close</ion-button>
      </ion-content>
    </ion-modal>
  </div>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Scrollbar, Zoom } from 'swiper/modules';
import { IonCard, IonModal, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonItem, IonLabel } from '@ionic/vue';
import { expandOutline } from 'ionicons/icons';
import {deleteProductById} from '../services/productServices'
 
import 'swiper/css';
import '@ionic/vue/css/ionic-swiper.css';
import 'swiper/css/autoplay';
import 'swiper/css/keyboard';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/zoom';

interface Product {
  IMG: string;
  PRODUCT_TYPE: string;
  PRODUCT_ID: string;
}

export default defineComponent({
  components: { IonCard, Swiper, SwiperSlide, IonModal, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonItem, IonLabel},
  props: {
    tileProductsArray: {
      type: Array as () => Product[], 
      required: true,
    },
    tileNumber: {
      type: Number,
      required: true,
    },
    productImg: String, 
    productType: String, 
    productId: String, 
  },
  setup(props) {
    let swiperInstance: typeof Swiper | null = null;
    const tileNumber = props.tileNumber;

    let slideOneCurrentSRC = ref('')
    let slideTwoCurrentSRC = ref('')
    let slideThreeCurrentSRC = ref('')

    let slideOneCurrentID = ref('')
    let slideTwoCurrentID = ref('')
    let slideThreeCurrentID = ref('')

    const { tileProductsArray } = props;
    const expandOutlineIcon = expandOutline;
    const deleteStatus = ref('');

    // Log the data
    //console.log('Tile Products Array:', tileProductsArray);

    const onSwiper = (swiper: any) => {
      swiperInstance = swiper;
    };
      
    //Set Image of Modal Expand
      const modalImageSource = computed(() => {
    if (swiperInstance) {
      const activeSlideIndex = swiperInstance.activeIndex;
      const activeSlide = swiperInstance.slides[activeSlideIndex];
      const imgElement = activeSlide.querySelector('img');
      if (imgElement) {
        return imgElement.src;
      }
    }
    return ''; // Default value if no image found
  });
    //Set ID of Modal Expand
      const modalIDSource = computed(() => {
    if (swiperInstance) {
      const activeSlideIndex = swiperInstance.activeIndex;
      const activeSlide = swiperInstance.slides[activeSlideIndex];
      const imgElement = activeSlide.querySelector('img');
      if (imgElement) {
        return imgElement.id;
      }
    }
    return ''; // Default value if no image found
  });

    const cancel = (id:Number) => { 
      const modal = document.querySelector('#productModal' + id) as Ref<typeof IonModal> | null;
        if (modal) {
          //@ts-ignore
          modal.dismiss(null, 'cancel');
        } else {
          console.error('Modal not found for id:', id);
        }
    };

    const deleteProduct = async (id:String)=>{
      try {
        deleteStatus.value = 'loading';
        const response = await deleteProductById(id.toString());
        deleteStatus.value = 'success';

        console.log(response);
        if (deleteStatus.value === 'success') {
                setTimeout(() => {
                    deleteStatus.value = '';
                    cancel(tileNumber); 
                }, 3000);
            }
      } catch (error:any) {
        deleteStatus.value = 'error';
        console.error(error)
      }
    }
    
    return {
      expandOutlineIcon,
      onSwiper,
      //onSlideChange,
      modalImageSource,
      modalIDSource,
      cancel,
      deleteProduct,
      deleteStatus,
      modules: [Navigation, Pagination, Scrollbar, Zoom],
    slideOneCurrentSRC,
    slideTwoCurrentSRC,
    slideThreeCurrentSRC,
    slideOneCurrentID,
    slideTwoCurrentID,
    slideThreeCurrentID,
    };
  },
});
</script>

<style scoped>
.expand-product-info{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 20;
  right: 0;
  top: 0;
}
.tile {
  max-width: 500px;
  background-color: white;
  width: 100%;
}

.tile img {
  width: auto;
}

.closet-item-background-white{
  background-color: white;
}
</style>