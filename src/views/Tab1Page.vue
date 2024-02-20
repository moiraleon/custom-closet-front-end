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
          <ion-title size="large">Customize Outfit</ion-title>
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
          <ion-card v-if="tile1Data.length === 0 && tile2Data.length === 0 && tile3Data.length === 0">
            <ion-card-header>
              <ion-card-title>Uh oh!</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              It looks like you have no items to display yet. Go ahead and add some items to get started!
            </ion-card-content>
            <ion-item>
              <ion-button @click="redirectToAddItemsPage">Add Items</ion-button>
            </ion-item>
          </ion-card>
        </div>
        <ion-toolbar>
            <ion-buttons>
              <ion-button @click="openFilter">
                Filter
                <ion-icon aria-hidden="true" :icon="funnelIcon" />
              </ion-button>
              <ion-button @click="refreshData" >
                Refresh
                <ion-icon aria-hidden="true" :icon="refreshIcon" />
              </ion-button>
              <ion-button @click="updateData">
                Update
                <ion-icon aria-hidden="true" :icon="checkmarkCircleOutlineIcon" />
              </ion-button>
              <ion-button @click="deleteData">
                Delete
                <ion-icon aria-hidden="true" :icon="trashIcon" />
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardContent, IonItem, IonButtons, IonButton, IonCardTitle, IonIcon } from '@ionic/vue';
import ViewItemCardSlider from '@/components/ViewItemCardSlider.vue';
import {refresh, trash, funnel ,checkmarkCircleOutline, funnelOutline, trashOutline } from 'ionicons/icons';
import { getUserProducts } from '../services/productServices';
import { tileConfig } from '../../tileConfig';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: { IonPage, IonToolbar, IonHeader, IonTitle, IonContent, ViewItemCardSlider, IonCard, IonCardHeader, IonCardContent, IonItem, IonButtons, IonButton, IonCardTitle, IonIcon},
  setup() {
    const router = useRouter();

    const refreshIcon = refresh;
    const trashIcon = trashOutline;
    const funnelIcon = funnelOutline;
    const checkmarkCircleOutlineIcon = checkmarkCircleOutline;


    const loading = ref(true);
    const tile1Data = ref([]);
    const tile2Data = ref([]);
    const tile3Data = ref([]);

    const refreshData = () => {
      // Implement refresh logic here
      console.log('Refreshing data...');
      fetchUserProductData()
    };

    const deleteData = () => {
      // Implement delete logic here
      console.log('Deleting data...');
    };

    const updateData = () => {
      // Implement delete logic here
      console.log('Updating data...');
    };

    const openFilter = () => {
      // Implement filter logic here
      console.log('Opening filter...');
    }

    // Fetch user data and update tile data
    const fetchUserProductData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (userId) {
          const userProductDataResponse = await getUserProducts(userId);
          tile1Data.value = userProductDataResponse.data.filter(product => tileConfig.tile1.includes(product.PRODUCT_TYPE));
          tile2Data.value = userProductDataResponse.data.filter(product => tileConfig.tile2.includes(product.PRODUCT_TYPE));
          tile3Data.value = userProductDataResponse.data.filter(product => tileConfig.tile3.includes(product.PRODUCT_TYPE));
          loading.value = false; 
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        loading.value = false; 
      }
    };
    const redirectToAddItemsPage = () => {
      router.push('/tabs/add');
    };
    // Fetch user data on component mount
    onMounted(fetchUserProductData);

    return {
      loading,
      tile1Data,
      tile2Data,
      tile3Data,
      refreshData,
      refreshIcon,
      deleteData,
      trashIcon,
      openFilter,
      funnelIcon,
      updateData,
      checkmarkCircleOutlineIcon,
      redirectToAddItemsPage
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