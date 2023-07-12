<template>
<v-container>
  <v-row class="justify-md-center pt-5 pb-5">
    <p class="text-h4">Gestionar de Productos</p>    
  </v-row>
  <v-row class="justify-md-center">
   <modal-dialog-productos 
                  titleDialog="Agregar Producto" 
                  nameIcon="mdi-plus"
                  typeAction="A"
                  >
                  </modal-dialog-productos>

   
  </v-row>
  <v-row class="justify-md-center pt-4">
  <v-table
            fixed-header
            height="300px"

        >
            <thead>
            <tr>
                <th class="text-left">
                    Nombre Producto
                </th>
                
                <th class="text-left">
                    Precio Unitario
                </th>
                <th class="text-left">
                    Unidad de Medidas
                </th>
                <th class="text-left">
                    Categorias
                </th>
                <th class="text-left">
                    Stock
                </th>
                <th class="text-left">
                    Fecha Vencimiento
                </th>
                <th class="text-left">
                    Acciones
                </th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="producto in ListaProductos"
                :key="producto.IdProducto"
            >
                <td>{{ producto.NombreProducto }}</td>
                <td>{{ producto.PrecioUnitario }}</td>
                <td>{{ producto.UnidadMedida.Numero + ' ' + producto.UnidadMedida.NombreGramajeCorto }}</td>
                <td>{{ producto.Categoria.Nombre }}</td>
                <td>{{ producto.StockActual }}</td>
                <td>{{ producto.FechaVencimiento }}</td>
                <td> 
                  <modal-dialog-productos 
                  titleDialog="Editar Producto" 
                  nameIcon="mdi-square-edit-outline"
                  typeAction="E"
                  :PropIdProducto="producto.IdProducto"
                  >
                  </modal-dialog-productos>
                </td>
            </tr>           
            </tbody>
        </v-table>
  </v-row>
  
</v-container>
</template>

<script>
import ModalDialogProductos from '../../components/ModalDialogProductos.vue'
import { mapActions , mapState } from 'vuex'
export default {
 components : {
  ModalDialogProductos
 }, 
 data () {
      return {      
      }
    },
  computed:{
  ...mapState('producto',{ ListaProductos : 'ListaProductos'})
 },   
 methods:{
  ...mapActions( 'producto' , ['obtenerProductos']),
 },   
 async beforeMount(){
      await this.obtenerProductos()
    }   
     
}
</script>

<style>

</style>