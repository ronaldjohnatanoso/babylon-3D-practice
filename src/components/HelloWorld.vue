<script setup lang="ts">
  import {onMounted, ref,type Ref} from 'vue'
  import { StandardMaterials } from '@/BabylonExamples/StandardMaterials';

  onMounted(()=>{
    //! to go around null
    const canvas:HTMLCanvasElement = document.querySelector('canvas')!
    //from babylone scene class
    new StandardMaterials(canvas)
  })

</script>

<template>
   <canvas></canvas>
</template>

<style scoped>
canvas{
  display: block;
  margin: 0 auto; 
  width: 70%;
  height: 70%;
  box-shadow: 0 5px 4px rgba(0,0,0, 0.2);
}
</style>
