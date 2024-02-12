<template>
    <div class="tile-preview">
    <div class="tile-styles" :class="'show-tile-' + tile1"></div>
    <div class="tile-styles" :class="'show-tile-' + tile2"></div>
    <div class="tile-styles" :class="'show-tile-' + tile3"></div>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps({
    tile1: Boolean,
    tile2: Boolean,
    tile3: Boolean
  });
  </script>
  
  <style scoped>
    .tile-styles {
      width: 40px;
      height: 40px;
      border-radius: 10px; 
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff; 
      font-weight: bold;
    }
    .show-tile-true{
        background-color: rgb(229, 226, 226); 
    }
    .show-tile-false{
        background-color: rgb(103, 100, 100); 
    }
  </style>
  