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
              <ion-toolbar>
            <ion-buttons class="mini-toolbar">
              <ion-button @click="openFilter" color="dark" id="openFilterModal">
                Filter
                <ion-icon aria-hidden="true" :icon="funnelIcon" />
              </ion-button>
              <ion-button @click="refreshData" color="dark">
                Refresh
                <ion-icon aria-hidden="true" :icon="refreshIcon" />
              </ion-button>
              <!-- <ion-button @click="updateData" color="dark">
                Update
                <ion-icon aria-hidden="true" :icon="checkmarkCircleOutlineIcon" />
              </ion-button>
              <ion-button @click="deleteData" color="dark">
                Delete
                <ion-icon aria-hidden="true" :icon="trashIcon" />
              </ion-button> -->
            </ion-buttons>
          </ion-toolbar>
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
          <ion-card v-if="tile1Data.length === 0 && tile2Data.length === 0 && tile3Data.length === 0">
            <ion-card-header>
            </ion-card-header>
            <ion-card-content>
              Already added items? Refresh this page
              <ion-item>
                <ion-button @click="refreshData">Refresh</ion-button>
              </ion-item>
            </ion-card-content>
          </ion-card>
        </div>
      </div>
      <ion-modal ref="modal" trigger="openFilterModal" id="filterModal" >
      <ion-header>
        <ion-toolbar>
          <ion-title>Filter Items</ion-title>
          <ion-buttons slot="end">
            <ion-button :strong="true" @click="cancel('filterModal')">Cancel</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-list>
        <ion-title>Which section would you like to filter?</ion-title>
        <ion-item class="filter-tile-dropdown">
          <ion-label>Tile 1</ion-label>
          <ion-select
          aria-label="Tile1"
          placeholder="Select Tile1"
          @ionChange="handleChange($event, 1)"
          @ionCancel="handleCancel()"
          @ionDismiss="handleDismiss()"
          >
            <ion-select-option value="shirt">Shirts</ion-select-option>
            <ion-select-option value="sweater">Sweaters</ion-select-option>
            <ion-select-option value="tanktop">Tanktops</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item class="filter-tile-dropdown">
          <ion-label>Tile 2</ion-label>
          <ion-select
          aria-label="Tile2"
          placeholder="Select Tile2"
          @ionChange="handleChange($event, 2)"
          @ionCancel="handleCancel()"
          @ionDismiss="handleDismiss()"
          >
            <ion-select-option value="pants">Pants</ion-select-option>
            <ion-select-option value="shorts">Shorts</ion-select-option>
            <ion-select-option value="skirt">Skirt</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item class="filter-tile-dropdown" :disabled="true">
          <ion-label>Tile 3 (Not yet supported)</ion-label>
          <ion-select>
            <ion-select-option value="option1">Shoes</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-button :strong="true" @click="handleApply()">Apply</ion-button>
        </ion-item>
      </ion-list>
      </ion-content>
    </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardContent, IonItem, IonButtons, IonButton, IonCardTitle, IonIcon, IonSegment, IonSegmentButton, IonModal, IonLabel,IonSelect, IonSelectOption, IonImg, IonAvatar, IonList } from '@ionic/vue';
