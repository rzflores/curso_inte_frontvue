<template>
 <v-container>
  <v-row class="justify-md-center pt-5 pb-5">
    <p class="text-h4">Reporte Vencimiento</p>    
  </v-row>
  <v-row class="justify-md-center pt-5 pb-5">
    <v-col cols="4">
       <v-text-field
                  label="Nombre*"
                  required
                ></v-text-field>
    </v-col>
     <v-col cols="4">
       <v-text-field
                  label="Codigo*"
                  required
                ></v-text-field>
    </v-col>
     <v-col cols="4">
         <v-select
                  label="Categoria"
                  :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                  required
                ></v-select>
    </v-col>
     <v-col cols="4">
            <v-date-picker class="pt-2"
                           title="" 
                           input-text="Fecha Inicio" 
                           hide-actions="false"  
                           header="Fecha Inicio:"
                           input-mode="keyboard"
                           ></v-date-picker>      
      </v-col>          
      <v-col cols="4">
            <v-date-picker class="pt-2"
                           title="" 
                           input-text="Fecha Fin" 
                           hide-actions="false"  
                           header="Fecha Fin:"
                           input-mode="keyboard"
                           ></v-date-picker>      
        </v-col>        
    <v-col cols="4">
         <v-btn  type="submit" 
                    color="deep-purple"
                    block class=" mt-2">Buscar</v-btn>    
    </v-col>
  </v-row>
  <v-row>
  <v-data-table
      v-model:sort-by="sortBy"
      :headers="headers"
      :items="desserts"
      class="elevation-1"
    ></v-data-table>
  </v-row>  
  </v-container>
</template>

<script>
  import { VDataTable } from 'vuetify/labs/VDataTable'
  import { VDatePicker } from 'vuetify/labs/VDatePicker'
  export default {
    components : {
      VDataTable,
      VDatePicker
    },
    data () {
      return {
        sortBy: [
            { key: '', order: '' }
          ],
        headers: [
          {
            title: 'Dessert (100g serving)',
            align: 'start',
            sortable: false,
            key: 'name',
          },
          { title: 'Calories', key: 'calories' },
          { title: 'Fat (g)', key: 'fat' },
          { title: 'Carbs (g)', key: 'carbs' },
          { title: 'Protein (g)', key: 'protein' },
          { title: 'Iron (%)', key: 'iron' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 200,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          },
          {
            name: 'Ice cream sandwich',
            calories: 200,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%',
          },
          {
            name: 'Eclair',
            calories: 300,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%',
          },
          {
            name: 'Cupcake',
            calories: 300,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%',
          },
          {
            name: 'Gingerbread',
            calories: 400,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%',
          },
          {
            name: 'Jelly bean',
            calories: 400,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%',
          },
          {
            name: 'Lollipop',
            calories: 400,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%',
          },
          {
            name: 'Honeycomb',
            calories: 400,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%',
          },
          {
            name: 'Donut',
            calories: 500,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%',
          },
          {
            name: 'KitKat',
            calories: 500,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
          },
        ],
      }
    },
  }
</script>

<style>

</style>