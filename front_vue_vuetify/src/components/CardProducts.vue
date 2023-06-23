<template>
  <v-card
    :loading="loading"
    class="mx-auto my-12"
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
      <v-card-title>Proteina en polvo</v-card-title>

      <v-card-subtitle>
        <span class="me-1">categoria</span>        
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <div class="text-subtitle-1">
         Precio : S./60   -   Stock : 10
      </div>
      

      <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
    </v-card-text>

    <v-divider class="mx-4 mb-1"></v-divider>

    <v-card-title>Presentaciones</v-card-title>

    <div class="px-4">
      <v-chip-group v-model="selection">
        <v-chip>1kg</v-chip>

        <v-chip>2kg</v-chip>


      </v-chip-group>
    </div>

    <v-card-actions>
      <v-btn
        color="deep-purple-lighten-2"
        variant="text"
        @click="reserve"
      >
        Mas Info
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {

}
</script>

<style>

</style>