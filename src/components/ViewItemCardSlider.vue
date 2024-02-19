<template>
  <ion-card class="tile">
    <swiper
      :loop="true"
      :modules="modules"
      :space-between="0"
      navigation
      :slides-per-view="1"
      :slides-per-group="3"
      :pagination="{ clickable: true }"
      :scrollbar="{ draggable: true }"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <template v-for="(product, index) in tileProductsArray" :key="index">
        <swiper-slide>
          <img :src="product.IMG" :alt="product.PRODUCT_TYPE" :id="product.PRODUCT_ID"/>
        </swiper-slide>
      </template>
    </swiper>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Scrollbar, Zoom } from 'swiper/modules';
import { IonCard } from '@ionic/vue';

import 'swiper/css';
import '@ionic/vue/css/ionic-swiper.css';
import 'swiper/css/autoplay';
import 'swiper/css/keyboard';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/zoom';

export default defineComponent({
  components: { IonCard, Swiper, SwiperSlide },
  props: {
    tileProductsArray: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const { tileProductsArray } = props;

    // Log the data
    console.log('Tile Products Array:', tileProductsArray);

    const onSwiper = (swiper) => {};
    const onSlideChange = () => {};
    
    return {
      onSwiper,
      onSlideChange,
      modules: [Navigation, Pagination, Scrollbar, Zoom],
    };
  },
});
</script>

<style scoped>
.tile {
  max-width: 500px;
}

.tile img {
  width: auto;
}
</style>