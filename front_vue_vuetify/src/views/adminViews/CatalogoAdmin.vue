<template>
<v-container>
  <v-row class="justify-md-center pt-5 pb-5">
    <p class="text-h4">Gestionar de Productos</p>    
  </v-row>
  <v-row class="justify-md-center">
   <modal-dialog-productos 
                  titleDialog="Agregar Producto" 
                  nameIcon="mdi-plus"
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
                    Descripcion Producto
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
                    Acciones
                </th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="item in desserts"
                :key="item.key"
            >
                <td>{{ item.nameProducto }}</td>
                <td>{{ item.descripcionLarga }}</td>
                <td>{{ item.precioUnitario }}</td>
                <td>{{ item.unidadMedida }}</td>
                <td>{{ item.categoria }}</td>
                <td>{{ item.stock }}</td>
                <td> 
                  <modal-dialog-productos 
                  titleDialog="Editar Producto" 
                  nameIcon="mdi-square-edit-outline"
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
export default {
 components : {
  ModalDialogProductos
 }, 
 data () {
      return {      
        desserts: [
          {
            nameProducto: 'Frozen Yogurt',
            descripcionLarga: "descripcion larga",
            precioUnitario : 20.2,
            unidadMedida : "1 kg",
            categoria : "Suero leche",
            stock : 2
          },
          {
            nameProducto: 'Ice cream sandwich',
            descripcionLarga: "descripcion larga",
            precioUnitario : 20.2,
            unidadMedida : "1 kg",
            categoria : "Suero leche",
            stock : 2
          }
        ],
      }
    },
     
}
</script>

<style>

</style>