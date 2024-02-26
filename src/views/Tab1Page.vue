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
              <ion-button color="dark" id="openFilterModal">
                Filter
                <ion-icon aria-hidden="true" :icon="funnelIcon" />
              </ion-button>
              <ion-button @click="refreshData" color="dark">
                Refresh
                <ion-icon aria-hidden="true" :icon="refreshIcon" />
              </ion-button>
              <ion-button @click="resetFilters" color="dark">
              Clear Filters
              <ion-icon :icon="removeCircleOutlineIcon"></ion-icon>
            </ion-button>
            </ion-buttons>
          </ion-toolbar>
      <div id="tile-column">
        <div>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      </div>
        <div v-if="loading">
          Loading closet data...
        </div>
        <div v-else>
          <div class="tile" v-if="!loading && tile1Data.length > 0">
          <ViewItemCardSlider class="ion-align-items-center" name="Tile 1" :tileProductsArray="displayedTile1Data" :tileNumber=1></ViewItemCardSlider>
          <ion-button v-if="tile1FilteredData.length > 0" @click="clearFilter(1)" color="danger" class="remove-filter">
            &#215;
          </ion-button>
          </div>
          <div class="tile" v-if="!loading && tile2Data.length > 0">
          <ViewItemCardSlider class="ion-align-items-center" name="Tile 2" :tileProductsArray="displayedTile2Data" :tileNumber=2></ViewItemCardSlider>
          <ion-button v-if="tile2FilteredData.length > 0" @click="clearFilter(2)" color="danger" class="remove-filter">
            &#215;
        </ion-button>
          </div>
          <div class="tile" v-if="!loading && tile3Data.length > 0">
          <ViewItemCardSlider class="ion-align-items-center" name="Tile 3" :tileProductsArray="displayedTile3Data" :tileNumber=3></ViewItemCardSlider>
          <ion-button v-if="tile3FilteredData.length > 0" @click="clearFilter(3)" color="danger" class="remove-filter">
            &#215;
          </ion-button>
          </div>
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
            <ion-button :strong="true" @click="cancel('filterModal')" color="danger">Cancel</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-list>
          <ion-item>
            <ion-title>Choose Filter</ion-title>
          </ion-item>
        <ion-item class="filter-tile-dropdown">
          <ion-select
          aria-label="Tile1"
          label="Tile1"
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
          <ion-select
          aria-label="Tile2"
          label="Tile2"
          placeholder="Select Tile2"
          @ionChange="handleChange($event, 2)"
          @ionCancel="handleCancel()"
          @ionDismiss="handleDismiss()"
          >
            <ion-select-option value="pants">Pants</ion-select-option>
            <ion-select-option value="shorts">Shorts</ion-select-option>
            <ion-select-option value="skirt">Skirts</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item class="filter-tile-dropdown" :disabled="true">
          <ion-select label="Tile3 (Not yet supported)">
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
import { defineComponent, ref, Ref, onMounted, computed } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardContent, IonItem, IonButtons, IonButton, IonCardTitle, IonIcon, IonSegment, IonSegmentButton, IonModal, IonLabel,IonSelect, IonSelectOption, IonImg, IonAvatar, IonList } from '@ionic/vue';
import ViewItemCardSlider from '@/components/ViewItemCardSlider.vue';
import {refresh, trash, funnel ,checkmarkCircleOutline, funnelOutline, trashOutline, shirtOutline, removeCircleOutline,closeCircleOutline } from 'ionicons/icons';
import { getUserProducts, getUserProductsByType } from '../services/productServices';
import { tileConfig } from '../../tileConfig';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: { IonPage, IonToolbar, IonHeader, IonTitle, IonContent, ViewItemCardSlider, IonCard, IonCardHeader, IonCardContent, IonItem, IonButtons, IonButton, IonCardTitle, IonIcon, IonSegment, IonSegmentButton, IonModal, IonLabel,IonSelect, IonSelectOption, IonImg, IonAvatar, IonList},  
  data() {
    return {
      errorMessage: ''
    };
  },
  setup() {
    const router = useRouter();

    const refreshIcon = refresh;
    const trashIcon = trashOutline;
    const funnelIcon = funnelOutline;
    const checkmarkCircleOutlineIcon = checkmarkCircleOutline;
    const shirtOutlineIcon = shirtOutline;
    const removeCircleOutlineIcon = removeCircleOutline;
    const closeCircleOutlineIcon = closeCircleOutline;


    const loading = ref(true);
    const tile1Data = ref([]);
    const tile2Data = ref([]);
    const tile3Data = ref([]);


    //Filtering Data Vars
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

    // Fetch user data and update tile data
    const fetchUserProductData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (userId) {
          const userProductDataResponse = await getUserProducts(userId);
          tile1Data.value = userProductDataResponse.data.filter((product: { PRODUCT_TYPE: string; }) => tileConfig.tile1.includes(product.PRODUCT_TYPE))||null;
          tile2Data.value = userProductDataResponse.data.filter((product: { PRODUCT_TYPE: string; }) => tileConfig.tile2.includes(product.PRODUCT_TYPE))||null;
          tile3Data.value = userProductDataResponse.data.filter((product: { PRODUCT_TYPE: string; }) => tileConfig.tile3.includes(product.PRODUCT_TYPE))||null;
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
      const modal = document.querySelector('#' + id) as Ref<typeof IonModal> | null;
        if (modal && id =='filterModal') {
          //@ts-ignore
          modal.dismiss(null, 'cancel');
          tile1Filter = ref(); 
          tile2Filter = ref(); 
          tile3Filter = ref();
        }
        else if(modal){
          //@ts-ignore
          modal.dismiss(null, 'cancel');
        } else {
          console.error('Modal not found for id:', id);
        }
    };

        // Computed properties to determine which data to display
    const displayedTile1Data = computed(() => {
      return tile1FilteredData.value.length > 0 ? tile1FilteredData.value : tile1Data.value;
    });

    const displayedTile2Data = computed(() => {
      return tile2FilteredData.value.length > 0 ? tile2FilteredData.value : tile2Data.value;
    });

    const displayedTile3Data = computed(() => {
      return tile3FilteredData.value.length > 0 ? tile3FilteredData.value : tile3Data.value;
    });

    const resetFilters = () => {
      tile1FilteredData.value = [];
      tile2FilteredData.value = [];
      tile3FilteredData.value = [];
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
      funnelIcon,
      updateData,
      checkmarkCircleOutlineIcon,
      redirectToAddItemsPage,
      cancel,
      shirtOutlineIcon,
      tile1FilteredData,
      tile2FilteredData,
      tile3FilteredData,
      tile1Filter,
      tile2Filter,
      tile3Filter,
      displayedTile1Data,
      displayedTile2Data,
      displayedTile3Data,
      resetFilters,
      removeCircleOutlineIcon,
      closeCircleOutlineIcon
    };
  },
  methods: {
      handleChange(ev:any, tile:Number) {
        console.log('ionChange fired with value: ' + ev.detail.value, 'for tile ', tile);
        if(tile == 1){this.tile1Filter = ev.detail.value}
        if(tile == 2){this.tile2Filter = ev.detail.value}
        if(tile == 3){this.tile3Filter = ev.detail.value}
      },
      handleCancel() {
        console.log('ionCancel fired');
      },
      
      async handleApply() {
        const userId = localStorage.getItem('userId');
        if (userId) {
        //Query DB for filtered content
        const filters = [this.tile1Filter, this.tile2Filter, this.tile3Filter];
          const filteredDataProperties = [this.tile1FilteredData, this.tile2FilteredData, this.tile3FilteredData];

        for (let i = 0; i < filters.length; i++) {
          const filter = filters[i];
          const filteredData = filteredDataProperties[i];

          if (filter) {
            //console.log(filter);
                try{
                //Setting Filtered Data  
                 const tileResults = await getUserProductsByType(filter, userId);
                 //console.log(`tile${i + 1}Results`, tileResults.data);
                (this as any)[`tile${i + 1}FilteredData`] = tileResults.data;

                // Reset filter after query
                (this as any)[`tile${i + 1}Filter`] = ref();
                }catch(err:any){
                 if (err.response && err.response.data && err.response.data.error === "No products found for this user and product type") {
                  this.errorMessage = `Oops! Looks like we weren't able to locate any products with the type ${filter}. Please try another filter.`;
                } else {
                  this.errorMessage = `Oops! We ran into an error trying to apply that filter for tile${i + 1}. Please try again later!`;
                }
                (this as any)[`tile${i + 1}Filter`] = ref();
                setTimeout(() => {
                  this.errorMessage = ''; 
                }, 5000);
                }
          }
        }
      }
        //Dismiss modal
        this.cancel('filterModal');
      },

      handleDismiss() {
        console.log('ionDismiss fired');
      },
      
      clearFilter(tileNumber: Number) {
        if (tileNumber === 1) {
          this.tile1FilteredData.length = 0;
        } else if (tileNumber === 2) {
          this.tile2FilteredData.length = 0;
        } else if (tileNumber === 3) {
          this.tile3FilteredData.length = 0;
        }
      },

    }, 
});
</script>

<style scoped>
#tile-column {
  display: flex;
  flex-direction: column;
}
.tile{
  display: flex;
  flex-direction: row;
}
.remove-filter{
  max-width: 40px;
  max-height: 40px;
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