import ViewItemCardSlider from '@/components/ViewItemCardSlider.vue';
import {refresh, trash, funnel ,checkmarkCircleOutline, funnelOutline, trashOutline, shirtOutline } from 'ionicons/icons';
import { getUserProducts, getUserProductsByType } from '../services/productServices';
import { tileConfig } from '../../tileConfig';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: { IonPage, IonToolbar, IonHeader, IonTitle, IonContent, ViewItemCardSlider, IonCard, IonCardHeader, IonCardContent, IonItem, IonButtons, IonButton, IonCardTitle, IonIcon, IonSegment, IonSegmentButton, IonModal, IonLabel,IonSelect, IonSelectOption, IonImg, IonAvatar, IonList},  
  setup() {
    const router = useRouter();

    const refreshIcon = refresh;
    const trashIcon = trashOutline;
    const funnelIcon = funnelOutline;
    const checkmarkCircleOutlineIcon = checkmarkCircleOutline;
    const shirtOutlineIcon = shirtOutline;


    const loading = ref(true);
    const tile1Data = ref([]);
    const tile2Data = ref([]);
    const tile3Data = ref([]);

    //Filtered Data (for testing only)
    // let tile1FilteredDataBool = ref(false);
    // let tile2FilteredDataBool = ref(false);
    // let tile3FilteredDataBool = ref(false); //Not yet suppported

    let tile1Filter = ref(); 
    let tile2Filter = ref(); 
    let tile3Filter = ref(); //Not yet suppported

    let tile1FilteredData = ref([]);
    let tile2FilteredData = ref([]);
    let tile3FilteredData = ref([]); //Not yet suppported

    const refreshData = () => {
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
      } catch (error:any) {
        console.error('Failed to fetch user data:', error);
        loading.value = false; 
      }
    };
    const redirectToAddItemsPage = () => {
      router.push('/tabs/add');
    };
    // Fetch user data on component mount
    onMounted(fetchUserProductData);

    const cancel = (id:String) => { 
      console.log(id)
      const modal = document.querySelector('#' + id) as IonModal;
        if (modal) {
          //(for testing only)
          // if(id == 'filterModal'){
          //   console.log("closing filter modal")
          //   tile1FilteredDataBool.value = false
          //   tile2FilteredDataBool.value = false
          //   tile3FilteredDataBool.value = false
          //   modal.dismiss(null, 'cancel');
          // }
          modal.dismiss(null, 'cancel');
        } else {
          console.error('Modal not found for id:', id);
        }
    };

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
      redirectToAddItemsPage,
      cancel,
      shirtOutlineIcon,
      // tile1FilteredDataBool,
      // tile2FilteredDataBool,
      // tile3FilteredDataBool,
      tile1FilteredData,
      tile2FilteredData,
      tile3FilteredData,
      tile1Filter,
      tile2Filter,
      tile3Filter
    };
  },
  methods: {
      handleChange(ev:any, tile:Number) {
        console.log('ionChange fired with value: ' + ev.detail.value, 'for tile ', tile);
        if(tile == 1){this.tile1Filter = ev.detail.value}
        if(tile == 2){this.tile2Filter = ev.detail.value}
        if(tile == 3){this.tile3Filter = ev.detail.value}
        console.log('tile1',this.tile1Filter)
        console.log('tile2',this.tile2Filter)
        console.log('tile3',this.tile3Filter)
      },
      handleCancel() {
        console.log('ionCancel fired');
      },
      async handleApply() {
        console.log('Apply Filter fired');
        console.log('tile1',this.tile1Filter)
        console.log('tile2',this.tile2Filter)
        console.log('tile3',this.tile3Filter)

        //Query DB for filtered content
        if(this.tile1Filter){
          console.log(this.tile1Filter)
          const userId = localStorage.getItem('userId');
            if (userId) {
              const tile1Results = await getUserProductsByType(this.tile1Filter, userId)
              console.log("tile1Results",tile1Results.data)
              this.tile1FilteredData = tile1Results.data;
              //Reset filter after query
              this.tile1Filter = ref();
            }
        }
        if(this.tile2Filter){
          console.log(this.tile2Filter)
          const userId = localStorage.getItem('userId');
            if (userId) {
              const tile2Results = await getUserProductsByType(this.tile2Filter, userId)
              console.log("tile2Results",tile2Results.data)
              this.tile2FilteredData = tile2Results.data;
              //Reset filter after query
              this.tile2Filter = ref();
            }
        }
        if(this.tile3Filter){
          console.log(this.tile3Filter)
          const userId = localStorage.getItem('userId');
            if (userId) {
              const tile3Results = await getUserProductsByType(this.tile3Filter, userId)
              console.log("tile3Results",tile3Results.data)
              this.tile3FilteredData = tile3Results.data;
              //Reset filter after query
              this.tile3Filter = ref();
            }
        }

        //Set filtered data 
        this.cancel('filterModal');
      },
      handleDismiss() {
        console.log('ionDismiss fired');
      }
    }, 
});
</script>

<style scoped>
#tile-column {
  display: flex;
  flex-direction: column;
}

.mini-toolbar{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.avatar-layout{
    display: flex;
    justify-content: center;
    align-items: center;
}

@media only screen and (min-width: 550px) {
  #tile-column {
    align-items: center;
    justify-content: center;
    width: inherit;
  }
}

</style>