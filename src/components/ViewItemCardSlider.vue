<template>
  <ion-card class="tile">
      <swiper 
      :loop="true"
      :modules="modules"
    :space-between="0"
    navigation
    :pagination="{clickable: true }"
    :scrollbar="{draggable: true }"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
      >
      <swiper-slide>
        <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
      </swiper-slide>
      <swiper-slide>
        <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
      </swiper-slide>
      <swiper-slide>
        <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
      </swiper-slide>
      <swiper-slide>
        <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
      </swiper-slide>
      <swiper-slide>
        <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
      </swiper-slide>
      </swiper>
    <!-- <ion-card-header>
      <ion-card-title>{{name}}</ion-card-title>
    </ion-card-header> -->
  </ion-card>
  </template>
  <script lang="ts">
  import { defineComponent } from 'vue';
  //  import { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
  import { Swiper, SwiperSlide,useSwiper } from 'swiper/vue';
  import { Navigation, Pagination, Scrollbar, A11y, Keyboard, Zoom} from 'swiper/modules';
  import {IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonicSlides } from '@ionic/vue';
  
  import 'swiper/css';
  import '@ionic/vue/css/ionic-swiper.css';
  import 'swiper/css/autoplay';
  import 'swiper/css/keyboard';
  import 'swiper/css/pagination';
  import 'swiper/css/scrollbar';
  import 'swiper/css/zoom';

    export default defineComponent({
      components: { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, Swiper, SwiperSlide, IonContent, IonPage, A11y},
      setup() {
        // const swiper = useSwiper();
        const onSwiper = (swiper) => {
        console.log(swiper);
      };
      const onSlideChange = () => {
      };  
        return {
        onSwiper,
        onSlideChange,
        modules: [Navigation, Keyboard, Pagination, Scrollbar, Zoom, IonicSlides],
      };
      },
      props: {
        name: {
          type: String,
          required: true,
        }
    },
    });
  </script>
  
  <style scoped>
  .tile{
    max-width: 500px;
  }
  </style>
  