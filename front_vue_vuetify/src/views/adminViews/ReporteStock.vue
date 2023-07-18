<template>
 <v-container>
  <v-row class="justify-md-center pt-5 pb-5">
    <p class="text-h4">Reporte stock</p>    
  </v-row>
  <v-row class="justify-md-center pt-5 pb-5">
    <v-col cols="3">
       <v-text-field
                  label="Nombre*"
                  v-model="filtroStock.Nombre"
                  required
                ></v-text-field>
    </v-col>
     <v-col cols="3">
       <v-text-field
                  label="Descripcion*"
                  v-model="filtroStock.Descripcion"
                  required
                ></v-text-field>
    </v-col>
     <v-col cols="3">
         <v-select
                  label="Categoria"
                  :items="SelectCategorias"
                  item-title="text"
                  item-value="value"
                  v-model="filtroStock.IdCategoria"
                  required
                ></v-select>
    </v-col>
     <v-col cols="3">
         <v-btn  type="submit" 
                    color="deep-purple"
                    @click="obtenerReporteStock()"
                    block class=" mt-2">Buscar</v-btn> 
           <v-btn  type="submit" 
                    color="deep-purple"
                    @click="exportarExcel()"
                    block class=" mt-2">Exportar</v-btn>                 
    </v-col>
  </v-row>
  <v-row>
  <v-data-table
      id="tableStock"
      v-model:sort-by="sortBy"
      :headers="headers"
      :items="desserts"
      class="elevation-1"
      no-data-text="Sin resultados"
    ></v-data-table>
  </v-row>  
  </v-container>
</template>

<script>
  import { VDataTable } from 'vuetify/labs/VDataTable'
  import { mapActions, mapState } from 'vuex'
  import * as XLSX from 'xlsx/xlsx.mjs';
  export default {
    components : {
      VDataTable
    },
    data () {
      return {
        SelectCategorias : [],
        filtroStock : {
          Nombre : "",
          Descripcion : "",
          IdCategoria : null
        },
        sortBy: [
            { key: '', order: '' }
          ],
        headers: [
          { title: 'Nombre',key: 'nombre',},
          { title: 'Descripcion', key: 'descripcion' },
          { title: 'Categoria', key: 'categoria' },
          { title: 'Stock', key: 'stock' },
          { title: 'Sucursal', key: 'sucursal' },
        ],
        desserts: [],
      }
    },
    computed:{
       ...mapState('categoria',['ListaCategorias' ]),
       ...mapState('reporte',['ListaReporteStock' ]),
    },
    methods:{
      ...mapActions('categoria',['obtenerCategorias']),
      ...mapActions('reporte',['realizarReporteStock']),
      async obtenerReporteStock(){
        this.desserts = [];
        if(this.filtroStock.IdCategoria == 1){ this.filtroStock.IdCategoria = null  }
        await this.realizarReporteStock(this.filtroStock);
        this.ListaReporteStock.forEach(item => {
          let itemReporteStock = {
            nombre : item.nombreProducto,
            descripcion: item.descripcionProducto,
            categoria : item.nombreCategoria,
            stock: item.stockProducto,
            sucursal: item.nombreSucursal
          }

          this.desserts.push(itemReporteStock)
        });
      },
      async exportarExcel(){
        let table_stock = document.getElementById("tableStock");
        var workbook = XLSX.utils.table_to_book(table_stock);
        var ws = workbook.Sheets["Reporte"];
        XLSX.utils.sheet_add_aoa(ws, [["Created "+new Date().toISOString()]], {origin:-1});
        XLSX.writeFile(workbook, "ReporteStock.xlsb");

      }
    },
    async beforeMount(){
       await this.obtenerCategorias();
      this.SelectCategorias = this.ListaCategorias.map( e => 
                    ({ text : e.Nombre , value: e.IdCategoria })
       )
    }
  }
</script>

<style>

</style>