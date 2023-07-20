<template>
 <v-container>
  <v-row class="justify-md-center pt-5 pb-5">
    <p class="text-h4">Reporte Vencimiento</p>    
  </v-row>
  <v-row class="justify-md-center pt-5 pb-5">
    <v-col cols="4">
       <v-text-field
                  label="Nombre*"
                  v-model="filtroVencimiento.Nombre"
                  required
                ></v-text-field>
    </v-col>
     <v-col cols="4">
       <v-text-field
                  label="Descripcion*"
                  v-model="filtroVencimiento.Descripcion"
                  required
                ></v-text-field>
    </v-col>
     <v-col cols="4">
         <v-select
                  label="Categoria"
                  :items="SelectCategorias"
                  item-title="text"
                  item-value="value"
                  v-model="filtroVencimiento.IdCategoria"
                  required
                ></v-select>
    </v-col>
     <v-col cols="4">
              <v-text-field v-model="filtroVencimiento.FechaInicio" type="date" label="Fecha Inicio"></v-text-field>
      </v-col>          
      <v-col cols="4">
              <v-text-field v-model="filtroVencimiento.FechaFin" type="date" label="Fecha Fin"></v-text-field>
        </v-col>        
    <v-col cols="4">
          <v-btn  type="submit" 
                    color="deep-purple"
                    @click="obtenerReporteVencimiento()"
                    block class=" mt-2">Buscar</v-btn> 
           <v-btn  type="submit" 
                    color="deep-purple"
                    @click="exportarExcel()"
                    block class=" mt-2">Exportar</v-btn>
    </v-col>
  </v-row>
  <v-row>
  <v-data-table
      id="tableVencimiento"
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
      VDataTable,
    },
    data () {
      return {
        SelectCategorias : [],
        filtroVencimiento : {
          Nombre : "",
          Descripcion : "",
          IdCategoria : null,
          FechaInicio : new Date().toISOString().substr(0, 10),
          FechaFin : new Date().toISOString().substr(0, 10)
        },
        sortBy: [
            { key: '', order: '' }
          ],
         headers: [
          { title: 'Nombre',key: 'nombre',},
          { title: 'Descripcion', key: 'descripcion' },
          { title: 'Categoria', key: 'categoria' },
          { title: 'Fecha Vencimiento', key: 'fechaVencimiento' },
          { title: 'Sucursal', key: 'sucursal' },
        ],
        desserts: [],
      }
    },
    computed:{
       ...mapState('categoria',['ListaCategorias' ]),
       ...mapState('reporte',['ListaReporteVencimiento' ]),
    },
    methods:{
      ...mapActions('categoria',['obtenerCategorias']),
      ...mapActions('reporte',['realizarReporteVencimiento']),
      async obtenerReporteVencimiento(){
        this.desserts = [];
        if(this.filtroVencimiento.IdCategoria == 1){ this.filtroVencimiento.IdCategoria = null  }
        console.log(this.filtroVencimiento)
        await this.realizarReporteVencimiento(this.filtroVencimiento);
        this.ListaReporteVencimiento.forEach(item => {
          let itemReporteVencimiento = {
            nombre : item.nombreProducto,
            descripcion: item.descripcionProducto,
            categoria : item.nombreCategoria,
            fechaVencimiento: item.fechaVencimiento,
            sucursal: item.nombreSucursal
          }

          this.desserts.push(itemReporteVencimiento)
        });
      },
      async exportarExcel(){
        let table_stock = document.getElementById("tableVencimiento");
        var workbook = XLSX.utils.table_to_book(table_stock);
        var ws = workbook.Sheets["Reporte"];
        XLSX.utils.sheet_add_aoa(ws, [["Created "+new Date().toISOString()]], {origin:-1});
        XLSX.writeFile(workbook, "ReporteVencimiento.xlsb");

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