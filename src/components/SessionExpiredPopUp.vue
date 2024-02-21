  <template>
    <div class="overlay" v-show="showValue"></div>
    <div class="popup" v-show="showValue">
      <div class="popup-content">
        <p>{{ message }}</p>
        <button @click="redirectToLogin">Log In</button>
      </div>
    </div>
</template>
  
  <script lang="ts">
  import { defineComponent, onBeforeMount, onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    setup(props) {
      const router = useRouter();
      const message = "Your session has expired. Please log in again to continue.";
      const loginRoute = "/login";

      const redirectToLogin = () => {
      props.redirectToLogin();
    };
      
      return {
        message,
        redirectToLogin
      };
    },  
    props: {
    showValue: {
      type: Boolean,
      required: true,
    },
    redirectToLogin:{
      type: Function,
      required: true
    }
}
  });
  </script>
  
  <style>
 .popup {
  z-index: 1001;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(31, 31, 31);
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.popup-content {
  text-align: center;
}

.popup-content p {
  margin-bottom: 10px;
}

.popup-content button {
  padding: 10px 20px;
  background-color: rgb(149 149 149);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.popup-content button:hover {
  background-color: #0056b3;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 1000;
}
  </style>
  