<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Customize Outfit</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding ion-text-center" :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>
      <div id="tile-column">
        <div v-if="loading">
          Loading closet data...
        </div>
        <div v-else>
          <ViewItemCardSlider class="ion-align-items-center" name="Tile 1" :tileProductsArray="tile1Data" />
          <ViewItemCardSlider class="ion-align-items-center" name="Tile 2" :tileProductsArray="tile2Data" />
          <ViewItemCardSlider class="ion-align-items-center" name="Tile 3" :tileProductsArray="tile3Data" />
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ViewItemCardSlider from '@/components/ViewItemCardSlider.vue';
import { getUserProducts } from '../services/productServices';
import { tileConfig } from '../../tileConfig';

export default defineComponent({
  components: { IonPage, IonToolbar, IonHeader, IonTitle, IonContent, ViewItemCardSlider },
  setup() {
    const loading = ref(true);
    const tile1Data = ref([]);
    const tile2Data = ref([]);
    const tile3Data = ref([]);

    // Fetch user data and update tile data
    const fetchUserProductData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (userId) {
          const userProductDataResponse = await getUserProducts(userId);
          console.log('User product data:', userProductDataResponse.data); 
          tile1Data.value = userProductDataResponse.data.filter(product => tileConfig.tile1.includes(product.PRODUCT_TYPE));
          tile2Data.value = userProductDataResponse.data.filter(product => tileConfig.tile2.includes(product.PRODUCT_TYPE));
          tile3Data.value = userProductDataResponse.data.filter(product => tileConfig.tile3.includes(product.PRODUCT_TYPE));
          console.log('User product data:', tile1Data.value,tile2Data.value,tile3Data.value); 
          loading.value = false; 
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        loading.value = false; 
      }
    };

    // Fetch user data on component mount
    onMounted(fetchUserProductData);

    return {
      loading,
      tile1Data,
      tile2Data,
      tile3Data,
    };
  },
});
</script>

<style scoped>
#tile-column {
  display: flex;
  flex-direction: column;
}

@media only screen and (min-width: 550px) {
  #tile-column {
    align-items: center;
    justify-content: center;
    width: inherit;
  }
}
</style>