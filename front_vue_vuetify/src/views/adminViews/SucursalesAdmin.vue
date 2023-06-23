<template>
<v-container>
  <v-row class="justify-md-center pt-5 pb-5">
    <p class="text-h4">Gestionar de Sucursales</p>    
  </v-row>
  <v-row class="justify-md-center">
   <modal-dialog-sucursales 
                  titleDialog="Agregar Sucursal" 
                  nameIcon="mdi-plus"
                  >
                  </modal-dialog-sucursales>
  </v-row>
  <v-row class="justify-md-center pt-4">
  <v-table
            fixed-header
            height="300px"

        >
            <thead>
            <tr>
                <th class="text-left">
                    Nombre Sucursal
                </th>
                <th class="text-left">
                    Celular
                </th>
                <th class="text-left">
                    Dirección
                </th>
                <th class="text-left">
                    Referencia
                </th>
                <th>
                    Acciones
                </th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="item in desserts"
                :key="item.key"
            >
                <td>{{ item.nameSucursal }}</td>
                <td>{{ item.celularSucursal }}</td>
                <td>{{ item.direccion }}</td>
                <td>{{ item.referencia }}</td>
                <td> 
                  <modal-dialog-sucursales 
                  titleDialog="Editar Sucursal" 
                  nameIcon="mdi-square-edit-outline"
                  >
                  </modal-dialog-sucursales>
                </td>
            </tr>           
            </tbody>
        </v-table>
  </v-row>
  
</v-container>
</template>

<script>
import ModalDialogSucursales from '../../components/ModalDialogSucursales.vue'
export default {
 components : {
  ModalDialogSucursales
 }, 
 data () {
      return {      
        desserts: [
          {
            nameSucursal: 'Sucursal 1',
            celularSucursal: "993449596",
            direccion : "avenidas 1231",
            referencia : "dddddddddddddddddddddd"
          },
          {
            nameSucursal: 'Sucursal 2',
            celularSucursal: "993449596",
            direccion : "avenidas 1231",
            referencia : "dddddddddddddddddddddd"
          }
        ],
      }
    },
     
}
</script>

<style>

</style>