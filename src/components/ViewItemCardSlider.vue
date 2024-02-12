<template>
  <ion-card>
      <swiper :loop="true">
      <swiper-slide>Slide 1
        <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
      </swiper-slide>
      <swiper-slide>Slide 2
        <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
      </swiper-slide>
      <swiper-slide>Slide 3
        <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
      </swiper-slide>
      </swiper>
    <ion-card-header>
      <ion-card-title>{{name}}</ion-card-title>
      <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      Here's a small text description for the card content. Nothing more, nothing less.
    </ion-card-content>
  </ion-card>
  </template>
  <script lang="ts">
  import { defineComponent } from 'vue';
  //  import { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import {IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
  
  import 'swiper/css';
  import '@ionic/vue/css/ionic-swiper.css';

    export default defineComponent({
      components: { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, Swiper, SwiperSlide, IonContent, IonPage},
      setup() {
        // const actionSheetButtons = [
        //   {
        //     text: 'Upload',
        //     data: {
        //       action: 'upload',
        //     },
        //   },
        //   {
        //     text: 'Cancel',
        //     role: 'cancel',
        //     data: {
        //       action: 'cancel',
        //     },
        //   },
        // ];
  
        // return { actionSheetButtons };
      //   return {
      //   modules: [Autoplay, Keyboard, Pagination, Scrollbar, Zoom],
      // };
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
  #container {
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
  }
  </style>
  