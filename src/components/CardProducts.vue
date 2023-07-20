<template>
  <v-card
    :loading="loading"
    class="mx-auto my-12 ml-4 mr-4"
    max-width="374"
  >
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="deep-purple"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      cover
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>

    <v-card-item>
      <v-card-title>{{ itemProducto.NombreProducto }}</v-card-title>

      <v-card-subtitle>
        <span class="me-1">{{ itemProducto.Categoria.Nombre }}</span>        
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <div class="text-subtitle-1">
         Precio : S./{{ itemProducto.PrecioUnitario }}   -   Stock : {{ itemProducto.StockActual }}
      </div>
      

      <div>{{ itemProducto.DescripcionCorta }}</div>
    </v-card-text>

    <v-divider class="mx-4 mb-1"></v-divider>

    <v-card-title>Presentaciones</v-card-title>

    <div class="px-4">
      <v-chip-group v-model="selection">
        <v-chip>{{ itemProducto.UnidadMedida.Numero }}{{ itemProducto.UnidadMedida.NombreGramajeCorto }}</v-chip>
      </v-chip-group>
    </div>

    
  </v-card>
</template>

<script>
export default {
  props:{
    itemProducto : {}
  }
  
}
</script>

<style>

</style>