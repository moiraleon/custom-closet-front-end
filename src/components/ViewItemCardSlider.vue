<template>
  <ion-card>
    <swiper-container>
      <swiper-slide>Slide 1<img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" /></swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
    </swiper-container>
    <ion-card-header>
      <ion-card-title>Card Title</ion-card-title>
      <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      Here's a small text description for the card content. Nothing more, nothing less.
    </ion-card-content>
  </ion-card>
  </template>
  
  <script setup lang="ts">
      // import function to register Swiper custom elements
    import { register } from 'swiper/element/bundle';
    // register Swiper custom elements
    register();

  defineProps({
    name: String,
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
  